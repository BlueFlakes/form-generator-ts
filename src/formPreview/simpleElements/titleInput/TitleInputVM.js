import {TitleInputView} from "./TitleInputView.js";

export class TitleInputVM {
    constructor(simpleElementModel) {
        this._simpleElementModel = simpleElementModel;
        this._titleInputView = new TitleInputView(this);
    }

    injectNode(contextData) {
        let outerContainerId = contextData.parentId;

        let elementId = this._simpleElementModel.getId();
        let content = this._simpleElementModel.getContent();

        this._titleInputView.inject(outerContainerId, elementId, content);
    }
}