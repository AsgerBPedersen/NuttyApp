const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type DailyIntake {
    _id: ID!
    name: String!
    kcal: Float!
    protein: Float!
    fat: Float!
    carbs: Float!
    user: User!
    date: String!
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

type User {
    _id: ID!
    email: String!
    password: String
    dailyIntakes: [DailyIntake!]
}

input DailyIntakeInput {
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
    dailyIntakes: [DailyIntake!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createDailyIntake(dailyIntake: DailyIntakeInput): DailyIntake
    createUser(userInput: UserInput): User
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);