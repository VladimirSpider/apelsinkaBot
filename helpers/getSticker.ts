export const getSticker = (setStickers: string[]): string => {
    const stickerIndex = Math.floor(Math.random() * setStickers.length);

    return setStickers[stickerIndex];
}
