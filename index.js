var AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-south-1",
    
});

var docClient = new AWS.DynamoDB.DocumentClient();
const{scan,del,query}=require('./dynamodb');

exports.handler = async (event) => {
  switch(event.action)
  {
  case 'scan':
  const data1= await scan(event);
  const s=
  {
   status:200,
  data:data1
   
  };
  return s;
  break;
  
  case 'del':
   await del(event);
  const obj=
  {
   status:200,
   msg:"item deleted"
   
  };
  return obj;
   break;
  
  case 'query':
 const data= await query(event);
 console.log(data);
  const ob=
  {
   status:200,
   data:data
   
  };
  return ob;
  
  break;
  
default:
 console.log("HELLO");
  

}
};