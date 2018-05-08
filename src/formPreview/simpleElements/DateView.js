import {DOM} from "../../shared/Constants.js";

export class DateView {
    constructor(simpleElementVM) {
        this._simpleElementVM = simpleElementVM;
    }

    inject(outerContainerId, thisId, content) {

        let input = DOM.create.element("input");
        input.type = "date";
        input.id = thisId;

        DOM.attach.child.byId(outerContainerId, input);

        this._injectEventListener(thisId);
    }

    _injectEventListener(thisId) {
        DOM.attach.event.byId(thisId, DOM.onEvent.change, e => {
            let currentValue = e.target.value;
            this._simpleElementVM.notifyObservers({
                value: currentValue
            });
        });
    }
}