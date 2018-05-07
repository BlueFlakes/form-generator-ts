import {MultipleFieldsBoxVM} from "../MultipleFieldsBoxVM.js";
import {rightSideContextAdder} from "../../../../shared/Common.js";
import {MultipleFieldsBoxView} from "../MultipleFieldsBoxView.js";
import {RadioBoxView} from "./RadioBoxView.js";

export class RadioBoxVM {
    constructor(multipleFieldsBox) {
        this._multipleFieldsBox = multipleFieldsBox;

        let viewCreator = rightSideContextAdder(params => {
            return new RadioBoxView(...params);
        }, "radio");

        this._multipleFieldsBoxVM = new MultipleFieldsBoxVM(this._multipleFieldsBox, viewCreator);
    }

    injectNode(contextData) {
        this._multipleFieldsBoxVM.injectNode(contextData);
    }

    addObserver(observer) {
        this._multipleFieldsBoxVM.addObserver(observer);
    }
}