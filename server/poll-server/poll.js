const request = require('graphql-request').request;


setInterval(() => {
    let d = new Date();
    let currentMinute = (d.getHours() * 60) + (d.getMinutes())
    const mutation = `mutation{
           runAllCommutes(currentMinute: "${currentMinute}"){
             id
             origin
             destination
             times
           }
         }
         `
    console.log(currentMinute)
    if(currentMinute % 5 === 0){
        request("http://localhost:4000/graphql", mutation).then(data => console.log(data))
    }
}, 60000);