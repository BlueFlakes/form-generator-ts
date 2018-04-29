import {TextInput} from "./TextInput.js";

export class TitleInput extends TextInput {
    generateNode() {
        let node = super.generateNode();
        node.placeholder = 'Title';

        return node;
    }
}