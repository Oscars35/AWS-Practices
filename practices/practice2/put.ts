import {DynamoDB} from "aws-sdk";

//Si async necessitem retornar una promesa (promise())
const handler = async(event: any, _context: any) => {
    //Creating DynamoDB instance
    const client = new DynamoDB.DocumentClient()
    await client.put({ //await, funció executa de forma asíncrona
        Item: {
            //Els ... diu que en comptes de key1: event.data.key1, key2: event.data.key2 ...
            id: event.id, ...event.data
        },
        TableName: "oscar-salcedo-dynamodb-table"
    }).promise()
}
export {handler}