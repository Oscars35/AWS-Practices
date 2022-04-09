"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const handler = async (event, _context) => {
    let newRound = checkParameters(event);
    if (newRound == 10)
        throw new Error("Finish!");
    await putNewEvent(newRound);
};
exports.handler = handler;
function checkParameters(event) {
    checkSource(event);
    return changeRound(event);
}
function putNewEvent(newRound) {
    const eventBridge = new aws_sdk_1.EventBridge();
    return eventBridge.putEvents({
        Entries: [
            {
                Source: 'player2',
                DetailType: 'ping-pong-event',
                Detail: String({ round: newRound }),
                EventBusName: 'oscar-salcedo-event-bridge',
            },
        ]
    }).promise();
}
function changeRound(event) {
    console.log("Round " + event.detail.round);
    if (isNaN(event.detail.round)) {
        console.log("STARTING");
        return 0;
    }
    else {
        return event.detail.round + 1;
    }
}
function checkSource(event) {
    if (event.source != "player1")
        console.log("BAD SOURCE!");
}
//# sourceMappingURL=playerTwo.js.map