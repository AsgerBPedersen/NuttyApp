const bcrypt = require('bcryptjs');

const Food = require("../../models/food");
const User = require("../../models/user");


const foods = async foodIds => {
    try {
        const foods = await Food.find({ _id: { $in: foodIds } });
        return foods.map(food => {
            return {
                ...food._doc,
                _id: food.id,
                date: new Date(food._doc.date).toISOString(),
                user: user.bind(this, food.user)
            };
        });
    }
    catch (err) {
        throw new Error(err);
    }
}

const user = userId => {
    return User.findById(userId)
    .then(user => {
        return { 
            ...user._doc,
            _id: user.id,
            dailyIntake: foods.bind(this, user._doc.dailyIntake)
        };
    })
    .catch(err => {
        throw new Error(err);
    })
}



module.exports = {
    foods: () => {
        // finds all instances of foods in the db populates the user field
        return Food.find()
            .then(food => {
                return food.map(food => {
                    return { 
                        ...food._doc, 
                        //returns the id in a string format
                        _id: food._doc._id.toString(),
                        date: new Date(food._doc.date).toISOString(),
                        user: user.bind(this, food._doc.user)
                    };
            });
        }).catch(err => {
            throw err;
        })
    },
    createFood: (args) => {
        const food = new Food({
            name: args.foodInput.name,
            kcal: +args.foodInput.kcal,
            protein: +args.foodInput.protein,
            fat: +args.foodInput.fat,
            carbs: +args.foodInput.carbs,
            date: new Date(args.foodInput.date),
            //user id is hardcoded for now
            user: '5cfcf45a86ed401cdc17bb54'
        });
        let createdFood;
        return food.save()
        .then(res => {
            createdFood = { ...res._doc, _id: res.id,date: new Date(res._doc.date).toISOString(), user: user.bind(this, res._doc.user) };
            return User.findById('5cfcf45a86ed401cdc17bb54');
        }).then(user  => {
            if (!user) {
                throw new Error('User doesnt exist.')
            }
            //saves the new food item in the users array of created foods
            user.dailyIntake.push(food);
            return user.save();
        }).then(() => {
            return createdFood;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
    },
    createUser: (args) => {
        return User.findOne({email: args.userInput.email})
        .then(user => {
            if (user) {
                throw new Error('user exists already');
            }
            return bcrypt
            .hash(args.userInput.password, 12)
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