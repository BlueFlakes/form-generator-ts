export const HolderStrategyIdentity = Object.freeze({
    radioBoxStrategy: 'radioBox',
    checkBoxStrategy: 'checkBox',
    none: 'None',
    textAreaStrategy: 'textArea'
});

export class InputHolderStrategies {
    static createHolderStrategyByIdentity(identity) {
        switch (identity) {
            case HolderStrategyIdentity.none:
                return () => { return (node) => { return node;}};

            case HolderStrategyIdentity.textAreaStrategy:
                return () => {
                    return (node) => {
                        let textArea = document.createElement('textarea');
                        textArea.id = node.id;
                        return textArea;
                    }
                };

            case HolderStrategyIdentity.radioBoxStrategy:
                return multipleItemsStrategy().bind({}, 'radio');

            case HolderStrategyIdentity.checkBoxStrategy:
                return multipleItemsStrategy().bind({}, 'checkbox')
        }

        function multipleItemsStrategy() {
            return function (type, id) {
                return function (node) {
                    let div = document.createElement('div');
                    let input = document.createElement('input');
                    input.type = type;
                    div.appendChild(input);
                    div.appendChild(node);
                    input.name = id;

                    return div;
                }
            }
        }
    }
}