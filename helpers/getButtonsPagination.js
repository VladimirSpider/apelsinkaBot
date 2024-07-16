"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInnerNameButtons = exports.getButtonsPagination = void 0;
;
const getButtonsPagination = (data) => {
    const { pagesCount, buttonType } = data;
    const buttonsPagination = [];
    for (let i = 1; i <= pagesCount; i++) {
        buttonsPagination.push([`${i}`, `${buttonType}_${i}`]);
    }
    return buttonsPagination;
};
exports.getButtonsPagination = getButtonsPagination;
const getInnerNameButtons = (buttons) => buttons.map((button) => button[1]);
exports.getInnerNameButtons = getInnerNameButtons;
