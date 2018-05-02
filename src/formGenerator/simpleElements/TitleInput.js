import {SimpleElement} from "./SimpleElement.js";
import {idAdder} from "../../shared/IdGenerator.js";
import {instanceConstructor} from "../../shared/Common.js";

export class TitleInput extends SimpleElement {
    generateNode() {
        let node = super.generateNode();
        node.placeholder = "Title";

        return node;
    }

    static createWithSettledId(...args) {
        return idAdder(this._titleInputCreator)(args);
    }
}

TitleInput._titleInputCreator = instanceConstructor(TitleInput);