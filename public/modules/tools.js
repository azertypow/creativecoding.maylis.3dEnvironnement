const parameters = {
    minStateIndex: 0,
    maxStateIndex: 9,
}

function getNexState(currentStateIndex) {

    const nextState = currentStateIndex + 1

    return nextState > parameters.maxStateIndex || nextState < parameters.minStateIndex ?
        currentStateIndex : nextState
}

/**
 *
 * @param min {number} // inclusive
 * @param max {number} // exclusive
 * @return {number}
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

class AreaDetections {

    /**
     * Enum for tri-state values.
     * @enum {number}
     */
    static POSE = {
        top_left :      0,
        top_right :     1,
        bottom_right :  2,
        bottom_left :   3,
    };

    container =      document.querySelector(".area-detections")
    top_left =       this.container.querySelector(".area-detections__top-left")
    top_right =      this.container.querySelector(".area-detections__top-right")
    bottom_right =   this.container.querySelector(".area-detections__bottom-right")
    bottom_left =    this.container.querySelector(".area-detections__bottom-left")

    #numberOfPosition = 4
    #randomPoseIndex = getRandomInt(0, this.#numberOfPosition)

    /**
     * @param onActivatedAreaClick {function}
     */
    constructor(onActivatedAreaClick) {
        this.top_left.addEventListener(     "click",    () => {this.#areaClicked(AreaDetections.POSE.top_left)})
        this.top_right.addEventListener(    "click",    () => {this.#areaClicked(AreaDetections.POSE.top_right)})
        this.bottom_right.addEventListener( "click",    () => {this.#areaClicked(AreaDetections.POSE.bottom_right)})
        this.bottom_left.addEventListener(  "click",    () => {this.#areaClicked(AreaDetections.POSE.bottom_left)})

        this.top_left.addEventListener(     "touchend",    () => {this.#areaClicked(AreaDetections.POSE.top_left)})
        this.top_right.addEventListener(    "touchend",    () => {this.#areaClicked(AreaDetections.POSE.top_right)})
        this.bottom_right.addEventListener( "touchend",    () => {this.#areaClicked(AreaDetections.POSE.bottom_right)})
        this.bottom_left.addEventListener(  "touchend",    () => {this.#areaClicked(AreaDetections.POSE.bottom_left)})

        this.onActivatedAreaClick = onActivatedAreaClick
    }

    onActivatedAreaClick() {}

    /**
     * @param positionName {POSE}
     */
    #areaClicked(positionName) {
        if(this.#isAreaActivated(positionName)) {
            this.onActivatedAreaClick()
            this.#randomPoseIndex = getRandomInt(0, this.#numberOfPosition)
        }
    }

    /**
     * @param positionName {POSE}
     */
    #isAreaActivated(positionName) {
        switch (positionName) {
            case AreaDetections.POSE.top_left:
                return this.#randomPoseIndex === AreaDetections.POSE.top_left

            case AreaDetections.POSE.top_right:
                return this.#randomPoseIndex === AreaDetections.POSE.top_right

            case AreaDetections.POSE.bottom_right:
                return this.#randomPoseIndex === AreaDetections.POSE.bottom_right

            case AreaDetections.POSE.bottom_left:
                return this.#randomPoseIndex === AreaDetections.POSE.bottom_left
        }
    }
}

