const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();

app.use(bodyParser.json());

app.use(
    '/graphql',
     graphqlHttp({
    schema: buildSchema(`
        type RootQuery {
            foods: [String!]!
        }

        type RootMutation {
            createFood(name: String): String
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        foods: () => {
            return ['apple', 'ham', 'cheese'];
        },
        createFood: (args) => {
            const eventName = args.name;
            return eventName;
        }
    },
    graphiql: true
}));

app.listen(3000);