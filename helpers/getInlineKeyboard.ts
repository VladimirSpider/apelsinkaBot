import { InlineKeyboard } from "grammy";

import { urlCheck, urlTgCheck } from "../constants/constants";
import { getButtonsPagination } from "./getButtonsPagination";

interface IInlineKeyBoard {
    buttonsArray: string[][];
    column: number;
    back: string;
}

interface IInlineKeyBoardWithPagination {
    buttonsArray: string[][];
    buttonType: string;
    pageSize: number;
    pagesCount: number;
    column: number;
    currentPage?: number;
    back: string;
}

export const getInlineKeyboard = (data: IInlineKeyBoard) => {
    const {buttonsArray, column, back} = data;
    const buttons = buttonsArray.map(([name, innerName]) => {
        if(innerName.match(urlCheck) || innerName.match(urlTgCheck)) {
            return InlineKeyboard.url(name, innerName);
        } else {
            return InlineKeyboard.text(name, innerName);
        }
    });
    
    const inlineKeyboard = InlineKeyboard.from([buttons]);
    const finallyKeyboard = column ? inlineKeyboard.toFlowed(column) : inlineKeyboard;

    const buttonBack = InlineKeyboard.text('⬅️ Назад', back);
    finallyKeyboard.row().add(buttonBack);

    return finallyKeyboard;
};

export const getInlineKeyboardWithPagination = (data: IInlineKeyBoardWithPagination) => {
    const {
        buttonsArray,
        buttonType ,
        pageSize,
        pagesCount,
        column,
        currentPage,
        back
    } = data;

    const newButtonsArray: string[][] = [];
    if(currentPage) {
        newButtonsArray.push(...buttonsArray.slice((currentPage - 1) * pageSize, currentPage * pageSize));
    } else {
        newButtonsArray.push(...buttonsArray.slice(0, pageSize));
    }

    const buttons = newButtonsArray.map(([name, innerName]) =>
        InlineKeyboard.text(name, innerName));
    const inlineKeyboard = InlineKeyboard.from([buttons]);
    const finallyKeyboard = column ? inlineKeyboard.toFlowed(column) : inlineKeyboard;

    finallyKeyboard.row();

    const buttonsPagination: string[][] = getButtonsPagination({pagesCount, buttonType});

    if(currentPage) {
        buttonsPagination[currentPage - 1][0] = `🎈 ${buttonsPagination[currentPage - 1][0]}`;
    } else {
        buttonsPagination[0][0] = `🎈 ${buttonsPagination[0][0]}`;
    }

    if(buttonsPagination.length > 6) {
        if(!currentPage || currentPage < 4) {
            const newButtonsPagination = buttonsPagination.slice(0, 5);
            newButtonsPagination.forEach(([name, innerName], index) => {
                const buttonPagination = InlineKeyboard.text(name, innerName);
                finallyKeyboard.add(buttonPagination);
            });
            const buttonPagination = InlineKeyboard.text('...', '...');
            finallyKeyboard.add(buttonPagination);
            const lastButtonPagination = InlineKeyboard.text(buttonsPagination[buttonsPagination.length - 1][0], buttonsPagination[buttonsPagination.length - 1][1]);
            finallyKeyboard.add(lastButtonPagination);
        } else if(currentPage === buttonsPagination.length || (buttonsPagination.length - currentPage) < 3) {
            const firstButtonPagination = InlineKeyboard.text(buttonsPagination[0][0], buttonsPagination[0][1]);
            finallyKeyboard.add(firstButtonPagination);
            const buttonPagination = InlineKeyboard.text('...', '...');
            finallyKeyboard.add(buttonPagination);
            const newButtonsPagination = buttonsPagination.slice(-5);
            newButtonsPagination.forEach(([name, innerName], index) => {
                const buttonPagination = InlineKeyboard.text(name, innerName);
                finallyKeyboard.add(buttonPagination);
            });
        } else if(currentPage > 3 && (buttonsPagination.length - currentPage) > 2 ) {
            const firstButtonPagination = InlineKeyboard.text(buttonsPagination[0][0], buttonsPagination[0][1]);
            finallyKeyboard.add(firstButtonPagination);
            const buttonPagination = InlineKeyboard.text('...', '...');
            finallyKeyboard.add(buttonPagination);

            const previousButtonPagination = InlineKeyboard.text(buttonsPagination[currentPage -2][0], buttonsPagination[currentPage -2][1]);
            finallyKeyboard.add(previousButtonPagination);

            const currentButtonPagination = InlineKeyboard.text(buttonsPagination[currentPage -1][0], buttonsPagination[currentPage -1][1]);
            finallyKeyboard.add(currentButtonPagination);

            const nextButtonPagination = InlineKeyboard.text(buttonsPagination[currentPage][0], buttonsPagination[currentPage][1]);
            finallyKeyboard.add(nextButtonPagination);

            finallyKeyboard.add(buttonPagination);
            const lastButtonPagination = InlineKeyboard.text(buttonsPagination[buttonsPagination.length - 1][0], buttonsPagination[buttonsPagination.length - 1][1]);
            finallyKeyboard.add(lastButtonPagination);
        }
    } else {
        buttonsPagination.forEach(([name, innerName], index) => {
            const buttonPagination = InlineKeyboard.text(name, innerName);
            finallyKeyboard.add(buttonPagination);
        });
    }

    const buttonBack = InlineKeyboard.text('⬅️ Назад', back);
    finallyKeyboard.row().add(buttonBack);

    return finallyKeyboard;
};
