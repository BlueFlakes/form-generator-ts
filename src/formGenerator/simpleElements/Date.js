import {SimpleElement} from "./SimpleElement.js";
import {DOM} from "../../shared/Constants.js";
import {idAdder} from "../../shared/IdGenerator.js";

// I recommend to find another way for injecting Date ( like three fields with select )
// or inject automatically current date
export class Date extends SimpleElement {
    constructor(id) {
        super(id);
    }

    injectEventListener() {
        let thisId = this.getId();
        let onEvent = DOM.onEvent.change;

        DOM.attach.event.byId(thisId, onEvent, e => {
            this.setCurrentValue(e.target.value);
        });
    }

    generateNode() {
        let element = DOM.create.element("input");
        element.type = "date";
        element.value = this.getCurrentValue();
        element.id = this.getId();
        return element;
    }

    static createWithSettledId(...args) {
        return idAdder(this._dateCreator)(args);
    }
}

Date._dateCreator = params => {
    return new Date(...params);
};