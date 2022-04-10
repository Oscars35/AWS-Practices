"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const utils_1 = require("./utils");
const handler = async (event, _context) => {
    let newRound = checkParameters(event);
    let shot = (0, utils_1.generateRandomInt)();
    console.log(shot);
    if (shot > 7)
        throw new Error("Finished Game!, Player 2 Lost");
    if (newRound > 10)
        throw new Error("Game finished, more than 10 rounds done");
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
                Detail: JSON.stringify({
                    round: newRound
                }),
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