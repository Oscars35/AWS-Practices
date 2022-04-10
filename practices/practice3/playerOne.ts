import {EventBridge} from "aws-sdk";

const handler = async(event: any, _context: any) => {
    //Event is the data, context the function
    let newRound = checkParameters(event)
    let shot = generateRandomInt()
    if (shot > 7) throw new Error("Finished Game!, Player 1 Lost")
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
    if(event.source != "player2") console.log("BAD SOURCE!")
}

function generateRandomInt(): Number {
    return Math.floor(Math.random() * (10 - 0 + 1) + 0)
}

export {handler}