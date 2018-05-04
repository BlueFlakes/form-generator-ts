import {ObserversEden} from "../../observerPattern/ObserversEden.js";
import {CheckBoxView} from "./CheckBoxView.js";

export class CheckBoxVM {
    constructor(checkBox) {
        this._checkBox = checkBox;

        this._checkBoxView = new CheckBoxView(this);
        this._observersEden = new ObserversEden();
    }

    injectNode() {
        this._checkBoxView.injectNodeIntoContainer(this._checkBox);
        this._injectEventListener();
    }

    addObserver(observer) {
        this._observersEden.addObserver(observer);
    }

    _injectEventListener() {
        let checkBoxID = this._checkBox.getId();
        this._checkBoxView.injectEventListener(checkBoxID);
    }

    notifyObservers(ctx) {
        this._observersEden.notifyAll(ctx);
    }
}