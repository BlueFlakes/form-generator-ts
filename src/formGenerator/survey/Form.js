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

    clearWindow() {
        this.sections.forEach(currentSection => {
            currentSection.destroy();
        });
    }

    clearSections() {
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