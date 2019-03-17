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

const {RouteType} = require('./types');

const Route = require('./models/route');
const CommuteQuery = require('../CommuteQuery');


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        routes: {
            type: RouteType,
            resolve(parent, args){
                return Route.findAll({})
            }
        },
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addRouteTime: {
            type: RouteType,
            args: {
                origin: {type: new GraphQLNonNull(GraphQLString)},
                destination: {type: new GraphQLNonNull(GraphQLString)},
                currentMinute: {type: new GraphQLNonNull(GraphQLInt)}
            },
            async resolve(parent, {origin, destination, currentMinute}){       
                // create a new commute querry class and run the maps search
                let query = new CommuteQuery(origin, destination);
                let results = await query.getCommute();                
                // the new duration will be foun in the results of the maps query at the path below (assumes you only had one origin and destination)
                let newDuration = Math.floor(results.json.rows[0].elements[0].duration_in_traffic.value/60);
                
                
                let route = await Route.findOne({origin, destination})
                if(route){
                    // if the route already exists add to/create new time slot
                    if(!!route.times[currentMinute]){                        
                        route.times[currentMinute].push(newDuration)
                    } else {
                        route.times[currentMinute] = [newDuration];
                    }
                    console.log(route)
                    route.markModified("times")
                    return route.save()
                } else {
                    let times = new Array(288).fill(null)
                    times[currentMinute] = [newDuration]
                    return Route.create({origin, destination, times})
                }                
            }
        },

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})