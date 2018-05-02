export class SectionView {
    constructor(id, mainContainerIdentity) {
        this._sectionContainerIdentity = id;
        this._mainContainerIdentity = mainContainerIdentity;
    }

    getId() {
        return this._sectionContainerIdentity;
    }

    createSection() {
        let sectionContainerDiv = document.createElement("div");
        sectionContainerDiv.id = this._sectionContainerIdentity;
        sectionContainerDiv.className = "section";

        let mainContainerNode = document.getElementById(this._mainContainerIdentity);
        mainContainerNode.appendChild(sectionContainerDiv);
    }

    destroySection() {
        let section = document.getElementById(this._sectionContainerIdentity);
        let sectionParent = section.parentNode;

        sectionParent.removeChild(section);
    }
}