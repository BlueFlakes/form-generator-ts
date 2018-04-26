export class Observer {
    constructor(procedure) {
        this.procedure = procedure;
    }

    notify() {
        this.procedure();
    }
}