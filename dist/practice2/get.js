"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const handler = async (event, _context) => {
    const client = new aws_sdk_1.DynamoDB.DocumentClient();
    return await client.get({
        TableName: 'oscar-salcedo-dynamodb-table',
        Key: {
            id: event.id
        }
    }).promise();
};
exports.handler = handler;
//# sourceMappingURL=get.js.map