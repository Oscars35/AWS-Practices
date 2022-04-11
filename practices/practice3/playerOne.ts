import {EventBridge} from "aws-sdk";
import {generateRandomInt} from "./utils";

const handler = async(event: any, _context: any) => {
    let newRound = checkParameters(event)
    let shot = generateRandomInt()
    if(checkForGameFinished(newRound - 1, shot)) {
        console.log("Shot was: " + shot.toString() + " and round: " + (newRound - 1).toString() + " ,game finished!")
        console.log("Game finished!")
    }
    else await putNewEvent(newRound)
}

function checkForGameFinished(newRound: Number, shot: Number) : Boolean {
    return shot > 7 || newRound > 10
}

function checkParameters(event: any) {
    checkSource(event)
    return changeRound(event)
}

function putNewEvent(newRound: Number) {
    const eventBridge = new EventBridge();
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
    }).promise()
}

function changeRound(event: any) {
    console.log("Round " + event.detail.round)
    if (isNaN(event.detail.round)) {
        console.log("STARTING")
        return 0
    }
    else {
        return event.detail.round + 1
    }
}

function checkSource(event: any) {
    if(event.source != "player2") throw new Error("BAD SOURCE")
}

export {handler}