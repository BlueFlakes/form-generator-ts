export class Container {
    constructor(id, containerIdentity, containerView) {
        this._id = `${containerIdentity}-${id}`;
        this._containerView = containerView(this._id);

        this.nodes = new Map();
    }

    addNode(key, deliveredNode) {
        this.nodes.set(key, deliveredNode);
    }

    getId() {
        return this._id;
    }

    removeNode(key) {
        this.nodes.delete(key);
    }

    inject(outerContainerIdentity) {
        this._containerView.injectContainerWithChildNodes(outerContainerIdentity, this.nodes);
    }

    destroy() {
        this._containerView.removeContainer();
    }
}