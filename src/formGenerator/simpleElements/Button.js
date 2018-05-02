import {DOM} from "../../shared/Constants.js";
import {idAdder} from "../../shared/IdGenerator.js";

export class Button {
    constructor(id, name, task) {
        this._id = `btn-${id}`;
        this._name = name;
        this._task = task; // task should be function
    }

    generateNode() {
        let button = DOM.create.element("button");
        button.type = "button";
        button.textContent = `+ ${this._name}`;
        button.id = this._id;

        return button;
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
        return idAdder(this._buttonCreator)(args);
    }
}

Button._buttonCreator = params => {
    return new Button(...params);
};