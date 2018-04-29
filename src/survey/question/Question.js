import {idGenerator} from "../../shared/IdGenerator.js";
import {SimpleElement} from "../../simpleElements/SimpleElement.js";

export class Question {
    constructor(id, questionView, questionType) {
        this._questionId = id;
        this._simpleElements = new Map();
        this._questionView = questionView;
        this._questionType = questionType;
    }

    getQuestionType() {
        return this._questionType;
    }

    getSimpleElements() {
        return this._simpleElements;
    }

    getId() {
        return this._questionId;
    }

    addSimpleElement() {
        let uniqueId = idGenerator.nextId();
        let simpleElement = new SimpleElement(uniqueId);

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