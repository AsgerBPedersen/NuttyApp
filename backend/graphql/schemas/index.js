const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Food {
    _id: ID!
    name: String!
    kcal: Float!
    protein: Float!
    fat: Float!
    carbs: Float!
    user: User!
    date: String!
}

type User {
    _id: ID!
    email: String!
    password: String
    dailyIntake: [Food!]
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