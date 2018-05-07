import {SimpleElement} from "./SimpleElement.js";
import {DOM} from "../../shared/Constants.js";
import {idAdder} from "../../shared/IdGenerator.js";
import {instanceConstructor} from "../../shared/Common.js";

export class EnumeratedListElement extends SimpleElement {

    generateNode(currentIndex) {
        let currentNode = super.generateNode();

        let label = DOM.create.element("label");
        label.for = currentNode.id;
        label.textContent = currentIndex + 1;

        let div = DOM.create.element("div");

        div.appendChild(label);
        div.appendChild(currentNode);
        div.classList.add("form-inline");

        return div;
    }

    static createWithSettledId(...args) {
        return idAdder(this._enumeratedListElementCreator)(...args);
    }
}

EnumeratedListElement._enumeratedListElementCreator = instanceConstructor(EnumeratedListElement);