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
                return CommuteTime.find({})
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
            },
            async resolve(parent, {origin, destination, currentTime}){                
                // create a new commute querry class and run the maps search
                let query = new CommuteQuery(origin, destination);
                let results = await query.getCommute();                
                // the new duration will be foun in the results of the maps query at the path below (assumes you only had one origin and destination)
                let newDuration = Math.floor(results.json.rows[0].elements[0].duration_in_traffic.value/60);
                
                // find the commute that matches the origin and destination (and current time)
                let ct = await CommuteTime.findOne({origin, destination, currentTime})
                
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