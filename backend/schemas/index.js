const { buildSchema } = require('graphql');

module.exports = buildSchema(`
        type Food {
            _id: ID!
            name: String!
            kcal: Float!
            protein: Float!
            fat: Float!
            carbs: Float!
            date: String!
            user: User!
        }

        type User {
            _id: ID!
            email: String!
            password: String
            dailyIntakes: [Food!]
        }

        type AuthData {
            userId: ID!
            token: String!
            tokenExpiration: Int!
        }

        input FoodInput {
            name: String!
            kcal: Float!
            protein: Float!
            fat: Float!
            carbs: Float!
            date: String!
        }

        input UserInput {
            email: String!
            password: String
        }

        type RootQuery {
            foods: [Food!]!
            login(email: String!, password: String!): AuthData!
        }

        type RootMutation {
            createFood(foodInput: FoodInput): Food
            createUser(userInput: UserInput): User
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `);