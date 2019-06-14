const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphqlScemas = require('./graphql/schemas/index');
const graphqlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());


app.use(
    '/graphql',
     graphqlHttp({
    schema: graphqlScemas,
    rootValue: graphqlResolvers,
    graphiql: true
}));

mongoose.connect('mongodb://localhost/foodData')
.then(() => {
    console.log('connection working');
    app.listen(3000);
}).catch(err => {
    console.log(err)
});
