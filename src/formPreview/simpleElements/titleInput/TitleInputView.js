import {DOM} from "../../../shared/Constants.js";

export class TitleInputView {
    constructor(titleInputVM) {
        this._titleInputVM = titleInputVM;
    }

    inject(outerContainerId, elementId, content) {
        let div = DOM.create.element("div");
        div.id = elementId;

        let title = DOM.create.element("h3");
        title.textContent = content;
        div.appendChild(title);

        DOM.attach.child.byId(outerContainerId, div);
    }
}