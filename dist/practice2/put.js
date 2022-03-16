"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const handler = async (event, _context) => {
    const client = new aws_sdk_1.DynamoDB.DocumentClient();
    await client.put({
        Item: Object.assign({ id: event.id }, event.data),
        TableName: "oscar-salcedo-dynamodb-table"
    }).promise();
};
exports.handler = handler;
//# sourceMappingURL=put.js.map