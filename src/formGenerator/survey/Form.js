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

    getSections() {
        return this.sections;
    }

    clearWindow() {
        this.sections.forEach(currentSection => {
            currentSection.destroy();
        });
    }

    deleteWindow() {
        this.clearWindow();
        this.sections.clear();
    }

    render() {
        this.clearWindow();

        this.sections.forEach(currentSection => {
            currentSection.inject();
        });
    }
}