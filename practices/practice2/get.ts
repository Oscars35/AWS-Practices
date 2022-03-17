import {DynamoDB} from "aws-sdk";

//Si async necessitem retornar una promesa (promise())
const handler = async(event: any, _context: any) => {
    //Event is the data, context the function
    //Creating DynamoDB instance
    const client = new DynamoDB.DocumentClient()
    let result = await client.get({
        TableName: 'oscar-salcedo-dynamodb-table',
        Key: {
            id: event.id
        }
    }).promise()

    console.log(result)
}
export {handler}