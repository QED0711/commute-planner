
/* 

object format

commuteTime {
    startLocation: location,
    endLocation location,
    currentTime: hh:mm,
    durations: [times hh:mm]

}

*/

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




const CommuteTimeType = new GraphQLObjectType({
    name: "CommuteTime",
    fields: (() =>({
        id: {type: GraphQLID},
        origin: {type: GraphQLString},
        destination: {type: GraphQLString},
        currentTime: {type: GraphQLInt},
        durations: {type: new GraphQLList(GraphQLInt)}
    }))
})








module.exports = {
    CommuteTimeType
}