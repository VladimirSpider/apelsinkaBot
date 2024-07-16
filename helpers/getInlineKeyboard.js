"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInlineKeyboardWithPagination = exports.getInlineKeyboard = void 0;
const grammy_1 = require("grammy");
const constants_1 = require("../constants/constants");
const getButtonsPagination_1 = require("./getButtonsPagination");
const getInlineKeyboard = (data) => {
    const { buttonsArray, column, back } = data;
    const buttons = buttonsArray.map(([name, innerName]) => {
        if (innerName.match(constants_1.urlCheck) || innerName.match(constants_1.urlTgCheck)) {
            return grammy_1.InlineKeyboard.url(name, innerName);
        }
        else {
            return grammy_1.InlineKeyboard.text(name, innerName);
        }
    });
    const inlineKeyboard = grammy_1.InlineKeyboard.from([buttons]);
    const finallyKeyboard = column ? inlineKeyboard.toFlowed(column) : inlineKeyboard;
    const buttonBack = grammy_1.InlineKeyboard.text('⬅️ Назад', back);
    finallyKeyboard.row().add(buttonBack);
    return finallyKeyboard;
};
exports.getInlineKeyboard = getInlineKeyboard;
const getInlineKeyboardWithPagination = (data) => {
    const { buttonsArray, buttonType, pageSize, pagesCount, column, currentPage, back } = data;
    const newButtonsArray = [];
    if (currentPage) {
        newButtonsArray.push(...buttonsArray.slice((currentPage - 1) * pageSize, currentPage * pageSize));
    }
    else {
        newButtonsArray.push(...buttonsArray.slice(0, pageSize));
    }
    const buttons = newButtonsArray.map(([name, innerName]) => grammy_1.InlineKeyboard.text(name, innerName));
    const inlineKeyboard = grammy_1.InlineKeyboard.from([buttons]);
    const finallyKeyboard = column ? inlineKeyboard.toFlowed(column) : inlineKeyboard;
    finallyKeyboard.row();
    const buttonsPagination = (0, getButtonsPagination_1.getButtonsPagination)({ pagesCount, buttonType });
    if (currentPage) {
        buttonsPagination[currentPage - 1][0] = `🎈 ${buttonsPagination[currentPage - 1][0]}`;
    }
    else {
        buttonsPagination[0][0] = `🎈 ${buttonsPagination[0][0]}`;
    }
    if (buttonsPagination.length > 6) {
        if (!currentPage || currentPage < 4) {
            const newButtonsPagination = buttonsPagination.slice(0, 5);
            newButtonsPagination.forEach(([name, innerName], index) => {
                const buttonPagination = grammy_1.InlineKeyboard.text(name, innerName);
                finallyKeyboard.add(buttonPagination);
            });
            const buttonPagination = grammy_1.InlineKeyboard.text('...', '...');
            finallyKeyboard.add(buttonPagination);
            const lastButtonPagination = grammy_1.InlineKeyboard.text(buttonsPagination[buttonsPagination.length - 1][0], buttonsPagination[buttonsPagination.length - 1][1]);
            finallyKeyboard.add(lastButtonPagination);
        }
        else if (currentPage === buttonsPagination.length || (buttonsPagination.length - currentPage) < 3) {
            const firstButtonPagination = grammy_1.InlineKeyboard.text(buttonsPagination[0][0], buttonsPagination[0][1]);
            finallyKeyboard.add(firstButtonPagination);
            const buttonPagination = grammy_1.InlineKeyboard.text('...', '...');
            finallyKeyboard.add(buttonPagination);
            const newButtonsPagination = buttonsPagination.slice(-5);
            newButtonsPagination.forEach(([name, innerName], index) => {
                const buttonPagination = grammy_1.InlineKeyboard.text(name, innerName);
                finallyKeyboard.add(buttonPagination);
            });
        }
        else if (currentPage > 3 && (buttonsPagination.length - currentPage) > 2) {
            const firstButtonPagination = grammy_1.InlineKeyboard.text(buttonsPagination[0][0], buttonsPagination[0][1]);
            finallyKeyboard.add(firstButtonPagination);
            const buttonPagination = grammy_1.InlineKeyboard.text('...', '...');
            finallyKeyboard.add(buttonPagination);
            const previousButtonPagination = grammy_1.InlineKeyboard.text(buttonsPagination[currentPage - 2][0], buttonsPagination[currentPage - 2][1]);
            finallyKeyboard.add(previousButtonPagination);
            const currentButtonPagination = grammy_1.InlineKeyboard.text(buttonsPagination[currentPage - 1][0], buttonsPagination[currentPage - 1][1]);
            finallyKeyboard.add(currentButtonPagination);
            const nextButtonPagination = grammy_1.InlineKeyboard.text(buttonsPagination[currentPage][0], buttonsPagination[currentPage][1]);
            finallyKeyboard.add(nextButtonPagination);
            finallyKeyboard.add(buttonPagination);
            const lastButtonPagination = grammy_1.InlineKeyboard.text(buttonsPagination[buttonsPagination.length - 1][0], buttonsPagination[buttonsPagination.length - 1][1]);
            finallyKeyboard.add(lastButtonPagination);
        }
    }
    else {
        buttonsPagination.forEach(([name, innerName], index) => {
            const buttonPagination = grammy_1.InlineKeyboard.text(name, innerName);
            finallyKeyboard.add(buttonPagination);
        });
    }
    const buttonBack = grammy_1.InlineKeyboard.text('⬅️ Назад', back);
    finallyKeyboard.row().add(buttonBack);
    return finallyKeyboard;
};
exports.getInlineKeyboardWithPagination = getInlineKeyboardWithPagination;
