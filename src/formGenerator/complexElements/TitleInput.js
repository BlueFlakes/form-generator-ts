import {SimpleElement} from "../simpleElements/SimpleElement.js";
import {idAdder} from "../../shared/IdGenerator.js";
import {instanceConstructor} from "../../shared/Common.js";
import {DOM} from "../../shared/Constants.js";

export class TitleInput {
    constructor(id) {
        this._id = `title-${id}`;
        this._titleHolder = SimpleElement.createWithSettledId();
    }

    getId() {
        return this._id;
    }

    getCurrentValue() {
        let value = this._titleHolder.getCurrentValue();
        return value.length === 0 ? "Empty title" : value;
    }

    _generateNode() {
        let div = DOM.create.element("div");
        div.id = this._id;

        let titleHolderNode = this._titleHolder.generateNode();
        titleHolderNode.placeholder = "Title";
        div.appendChild(titleHolderNode);

        return div;
    }

    _injectEventListener() {
        this._titleHolder.injectEventListener();
    }

    inject(parentContainerId) {
        let node = this._generateNode();
        DOM.attach.child.byId(parentContainerId, node);

        this._injectEventListener();
    }

    static createWithSettledId(...args) {
        return idAdder(this._titleInputCreator)(...args);
    }
}

TitleInput._titleInputCreator = instanceConstructor(TitleInput);