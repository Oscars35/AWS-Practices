"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const utils_1 = require("./utils");
const handler = async (event, _context) => {
    let newRound = checkParameters(event);
    let shot = (0, utils_1.generateRandomInt)();
    if (checkForGameFinished(newRound - 1, shot)) {
        console.log("Shot was: " + shot.toString() + " and round: " + (newRound - 1).toString() + " ,game finished!");
        console.log("Game finished!");
    }
    else
        await putNewEvent(newRound);
};
exports.handler = handler;
function checkForGameFinished(newRound, shot) {
    return shot > 7 || newRound > 10;
}
function checkParameters(event) {
    checkSource(event);
    return changeRound(event);
}
function putNewEvent(newRound) {
    const eventBridge = new aws_sdk_1.EventBridge();
    return eventBridge.putEvents({
        Entries: [
            {
                Source: 'player1',
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
    if (event.source != "player2")
        throw new Error("BAD SOURCE");
}
//# sourceMappingURL=playerOne.js.map