import AWS from 'aws-sdk'

AWS.config.update({
  region: "ap-northeast-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.LinkShortenerTable;

const getLink = (value) => {
  return new Promise((resolve,reject) => {
    const params = {
      TableName: "Link_Shortener_Table",
      IndexName: "shortenedLink-index",
      KeyConditionExpression: "shortenedLink = :value",
      ExpressionAttributeValues: {
          ":value" : value
      }
    }
    console.log(params)
    dynamoClient.query(params, (error,data) => {
      if(error){
        reject({ success: false, data: null }) 
      }else{
        console.log(data);
        resolve({ success: true, data: data })
      }
    })
  })
}

const getAllLinks = () => {
  return new Promise((resolve,reject) => {
    const params = {
      TableName: "Link_Shortener_Table",
    }
    console.log(params)
    dynamoClient.scan(params, (error,data) => {
      if(error){
        reject({ success: false, data: null }) 
      }else{
        console.log(data);
        resolve({ success: true, data: data })
      }
    })
  })
}

const insertLink = (toPost) => {
  return new Promise((resolve,reject) => {
    const params = {
      TableName: "Link_Shortener_Table",
      Item: toPost
    }
    console.log(params)
    dynamoClient.put(params, (error,data) => {
      if(error){
        reject({ success: false, data: null }) 
      }else{
        console.log(data);
        resolve({ success: true, data: data })
      }
    })
  })
}

export {
    getLink,
    getAllLinks,
    insertLink
}