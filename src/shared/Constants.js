export const DOM = (function () {

    return Object.freeze({
        attach: Object.freeze({
            event: attachEvent,
            child: attachChild
        }),

        OnEvent: Object.freeze({
            click: "click"
        }),

        create: Object.freeze({
            element: createElement
        })
    });

    function createElement(elementIdentity) {
        return document.createElement(elementIdentity);
    }

    function attachEvent(identity, onEvent, task) {
        let node = docSelector(identity);
        node.addEventListener(onEvent, task);
    }
    
    function attachChild(identity, deliveredChild) {
        let node = docSelector(identity);
        node.appendChild(deliveredChild);
    }
    
    function docSelector(identity) {
        return document.querySelector(identity);
    }
}());