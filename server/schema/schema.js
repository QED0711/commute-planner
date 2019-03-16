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

const CommuteTime = require('./models/commuteTime');
const CommuteQuery = require('../CommuteQuery');


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        commuteTimes: {
            type: CommuteTimeType,
            resolve(parent, args){
                return {duration: [15, 35]}
            }
        },

        durationsAtTime: {
            type: CommuteTimeType,
            args: {
                currentTime: {type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parent, {currentTime}){
                return CommuteTime.findOne({currentTime});
            }
        },
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addDuration: {
            type: CommuteTimeType,
            args: {
                origin: {type: new GraphQLNonNull(GraphQLString)},
                destination: {type: new GraphQLNonNull(GraphQLString)},
                currentTime: {type: new GraphQLNonNull(GraphQLInt)},
                newDuration: {type: new GraphQLNonNull(GraphQLInt)}
            },
            async resolve(parent, {origin, destination, currentTime, newDuration}){
                let ct = await CommuteTime.findOne({origin, destination, currentTime})
                let query = new CommuteQuery(origin, destination);
                query.getCommute();
                if(ct){
                    ct.durations.push(newDuration)
                    return ct.save();
                } else {
                    return CommuteTime.create({origin, destination, currentTime, durations: [newDuration]})
                }                
            }
        },

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})