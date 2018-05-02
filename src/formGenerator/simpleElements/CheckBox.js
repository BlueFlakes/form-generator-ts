import {SimpleElement} from "./SimpleElement.js";
import {DOM} from "../../shared/Constants.js";
import {idAdder} from "../../shared/IdGenerator.js";

export class CheckBox extends SimpleElement {
    constructor(id, parentId) {
        super(id);
        this._parentId = parentId;
    }

    generateNode() {
        let node = super.generateNode();

        let div = DOM.create.element("div");
        let input = DOM.create.element("input");
        input.type = "checkbox";
        div.appendChild(input);
        div.appendChild(node);
        input.name = this._parentId;

        return div;
    }

    static createWithSettledId(...args) {
        return idAdder(this._checkBoxCreator)(args);
    }
}

CheckBox._checkBoxCreator = params => {
    return new CheckBox(...params);
};