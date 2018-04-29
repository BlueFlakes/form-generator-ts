export class Button {
    constructor(id, name, task) {
        this._id = `btn-${id}`;
        this._name = name;
        this._task = task; // task should be function
    }

    generateNode() {
        let button = document.createElement('button');
        button.type = 'button';
        button.textContent = `+ ${this._name}`;
        button.id = this._id;

        return button;
    }

    getId() {
        return this._id;
    }

    injectEventListener() {
        document.getElementById(this._id).addEventListener('click', this._task);
    }

    destroy() {
        let self = document.getElementById(this._id);
        let parent = self.parentNode;

        parent.removeChild(self);
    }
}