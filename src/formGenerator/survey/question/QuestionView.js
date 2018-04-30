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

    reRenderContainer(simpleElements) {
        let container = document.getElementById(this._questionsContainerIdentity);
        deleteChildNodes(container);
        QuestionView._injectSimpleElements(container, simpleElements);
        QuestionView._injectEventListeners(simpleElements);

        function deleteChildNodes(myNode) {
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
        }
    }

    injectContainerWithChildNodes(simpleElements, outerContainerIdentity) {
        let element = document.createElement('div');
        element.id = this._questionsContainerIdentity;

        QuestionView._injectSimpleElements(element, simpleElements);
        document.getElementById(outerContainerIdentity).appendChild(element);
        QuestionView._injectEventListeners(simpleElements);
    }

    static _injectSimpleElements(container, simpleElements) {
        let currentIndex = 0;
        simpleElements.forEach((currentSimpleElement) => {
            let elementView = currentSimpleElement.generateNode(currentIndex++);
            container.appendChild(elementView);
        });
    }

    static _injectEventListeners(simpleElements) {
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