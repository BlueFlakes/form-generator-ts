import {DOM} from "../../../shared/Constants.js";

export class MultipleFieldsBoxView {
    constructor(multipleFieldsVM, inputType) {
        this._multipleFieldsVM = multipleFieldsVM;
        this._inputType = inputType;
    }

    injectEventListener(id) {
        this._multipleFieldsVM.hasOwnProperty("");
        throw "Error: Not Implemented";
    }

    injectNodeIntoContainer(contextData, multipleFieldsModel) {
        let parentId = contextData.parentId;
        let container = this._createContainer(parentId, multipleFieldsModel);

        DOM.attach.child.byId(parentId, container);
    }

    _createContainer(parentContainerID, multipleFieldsModel) {
        let checkBoxID = multipleFieldsModel.getId();

        let input = createCheckBox(this._inputType);
        input.id = checkBoxID;
        input.name = parentContainerID;

        let content = multipleFieldsModel.getContent();
        let label = createLabel(checkBoxID, content);

        return getContainerWithGivenChilds(input, label);

        function createCheckBox(inputType) {
            let input = DOM.create.element("input");
            input.type = inputType;

            return input;
        }

        function createLabel(id, content) {
            let label = DOM.create.element("label");
            label.for = id;
            label.textContent = content;

            return label;
        }

        function getContainerWithGivenChilds(...childs) {
            let div = DOM.create.element("div");

            childs.forEach(currentChild => {
                div.appendChild(currentChild);
            });

            return div;
        }
    }
}