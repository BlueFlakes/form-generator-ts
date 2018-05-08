import {DOM} from "../../../shared/Constants.js";

export class EnumeratedListView {
    constructor(enumeratedListVM) {
        this._enumeratedListVM = enumeratedListVM;
    }

    inject(outerContainerId, thisId, simpleElements) {

        let div = DOM.create.element("div");
        let selectList = DOM.create.element("select");
        selectList.id = thisId;
        div.appendChild(selectList);
        selectList.classList.add("form-control");

        fillOptionContainer(simpleElements, selectList);

        DOM.attach.child.byId(outerContainerId, div);
        this._injectEventListener(thisId);

        function fillOptionContainer(simpleElements, selectList) {
            simpleElements.forEach(function (simpleElement) {
                let option = DOM.create.element("option");

                let content = simpleElement.getContent();
                option.value = content;
                option.text = content;
                selectList.appendChild(option);
            });
        }
    }

    _injectEventListener(thisId) {
        DOM.attach.event.byId(thisId, DOM.onEvent.change, e => {
            let currentValue = e.target.value;
            this._enumeratedListVM.notifyObservers({
                value: currentValue
            });
        });
    }
}