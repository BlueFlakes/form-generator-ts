export class ContainerView {
    constructor(id) {
        this._id = id;
    }

    injectContainerWithChildNodes(outerContainerIdentity, nodes) {
        let div = document.createElement('div');
        div.id = this._id;

        nodes.forEach((option) => {
            div.appendChild(option.generateNode());
        });

        document.getElementById(outerContainerIdentity).appendChild(div);
        nodes.forEach((option) => {
            option.injectEventListener();
        });
    }

    removeContainer() {
        let self = document.getElementById(this._id);
        let parent = self.parentNode;
        parent.removeChild(self);
    }
}