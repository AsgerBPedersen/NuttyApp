const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Food = require("./models/food");

const app = express();

const foods = [];

app.use(bodyParser.json());

app.use(
    '/graphql',
     graphqlHttp({
    schema: buildSchema(`
        type Food {
            _id: ID!
            name: String!
            kcal: Float!
            protein: Float!
            fat: Float!
            carbs: Float!
        }

        input FoodInput {
            name: String!
            kcal: Float!
            protein: Float!
            fat: Float!
            carbs: Float!
            date: String!
        }

        type RootQuery {
            foods: [Food!]!
        }

        type RootMutation {
            createFood(foodInput: FoodInput): Food
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        foods: () => {
            return Food.find()
                .then(food => {
                    return food.map(food => {
                        return { ...food._doc, _id: food._doc._id.toString() };
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
                date: new Date(args.foodInput.date)
            })
            return food.save().then(res => {
                console.log(res);
                return { ...res._doc, _id: res.id };
            }).catch(err => {
                console.log(err);
                throw err;
            });
            
        }
    },
    graphiql: true
}));

mongoose.connect('mongodb://localhost/foodData')
.then(() => {
    console.log('connection working');
    app.listen(3000);
}).catch(err => {
    console.log(err)
});
