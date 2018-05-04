import {DOM} from "../../shared/Constants.js";
import {idAdder} from "../../shared/IdGenerator.js";
import {instanceConstructor} from "../../shared/Common.js";
import {ArrayList} from "../../shared/ArrayList.js";

export class Button {
    constructor(id, name, task) {
        this._id = `btn-${id}`;
        this._name = name;
        this._task = task; // task should be function
        this._additionalCharacteristics = new Map();
    }

    generateNode() {
        let button = DOM.create.element("button");
        settleAdditionalCharacteristics(button, this._additionalCharacteristics);

        button.type = "button";
        button.textContent = `+ ${this._name}`;
        button.id = this._id;

        return button;

        function settleAdditionalCharacteristics(btn, characteristics) {
            characteristics.forEach(function (value, key) {
                btn[key] = value;
            });
        }
    }

    setAttribute(field, value) {
        this._additionalCharacteristics.set(field, value);
    }

    getId() {
        return this._id;
    }

    injectEventListener() {
        let onEvent = DOM.onEvent.click;
        DOM.attach.event.byId(this._id, onEvent, this._task);
    }

    destroy() {
        let self = DOM.getElement.byId(this._id);
        let parent = self.parentNode;

        parent.removeChild(self);
    }

    static createWithSettledId(...args) {
        return idAdder(this._buttonCreator)(...args);
    }
}

Button._buttonCreator = instanceConstructor(Button);