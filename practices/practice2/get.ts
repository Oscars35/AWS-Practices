import {DynamoDB} from "aws-sdk";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";

//Si async necessitem retornar una promesa (promise())
const handler = async(event: any, _context: any) : Promise<DocumentClient.AttributeMap | undefined> => {
    //Event is the data, context the function
    //Creating DynamoDB instance
    const client = new DynamoDB.DocumentClient()
    const response = await client.get({
        TableName: 'oscar-salcedo-dynamodb-table',
        Key: {
            id: event.id
        }
    }).promise()

    return response.Item
}
export {handler}