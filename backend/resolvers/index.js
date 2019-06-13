const Food = require("../models/food");
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const transformDailyIntake = intake => {
    return { ...intake._doc, _id: intake.id, date: new Date(intake._doc.date).toISOString(), user: user.bind(this, intake.user )}
};

const user = userId => {
    return User.findById(userId)
        .then(user => {
            return { 
                ...user._doc,
                 _id: user.id,
                  dailyIntakes: foods.bind(this, user._doc.dailyIntakes ) };
        })
        .catch(err => {
            throw err;
        })
};

const foods = foodIds => {
    return Food.find({ _id: { $in: foodIds }})
    .then(foods => {
        return foods.map(food => {
            return transformDailyIntake(food);
        })
    })
    .catch(err => {
        throw err;
    })
};

module.exports = {
    foods: (args, req) => {
        if (!req.isAuth) {
            throw new Error('not authenticated');
        }
        return Food.find()
            .then(foods => {
                return foods.map(food => transformDailyIntake(food)
            );
        })
        .catch(err => {
            throw err;
        });
    },
    createFood: (args, req) => {
        if (!req.isAuth) {
            throw new Error('not authenticated');
        }
        const food = new Food({
            name: args.foodInput.name,
            kcal: +args.foodInput.kcal,
            protein: +args.foodInput.protein,
            fat: +args.foodInput.fat,
            carbs: +args.foodInput.carbs,
            date: new Date(args.foodInput.date),
            user: req.userId
        })
        let createdFood;
        return food.save()
        .then(res => {
            createdFood = transformDailyIntake(res);
            return User.findById(res.userId)
        })
        .then(user => {
            if(!user) {
                throw new Error('User not found.');
            }
            user.dailyIntakes.push(createdFood);
            return user.save();
        })
        .then(() => {
            return createdFood;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
    },
    login: async ({email, password}) => {
        const user = await User.findOne({email: email });
        if (!user) {
            throw new Error('user doesnt exist');
        }
         const isEqual = await bcrypt.compare(password, user.password);
         if (!isEqual) {
             throw new Error('password is incorrect');
         }
         const token = jwt.sign({userId: user.id, email: user.email}, 'secretKey', {
             expiresIn: '1h'
         });
         return { userId: user.id, token: token, tokenExpiration: 1 };


    },
    createUser: (args) => {
        return User.findOne({email: args.userInput.email})
        .then(user => {
            if (user) {
                throw new Error('user exists already');
            }
            return bcrypt.hash(args.userInput.password, 12)
        })
        .then(hashedpassword => {
            const user = new User({
                email: args.userInput.email,
                password: hashedpassword
            });
            return user.save();
        })
        .catch(err => {
            throw err;
        })
        .then(result => {
            return { ...result._doc, password: null, _id:result.id }
        })
        .catch(err => {
            throw err
        });
    }
}