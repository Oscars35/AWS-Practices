import {EventBridge} from "aws-sdk";
import {generateRandomInt} from "./utils";

const handler = async(event: any, _context: any) => {
    let newRound = checkParameters(event)
    let shot = generateRandomInt()
    console.log(shot)
    if (shot > 7) throw new Error("Finished Game!, Player 2 Lost")
    if (newRound > 10) throw new Error("Game finished, more than 10 rounds done")
    await putNewEvent(newRound)
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
                Source: 'player2',
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
    if(event.source != "player1") console.log("BAD SOURCE!")
}
export {handler}