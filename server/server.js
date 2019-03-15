const express = require ('express');
const app = express();
const cors = require('cors');

app.use(cors());

const graphqlHTTP = require('express-graphql');
// const {buildSchema} = require('graphql');
const schema = require('./schema/schema');

// console.log("SCHEMA: ", schema)

const mongoose = require('mongoose');
mongoose.connect("mongodb://qdizon:commute19@ds049754.mlab.com:49754/commute-planner", {useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log("===== Connected to Databse =====");
})


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Now Listening for requests on http://localhost:${port}/graphql`);
})