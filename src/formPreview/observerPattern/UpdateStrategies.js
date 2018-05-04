export const UpdateStrategiesEnum = Object.freeze({
    simpleUpdate: "SimpleUpdateStrategy",
    radioUpdate: "RadioUpdateStrategy",
    checkBoxUpdate: "CheckBoxUpdateStrategy",

});

export class UpdateStrategies {

    static getStrategyCreatorByIdentity(identity) {
        switch (identity) {
            case UpdateStrategiesEnum.simpleUpdate:
                return simpleStrategy();

            case UpdateStrategiesEnum.radioUpdate:
                return simpleStrategy();

            case UpdateStrategiesEnum.checkBoxUpdate:
                return checkBoxStrategy();

            default:
                throw "Invalid update strategy identity";

        }

        function simpleStrategy() {
            return function (valueHolder) {
                return function (context) {
                    valueHolder.setValue(context.value);
                };
            };
        }

        function checkBoxStrategy() {
            return function (valueHolder) {
                let set = new Set();
                valueHolder.setValue(set);

                return function (context) {
                    let isChecked = context.isChecked;
                    let value = `InputId-${context.value}`;

                    if (isChecked) {
                        set.add(value);
                    } else {
                        set.delete(value);
                    }
                };
            };
        }
    }
}