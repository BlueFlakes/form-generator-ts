export class Observer {
    constructor(procedure) {
        this.procedure = procedure;
    }

    notify(context) {
        this.procedure(context);
    }
}