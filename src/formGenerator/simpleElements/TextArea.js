import {SimpleElement} from "./SimpleElement.js";
import {DOM} from "../../shared/Constants.js";
import {idAdder} from "../../shared/IdGenerator.js";
import {instanceConstructor} from "../../shared/Common.js";

export class TextArea extends SimpleElement {

    generateNode() {
        let textArea = DOM.create.element("textarea");
        textArea.id = this.getId();

        return textArea;
    }

    static createWithSettledId(...args) {
        return idAdder(this._textAreaCreator)(...args);
    }
}

TextArea._textAreaCreator = instanceConstructor(TextArea);