import {idGenerator} from "../../../shared/IdGenerator.js";
import {SimpleElement} from "../../simpleElements/SimpleElement.js";

export class Question {
    constructor(id, questionView, questionType, fieldGenerator) {
        this._questionId = `question__container-${id}`;
        this._simpleElements = new Map();
        this._questionView = questionView(this._questionId);
        this._questionType = questionType;
        this._fieldGenerator = fieldGenerator;
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
        let simpleElement = this._fieldGenerator(uniqueId, this._questionId);

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