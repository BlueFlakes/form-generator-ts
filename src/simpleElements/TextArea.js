import {SimpleElement} from "./SimpleElement.js";

export class TextArea extends SimpleElement {

    generateNode() {
        let textArea = document.createElement('textarea');
        textArea.id = this.getId();

        return textArea;
    }
}