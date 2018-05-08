import {SimpleElementView} from "./SimpleElementView.js";
import {ObserversEden} from "../observerPattern/ObserversEden.js";

export class SimpleElementVM {
    constructor(simpleElementModel, viewCreator) {
        this._simpleElementModel = simpleElementModel;
        this._simpleElementView = viewCreator(this);
        this._observersEden = new ObserversEden();
    }



    injectNode(contextData) {
        let parentId = contextData.parentId;
        let thisId = this._simpleElementModel.getId();
        let content = this._simpleElementModel.getContent();

        this._simpleElementView.inject(parentId, thisId, content);
    }

    notifyObservers(ctx) {
        this._observersEden.notifyAll(ctx);
    }

    addObserver(observer) {
        this._observersEden.addObserver(observer);
    }
}