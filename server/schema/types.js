
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




const RouteType = new GraphQLObjectType({
    name: "Route",
    fields: (() =>({
        id: {type: GraphQLID},
        origin: {type: GraphQLString},
        destination: {type: GraphQLString},
        times: {type: new GraphQLList(new GraphQLList(GraphQLInt))}
    }))
})


module.exports = {
    RouteType
}