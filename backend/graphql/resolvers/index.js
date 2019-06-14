const DailyIntake = require("../../models/dailyIntake");
const User = require("../../models/user");
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
                  dailyIntakes: intakes.bind(this, user._doc.dailyIntakes ) };
        })
        .catch(err => {
            throw err;
        })
};

const intakes = intakeIds => {
    return DailyIntake.find({ _id: { $in: intakeIds }})
    .then(intakes => {
        return intakes.map(intake => {
            return transformDailyIntake(intake);
        })
    })
    .catch(err => {
        throw err;
    })
};

module.exports = {
    dailyIntakes: (args, req) => {
        if (!req.isAuth) {
            throw new Error('not authenticated');
        }
        return DailyIntake.find()
            .then(intakes => {
                return intakes.map(intake => {
                    return transformDailyIntake(intake);
                })
        })
        .catch(err => {
            throw err;
        });
    },
    createDailyIntake: (args, req) => {
        if (!req.isAuth) {
            throw new Error('not authenticated');
        }
        const dailyIntake = new DailyIntake({
            name: args.dailyIntake.name,
            kcal: +args.dailyIntake.kcal,
            protein: +args.dailyIntake.protein,
            fat: +args.dailyIntake.fat,
            carbs: +args.dailyIntake.carbs,
            date: new Date(args.dailyIntake.date),
            user: req.userId
        })
        let newDailyIntake;
        return dailyIntake.save()
        .then(res => {
            newDailyIntake = transformDailyIntake(res);
            return User.findById(req.userId)
        })
        .then(user => {
            if(!user) {
                throw new Error('User not found.');
            }
            user.dailyIntakes.push(newDailyIntake);
            return user.save();
        })
        .then(() => {
            return newDailyIntake;
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