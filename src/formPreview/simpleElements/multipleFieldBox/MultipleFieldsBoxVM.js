import {ObserversEden} from "../../observerPattern/ObserversEden.js";

export class MultipleFieldsBoxVM {
    constructor(simpleElementModel, multipleFieldsBoxViewCreator) {
        this._simpleElementModel = simpleElementModel;

        this._multipleFieldsBoxView = multipleFieldsBoxViewCreator(this);
        this._observersEden = new ObserversEden();
    }

    injectNode(contextData) {
        this._multipleFieldsBoxView.injectNodeIntoContainer(contextData, this._simpleElementModel);
        this._injectEventListener();
    }

    addObserver(observer) {
        this._observersEden.addObserver(observer);
    }

    _injectEventListener() {
        let checkBoxID = this._simpleElementModel.getId();
        this._multipleFieldsBoxView.injectEventListener(checkBoxID);
    }

    notifyObservers(ctx) {
        this._observersEden.notifyAll(ctx);
    }
}