import {DOM} from "../../shared/Constants.js";
import {idAdder} from "../../shared/IdGenerator.js";
import {instanceConstructor} from "../../shared/Common.js";

export class SimpleElement {
    constructor(id) {
        this._id = id;
        this._currentValue = null;
    }

    injectEventListener() {
        let onEvent = DOM.onEvent.keyUp;

        DOM.attach.event.byId(this._id, onEvent, e => {
            this._currentValue = e.target.value;
            console.log(this._currentValue);
        });
    }

    getCurrentValue() {
        return this._currentValue;
    }

    setCurrentValue(recentValue) {
        this._currentValue = recentValue;
    }

    getId() {
        return this._id;
    }

    generateNode() {
        let element = DOM.create.element("input");
        element.type = "text";
        element.value = this.getCurrentValue();
        element.id = this._id;
        return element;
    }

    static createWithSettledId(...args) {
        return idAdder(this._simpleElementCreator)(...args);
    }
}

SimpleElement._simpleElementCreator = instanceConstructor(SimpleElement);