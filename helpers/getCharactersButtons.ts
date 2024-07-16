import { ICharactersFlag } from "../constants/keyboardButtons";
import { characterTypeAll } from "../constants/constants";

export const getCharactersButtons = (buttons: (string| ICharactersFlag)[][], flag?: string): string[][] => {
    if(!flag) {
        return buttons.map(([name, innerName]) =>
            [String(name), `${characterTypeAll}_${String(innerName)}`]);
    } else {
        const buttonsWithFlag: string[][] = [];
        buttons.forEach(([name, innerName, label]) => {
            if(typeof label === 'object' && label.flag === flag) {
                buttonsWithFlag.push([String(name), `${flag}_${String(innerName)}`]);
            }
        });

        return buttonsWithFlag;
    }
};
