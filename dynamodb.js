var AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-south-1",
    
});
var docClient = new AWS.DynamoDB.DocumentClient();
const scan = () =>{
     const params = {
  ExpressionAttributeNames: {
   "#I": "id", 
   "#N": "name"
  },
  ProjectionExpression: "#I, #N", 
  TableName: "orders"
 };

    //return Promise from here
    return new Promise((res,rej)=>{
      docClient.scan(params, function(err, data) {
        if (err){
          console.log(err, err.stack);
        rej();
        
        
       }else    { 
        res(data);
        //console.log(data);
        
      }
    });
  });
  
}
 

//1. Scan
//2. Delete
const del=(event)=>{
    const params = {
  Key: {
   "orderId":event.orderId,
  },
  TableName: "orders"
 };

  return  new Promise((res,rej)=>{
      docClient.delete(params, function(err, data) {
        if (err){
          console.log(err, err.stack);
        rej();
        
        
       }else    { 
        res();
        //console.log(data);
      }
    });
  });
}
// 3. Query
const query=(event)=>{
    var params = {
    TableName : "orders",
    KeyConditionExpression: "#id = :or",
    ExpressionAttributeNames:{
        "#id": "orderId"
    },
    ExpressionAttributeValues: {
        ":or": event.orderId
    }
};
  return   new Promise((res,rej)=>{
      docClient.query(params, function(err, data) {
        if (err){
          console.log(err, err.stack);
        rej();
        
        
       }else    { 
        res(data);
       // console.log(data);
      }
    });
  });
};
//4. PUT
//5. Insert
module.exports={scan,del,query};
