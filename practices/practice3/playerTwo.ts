import {EventBridge} from "aws-sdk";

const handler = async(event: any, _context: any) => {
    let newRound = checkParameters(event)
    if(newRound == 10) throw new Error("Finish!")
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
                Detail: String({round : newRound}),
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