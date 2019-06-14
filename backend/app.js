const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const auth = require('./middleware/auth')

const graphqlResolvers = require('./graphql/resolvers/index');
const graphqlSchemas = require('./graphql/schemas/index');

const app = express();

app.use(bodyParser.json());

app.use(auth);

app.use(
    '/graphql',
     graphqlHttp({
    schema: graphqlSchemas,
    rootValue: graphqlResolvers,
    graphiql: true
}));

mongoose.connect('mongodb://localhost/foodData')
.then(() => {
    app.listen(3000);
}).catch(err => {
    console.log(err)
});
