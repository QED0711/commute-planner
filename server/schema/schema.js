const graphql = require('graphql');

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const {CommuteTimeType} = require('./types');


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        commuteTimes: {
            type: CommuteTimeType,
            resolve(parent, args){
                return {duration: ["15", "35"]}
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addDuration: {
            type: CommuteTimeType,
            resolve(parent, args){
                console.log("Hit mutation")
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})