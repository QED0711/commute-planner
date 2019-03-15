
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
        startLocation: {type: GraphQLString},
        endLocation: {type: GraphQLString},
        endLocation: {type: GraphQLString},
        currentTime: {type: GraphQLString},
        duration: {type: new GraphQLList(GraphQLString)}
    }))
})








module.exports = {
    CommuteTimeType
}