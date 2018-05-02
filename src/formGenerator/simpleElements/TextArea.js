import {SimpleElement} from "./SimpleElement.js";
import {DOM} from "../../shared/Constants.js";
import {idAdder} from "../../shared/IdGenerator.js";

export class TextArea extends SimpleElement {

    generateNode() {
        let textArea = DOM.create.element("textarea");
        textArea.id = this.getId();

        return textArea;
    }

    static createWithSettledId(...args) {
        return idAdder(this._textAreaCreator)(args);
    }
}

TextArea._textAreaCreator = (...params) => {
    return new TextArea(...params);
};