const parameters = {
    minStateIndex: 0,
    maxStateIndex: 9,
}

function getNexState(currentStateIndex) {

    const nextState = currentStateIndex + 1

    return nextState > parameters.maxStateIndex || nextState < parameters.minStateIndex ?
        currentStateIndex : nextState
}

