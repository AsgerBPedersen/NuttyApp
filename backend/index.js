const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

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
            return foods;
        },
        createFood: (args) => {
            const food = {
                _id: Math.random().toString(),
                name: args.foodInput.name,
                kcal: +args.foodInput.kcal,
                protein: +args.foodInput.protein,
                fat: +args.foodInput.fat,
                carbs: +args.foodInput.carbs
            };
            foods.push(food);
            return food;
        }
    },
    graphiql: true
}));

app.listen(3000);