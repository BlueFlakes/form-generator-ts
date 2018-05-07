import {ArrayList} from "../../../shared/ArrayList.js";
import {ValueHolder} from "../../observerPattern/ValueHolder.js";

export class Question {
    constructor(id) {
        this._id = id;

        this._simpleElements = new ArrayList();
        this._valueHolder = new ValueHolder();
    }

    _getValueHolderAccessOnlyByVM() {
        return this._valueHolder;
    }

    getId() {
        return this._id;
    }

    getCurrentValue() {
        return this._valueHolder.getValue();
    }

    addSimpleElement(simpleElement) {
        this._simpleElements.add(simpleElement);
    }

    getSimpleElementsIterator() {
        return this._simpleElements.iterator();
    }
}