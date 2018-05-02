import {SimpleElement} from "./SimpleElement.js";
import {DOM} from "../../shared/Constants.js";

export class TextArea extends SimpleElement {

    generateNode() {
        let textArea = DOM.create.element("textarea");
        textArea.id = this.getId();

        return textArea;
    }
}