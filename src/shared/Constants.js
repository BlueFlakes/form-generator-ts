export const DOM = (function () {

    return Object.freeze({
        attach: Object.freeze({
            event: Object.freeze({
                byId: attachEventById,
                byClassName: attachEventByClassName
            }),

            child: Object.freeze({
                byId: attachChildById
            })
        }),

        onEvent: Object.freeze({
            click: "click",
            keyUp: "keyup"
        }),

        create: Object.freeze({
            element: createElement
        })
    });

    function createElement(identity) {
        return document.createElement(identity);
    }

    function attachEventById(identity, onEvent, executable) {
        let node = docSelectorById(identity);
        node.addEventListener(onEvent, executable);
    }

    function attachEventByClassName(identity, onEvent, executable) {
        let node = docSelectorByClassName(identity);
        node.addEventListener(onEvent, executable);
    }

    function attachChildById(identity, deliveredChild) {
        let node = docSelectorById(identity);
        node.appendChild(deliveredChild);
    }

    function docSelector(identity) {
        return document.querySelector(identity);
    }
    
    function docSelectorById(identity) {
        return document.getElementById(identity);
    }
    
    function docSelectorByClassName(identity) {
        return document.getElementsByClassName(identity);
    }
}());