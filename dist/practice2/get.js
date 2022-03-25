"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const handler = async (event, _context) => {
    const client = new aws_sdk_1.DynamoDB.DocumentClient();
    const response = await client.get({
        TableName: 'oscar-salcedo-dynamodb-table',
        Key: {
            id: event.id
        }
    }).promise();
    return response.Item;
};
exports.handler = handler;
//# sourceMappingURL=get.js.map