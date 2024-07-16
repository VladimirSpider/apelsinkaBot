"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSticker = void 0;
const getSticker = (setStickers) => {
    const stickerIndex = Math.floor(Math.random() * setStickers.length);
    return setStickers[stickerIndex];
};
exports.getSticker = getSticker;
