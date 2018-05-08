import {DOM} from "../../shared/Constants.js";

export class RangeListView {
    constructor(simpleElementVM) {
        this._simpleElementVM = simpleElementVM;
    }

    inject(outerContainerId, thisId, content) {

        let div = DOM.create.element("div");
        let selectList = DOM.create.element("select");
        selectList.id = thisId;
        selectList.classList.add("form-control");
        div.appendChild(selectList);

        let min = parseInt(content.min);
        let max = parseInt(content.max);
        fillOptionContainer(min, max, selectList);

        DOM.attach.child.byId(outerContainerId, div);
        this._injectEventListener(thisId);

        function fillOptionContainer(min, max, selectList) {
            for (let i = min; i <= max; i++) {
                let option = DOM.create.element("option");
                option.value = i;
                option.text = i;
                selectList.appendChild(option);
            }
        }
    }

    _injectEventListener(thisId) {
        DOM.attach.event.byId(thisId, DOM.onEvent.change, e => {
            let currentValue = e.target.value;
            this._simpleElementVM.notifyObservers({
                value: currentValue
            });
        });
    }
}