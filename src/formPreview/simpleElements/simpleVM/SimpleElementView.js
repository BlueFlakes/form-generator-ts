import {DOM} from "../../../shared/Constants.js";

export class SimpleElementView {
    constructor(simpleElementVM) {
        this._simpleElementVM = simpleElementVM;
    }

    inject(outerContainerId, elementId, content) {
        let input = DOM.create.element("input");
        input.id = elementId;
        input.placeholder = content;

        DOM.attach.child.byId(outerContainerId, input);
        this._injectEventListener(elementId);
    }

    _injectEventListener(thisId) {
        DOM.attach.event.byId(thisId, DOM.onEvent.keyUp, e => {
            let currentValue = e.target.value;
            this._simpleElementVM.notifyObservers(currentValue);
        });
    }
}