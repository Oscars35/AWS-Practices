"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event, context) => {
    console.log(event);
    console.log(context.functionName);
    console.log('Hello world lambda');
};
exports.handler = handler;
//# sourceMappingURL=helloWorld.js.map