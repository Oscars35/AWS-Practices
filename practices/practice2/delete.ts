import {DynamoDB} from "aws-sdk";

//Si async necessitem retornar una promesa (promise())
const handler = async(event: any, _context: any) => {
    //Creating DynamoDB instance
    const client = new DynamoDB.DocumentClient()
    await client.delete({
        TableName: 'oscar-salcedo-dynamodb-table',
        Key: {
            id: event.id
        }
    }).promise()
}
export {handler}