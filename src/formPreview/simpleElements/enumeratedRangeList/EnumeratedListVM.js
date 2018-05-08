import {EnumeratedListView} from "./EnumeratedListView.js";
import {ObserversEden} from "../../observerPattern/ObserversEden.js";

export class EnumeratedListVM {
    constructor(enumeratedList) {
        this._enumeratedList = enumeratedList;
        this._enumeratedListView = new EnumeratedListView(this);
        this._observersEden = new ObserversEden();
    }

    injectNode(contextData) {
        let parentId = contextData.parentId;
        let thisId = this._enumeratedList.getId();
        let elements = this._enumeratedList.getEnumeratedListElements();

        this._enumeratedListView.inject(parentId, thisId, elements);
    }

    notifyObservers(ctx) {
        this._observersEden.notifyAll(ctx);
    }

    addObserver(observer) {
        this._observersEden.addObserver(observer);
    }
}