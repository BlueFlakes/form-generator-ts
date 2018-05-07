import {MultipleFieldsBoxVM} from "../MultipleFieldsBoxVM.js";
import {rightSideContextAdder} from "../../../../shared/Common.js";
import {MultipleFieldsBoxView} from "../MultipleFieldsBoxView.js";
import {CheckBoxView} from "./CheckBoxView.js";

export class CheckBoxVM {
    constructor(multipleFieldsBox) {
        this._multipleFieldsBox = multipleFieldsBox;

        let viewCreator = rightSideContextAdder(params => {
            return new CheckBoxView(...params);
        }, "checkbox");

        this._multipleFieldsBoxVM = new MultipleFieldsBoxVM(this._multipleFieldsBox, viewCreator);
    }

    injectNode(contextData) {
        this._multipleFieldsBoxVM.injectNode(contextData);
    }

    addObserver(observer) {
        this._multipleFieldsBoxVM.addObserver(observer);
    }
}