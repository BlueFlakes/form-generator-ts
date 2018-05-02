import {idGenerator} from "../../../shared/IdGenerator.js";
import {idAdder} from "../../../shared/IdGenerator.js";

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

    // trick to workaround re rendering only this part of section
    reRender() {
        this._questionView.reRenderContainer(this._simpleElements);
    }

    destroy() {
        this._questionView.removeThisQuestion();
    }

    static createWithSettledId(...args) {
        return idAdder(this._questionCreator)(args);
    }
}

Question._questionCreator = (...params) => {
    return new Question(...params);
};