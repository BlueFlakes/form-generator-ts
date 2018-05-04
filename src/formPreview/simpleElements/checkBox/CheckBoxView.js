import {DOM} from "../../../shared/Constants.js";

export class CheckBoxView {
    constructor(checkBoxVM) {
        this._checkBoxVM = checkBoxVM;
    }

    injectEventListener(id) {
        let onEvent = DOM.onEvent.click;

        DOM.attach.event.byId(id, onEvent, e => {
            console.log(e.target.value);

            this._checkBoxVM.notifyObservers({
                value: e.target.value
            });
        });
    }

    injectNodeIntoContainer(checkBoxModel) {
        let container = createContainer(checkBoxModel);
        let outerContainerID = checkBoxModel.getParentId();

        DOM.attach.child.byId(outerContainerID, container);

        function createContainer(checkBoxModel) {
            let checkBoxID = checkBoxModel.getId();

            let input = createCheckBox();
            input.id = checkBoxID;
            input.value = "off";

            let content = checkBoxModel.getLabel();
            let label = createLabel(checkBoxID, content);

            return getContainerWithGivenChilds(input, label);

            function createCheckBox() {
                let input = DOM.create.element("input");
                input.type = "checkbox";

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
}