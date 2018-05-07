import {SimpleElement} from "./SimpleElement.js";
import {DOM} from "../../shared/Constants.js";
import {idAdder} from "../../shared/IdGenerator.js";
import {instanceConstructor} from "../../shared/Common.js";

export class Radio extends SimpleElement {
    constructor(id, parentId) {
        super(id);
        this._parentId = parentId;
    }

    generateNode() {
        let node = super.generateNode();

        let div = DOM.create.element("div");
        let input = DOM.create.element("input");
        input.type = "radio";
        div.appendChild(input);
        div.appendChild(node);
        input.name = this._parentId;
        div.classList.add("form-inline");

        return div;
    }

    static createWithSettledId(...args) {
        return idAdder(this._radioCreator)(...args);
    }
}

Radio._radioCreator = instanceConstructor(Radio);