import {ArrayList} from "../ArrayList.js";
import {Observer} from "./Observer.js";

export class ObserversEden {
    constructor() {
        this.observersContainer = new ArrayList();
    }

    addObserver(observer) {
        if (!(observer.constructor.name === 'Observer' && observer instanceof Observer))
            throw "Given object probably is not instanceof Observer";

        this.observersContainer.add(observer);
    }

    removeObserver(observer) {
        this.observersContainer.remove(observer);
    }

    notifyAll() {
        let iterator = this.observersContainer.iterator();

        while (iterator.hasNext()) {
            let observer = iterator.next();
            observer.notify();
        }
    }
}