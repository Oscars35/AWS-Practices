"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const handler = async (event, _context) => {
    let newRound = checkParameters(event);
    putNewEvent(newRound);
};
exports.handler = handler;
function checkParameters(event) {
    checkSource(event);
    return changeRound(event);
}
function putNewEvent(newRound) {
    const eventBridge = new aws_sdk_1.EventBridge();
    eventBridge.putEvents({
        Entries: [
            {
                Detail: String({ round: newRound }),
                DetailType: 'ping-pong-event',
                EventBusName: 'oscar-salcedo-event-bridge',
                Source: 'player1',
                Time: new Date,
            },
        ]
    });
}
function changeRound(event) {
    console.log("Round " + event.detail.round);
    if (event.detail.round === "start") {
        console.log("STARTING");
        return 0;
    }
    else {
        return event.detail.round + 1;
    }
}
function checkSource(event) {
    let source = event.source;
    if (source != "player2")
        console.log("BAD SOURCE!");
}
//# sourceMappingURL=playerOne.js.map