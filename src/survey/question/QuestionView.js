export class QuestionView {
    constructor(questionsContainerIdentity) {
        this._questionsContainerIdentity = questionsContainerIdentity;
    }

    removeChildNode(simpleElementId) {
        let childNode = document.getElementById(simpleElementId);
        let parentNode = document.getElementById(this._questionsContainerIdentity);

        parentNode.removeChild(childNode);
    }

    injectSimpleElement(simpleElement) {
        let child = simpleElement.generateNode();
        document.getElementById(this._questionsContainerIdentity).appendChild(child);
        simpleElement.injectEventListener();
    }

    injectContainerWithChildNodes(simpleElements, outerContainerIdentity) {
        let element = document.createElement('div');
        element.id = this._questionsContainerIdentity;

        simpleElements.forEach((currentSimpleElement) => {
            let elementView = currentSimpleElement.generateNode();
            element.appendChild(elementView);
        });

        document.getElementById(outerContainerIdentity).appendChild(element);
        simpleElements.forEach((currentSimpleElement) => {
            currentSimpleElement.injectEventListener();
        })
    }

    removeThisQuestion() {
        let question = document.getElementById(this._questionsContainerIdentity);
        let parent = question.parentNode;

        parent.removeChild(question);
    }
}