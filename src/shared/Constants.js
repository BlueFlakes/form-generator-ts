export const DOM = (function () {

    return Object.freeze({
        attach: Object.freeze({
            event: attachEvent,
            child: attachChild
        }),

        OnEvent: Object.freeze({
            click: "click"
        })
    });

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