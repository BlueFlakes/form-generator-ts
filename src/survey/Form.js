export class Form {
    constructor() {
        this.sections = new Map();
    }

    put(id, section) {
        this.sections.set(id, section);
    }

    removeById(sectionId) {
        let question = this.sections.get(sectionId);

        if (question !== undefined) {
            question.destroy();
            this.sections.delete(sectionId);
        }
    }

    clear() {
        this.sections.forEach((currentSection) => {
            currentSection.destroy();
        });
    }

    render() {
        this.sections.forEach((currentSection) => {
            currentSection.inject();
        });
    }
}