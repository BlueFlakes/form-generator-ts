import {idGenerator} from "../../shared/IdGenerator.js";
import {ShortTextInput} from "../../simpleElements/ShortTextInput.js";

export class Question {
    constructor(id, questionView) {
        this._questionId = id;
        this._simpleElements = new Map();
        this._questionView = questionView;
    }

    getId() {
        return this._questionId;
    }

    addSimpleElement() {
        let uniqueId = idGenerator.nextId();
        let simpleElement = new ShortTextInput(uniqueId);

        this._simpleElements.set(uniqueId, simpleElement);
        this._questionView.injectSimpleElement(simpleElement);
    }

    removeSimpleElement(simpleElementId) {
        this._questionView.removeChildNode(simpleElementId);
        this._simpleElements.delete(simpleElementId);
    }

    inject(outerContainerIdentity) {
        this._questionView.injectContainerWithChildNodes(this._simpleElements, outerContainerIdentity);
    }

    destroy() {
        this._questionView.removeThisQuestion();
    }
}