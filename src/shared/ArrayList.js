export class ArrayList {
    constructor() {
        this.container = [];
    }

    add(value) {
        this.container.push(value);
    }

    removeAt(index) {
        if (index < 0 || index >= this.container.length) {
            throw "Index out of universalContainer bounds";
        }

        this.container.splice(index, 1);
    }

    remove(value) {
        let foundIndex = this.container.indexOf(value);

        if (foundIndex !== -1) {
            this.removeAt(foundIndex);
        }
    }

    iterator() {
        let index = 0;

        return {
            next: () => {
                return this.container[index++];
            },

            hasNext: () => {
                return index < this.container.length;
            },

            isLast: () => {
                return index === this.container.length - 1;
            }
        };
    }

    forEach(callback) {
        this.container.forEach(currentElement => {
            callback(currentElement);
        });
    }

    clear() {
        this.container.length = 0;
    }

    size() {
        return this.container.length;
    }
}