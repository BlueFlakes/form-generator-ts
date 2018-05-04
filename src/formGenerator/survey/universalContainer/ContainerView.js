import {DOM} from "../../../shared/Constants.js";

export class ContainerView {
    constructor(id) {
        this._id = id;
    }

    injectContainerWithChildNodes(outerContainerIdentity, nodes) {
        let div = document.createElement("div");
        div.id = this._id;

        nodes.forEach(option => {
            let node = option.generateNode();
            div.appendChild(node);
        });

        DOM.attach.child.byId(outerContainerIdentity, div);
        nodes.forEach(option => {
            option.injectEventListener();
        });
    }

    removeContainer() {
        let self = document.getElementById(this._id);
        let parent = self.parentNode;
        parent.removeChild(self);
    }
}