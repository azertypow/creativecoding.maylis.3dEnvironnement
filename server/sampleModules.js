export class ExternalClass {
    constructor() {
        console.log("executed code on instantiation [when you use 'new ExternalClass()']")
    }
}

export class AnAnotherClass {
    constructor(consoleMsg = "default value") {
        console.log("executed code on instantiation [when you use 'new AnAnotherClass()'] ", consoleMsg)
    }
}

export function simpleFunction() {
    console.log("simple function")
}
