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
                // currentTime: {type: new GraphQLNonNull(GraphQLInt)},
            },
            async resolve(parent, {origin, destination}){
                let currentTime = new Date()
                console.log(currentTime.getHours(), currentTime.getMinutes())
                currentTime = (currentTime.getHours() * 60) + (currentTime.getMinutes())
                let ct = await CommuteTime.findOne({origin, destination, currentTime})
                let query = new CommuteQuery(origin, destination);
                let results = await query.getCommute();

                let newDuration = Math.floor(results.json.rows[0].elements[0].duration_in_traffic.value/60);

                
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