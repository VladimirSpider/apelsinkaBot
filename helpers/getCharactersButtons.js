"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCharactersButtons = void 0;
const constants_1 = require("../constants/constants");
const getCharactersButtons = (buttons, flag) => {
    if (!flag) {
        return buttons.map(([name, innerName]) => [String(name), `${constants_1.characterTypeAll}_${String(innerName)}`]);
    }
    else {
        const buttonsWithFlag = [];
        buttons.forEach(([name, innerName, label]) => {
            if (typeof label === 'object' && label.novelty) {
                buttonsWithFlag.push([String(name), `${flag}_${String(innerName)}`]);
            }
            if (typeof label === 'object' && label.flag === flag) {
                buttonsWithFlag.push([String(name), `${flag}_${String(innerName)}`]);
            }
        });
        return buttonsWithFlag;
    }
};
exports.getCharactersButtons = getCharactersButtons;
