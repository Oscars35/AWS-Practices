import {EventBridge} from "aws-sdk";

const handler = async(event: any, _context: any) => {
    //Event is the data, context the function
    let newRound = checkParameters(event)
    putNewEvent(newRound)
}

function checkParameters(event: any) {
    checkSource(event)
    return changeRound(event)
}

function putNewEvent(newRound: Number) {
    const eventBridge = new EventBridge();
    eventBridge.putEvents({
        Entries: [ /* required */
            {
                Detail: String({round : newRound}),
                DetailType: 'ping-pong-event',
                EventBusName: 'oscar-salcedo-event-bridge',
                Source: 'player1',
                Time: new Date,
            },
        ]
    })
}

function changeRound(event: any) {
    console.log("Round " + event.detail.round)
    if (event.detail.round === "start") {
        console.log("STARTING")
        return 0
    }
    else {
        return event.detail.round + 1
    }
}

function checkSource(event: any) {
    let source: String = event.source
    if(source != "player2") console.log("BAD SOURCE!")
}
export {handler}