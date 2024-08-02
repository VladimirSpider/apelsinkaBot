"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
require("dotenv/config");
const emoji_1 = require("@grammyjs/emoji");
const hydrate_1 = require("@grammyjs/hydrate");
const getCharactersButtons_1 = require("./helpers/getCharactersButtons");
const getPagesCount_1 = require("./helpers/getPagesCount");
const constants_1 = require("./constants/constants");
const getInlineKeyboard_1 = require("./helpers/getInlineKeyboard");
const keyboardButtons_1 = require("./constants/keyboardButtons");
const pagesText_1 = require("./constants/pagesText");
const getButtonsPagination_1 = require("./helpers/getButtonsPagination");
const getSticker_1 = require("./helpers/getSticker");
const showsData_1 = require("./constants/showsData");
const getCurrentGoodsData_1 = require("./helpers/getCurrentGoodsData");
const users = {};
const stickers = [
    constants_1.stickerBear,
    constants_1.stickerCat,
    constants_1.stickerMole,
    constants_1.stickerHippo,
    constants_1.stickerCatInGlasses
];
const { BOT_TOKEN } = process.env;
const bot = new grammy_1.Bot(BOT_TOKEN !== null && BOT_TOKEN !== void 0 ? BOT_TOKEN : '');
const createInitialSessionData = () => {
    return {
        using: false,
        currentItemNumber: 1,
        itemsQuantity: 0,
        currentType: '',
        currentItem: '',
        back: '',
    };
};
bot.api.setMyCommands([
    {
        command: 'start',
        description: 'Запуск бота',
    }
]);
bot.use((0, grammy_1.session)({ initial: createInitialSessionData }));
bot.use((0, emoji_1.emojiParser)());
bot.use((0, hydrate_1.hydrate)());
function responseTime(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // take time before
        const before = Date.now(); // milliseconds
        // invoke downstream middleware
        yield next(); // make sure to `await`!
        // take time after
        const after = Date.now(); // milliseconds
        // log difference
        console.log(`Response time: ${after - before} ms`);
    });
}
bot.use(responseTime);
const mainInlineKeyBoard = new grammy_1.InlineKeyboard()
    .text('📓 Программы', constants_1.programsPoint)
    .text('🧸 Персонажи', constants_1.charactersPoint)
    .row()
    .text('🎁 Шоу', constants_1.showsPoint)
    .text('🏷️ Дополнения', constants_1.additionsPoint)
    .row()
    .text('🪁 Мастер-классы', constants_1.masterClassesPoint)
    .url('📷 Instagram', 'https://www.instagram.com/apelsinka_minsk/')
    .row()
    .url('📞Связаться(viber)', `https://viber.click/${constants_1.managerNumber}`)
    .row()
    .url('📞Связаться(telegram)', `tg://user?id=${constants_1.managerId}`)
    .row();
const inlineKeyboardCharactersMenu = (0, getInlineKeyboard_1.getInlineKeyboard)({
    buttonsArray: keyboardButtons_1.charactersMenu,
    column: 2,
    back: constants_1.mainPagePoint,
});
const allCharactersButtons = (0, getCharactersButtons_1.getCharactersButtons)(keyboardButtons_1.characters);
const maleCharactersButtons = (0, getCharactersButtons_1.getCharactersButtons)(keyboardButtons_1.characters, constants_1.characterTypeMale);
const femaleCharactersButtons = (0, getCharactersButtons_1.getCharactersButtons)(keyboardButtons_1.characters, constants_1.characterTypeFemale);
const universalCharactersButtons = (0, getCharactersButtons_1.getCharactersButtons)(keyboardButtons_1.characters, constants_1.characterTypeUniversal);
const bigDollCharactersButtons = (0, getCharactersButtons_1.getCharactersButtons)(keyboardButtons_1.characters, constants_1.characterTypeBigDoll);
const allCharactersPagesCount = (0, getPagesCount_1.getPagesCount)(allCharactersButtons.length, constants_1.pageSize);
const maleCharactersPagesCount = (0, getPagesCount_1.getPagesCount)(maleCharactersButtons.length, constants_1.pageSize);
const femaleCharactersPagesCount = (0, getPagesCount_1.getPagesCount)(femaleCharactersButtons.length, constants_1.pageSize);
const universalCharactersPagesCount = (0, getPagesCount_1.getPagesCount)(universalCharactersButtons.length, constants_1.pageSize);
const bigDollCharactersPagesCount = (0, getPagesCount_1.getPagesCount)(bigDollCharactersButtons.length, constants_1.pageSize);
const inlineKeyboardAllCharacters = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
    buttonsArray: allCharactersButtons,
    buttonType: constants_1.characterTypeAll,
    pageSize: constants_1.pageSize,
    pagesCount: allCharactersPagesCount,
    column: 2,
    back: constants_1.charactersPoint,
});
const inlineKeyboardMaleCharacters = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
    buttonsArray: maleCharactersButtons,
    buttonType: constants_1.characterTypeMale,
    pageSize: constants_1.pageSize,
    pagesCount: maleCharactersPagesCount,
    column: 2,
    back: constants_1.charactersPoint,
});
const inlineKeyboardFemaleCharacters = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
    buttonsArray: femaleCharactersButtons,
    buttonType: constants_1.characterTypeFemale,
    pageSize: constants_1.pageSize,
    pagesCount: femaleCharactersPagesCount,
    column: 2,
    back: constants_1.charactersPoint,
});
const inlineKeyboardUniversalCharacters = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
    buttonsArray: universalCharactersButtons,
    buttonType: constants_1.characterTypeUniversal,
    pageSize: constants_1.pageSize,
    pagesCount: universalCharactersPagesCount,
    column: 2,
    back: constants_1.charactersPoint,
});
const inlineKeyboardBigDollCharacters = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
    buttonsArray: bigDollCharactersButtons,
    buttonType: constants_1.characterTypeBigDoll,
    pageSize: constants_1.pageSize,
    pagesCount: bigDollCharactersPagesCount,
    column: 2,
    back: constants_1.charactersPoint,
});
const allCharactersButtonsPagination = (0, getButtonsPagination_1.getInnerNameButtons)((0, getButtonsPagination_1.getButtonsPagination)({
    pagesCount: allCharactersPagesCount,
    buttonType: constants_1.characterTypeAll
}));
const maleCharactersButtonsPagination = (0, getButtonsPagination_1.getInnerNameButtons)((0, getButtonsPagination_1.getButtonsPagination)({
    pagesCount: maleCharactersPagesCount,
    buttonType: constants_1.characterTypeMale
}));
const femaleCharactersButtonsPagination = (0, getButtonsPagination_1.getInnerNameButtons)((0, getButtonsPagination_1.getButtonsPagination)({
    pagesCount: femaleCharactersPagesCount,
    buttonType: constants_1.characterTypeFemale
}));
const universalCharactersButtonsPagination = (0, getButtonsPagination_1.getInnerNameButtons)((0, getButtonsPagination_1.getButtonsPagination)({
    pagesCount: universalCharactersPagesCount,
    buttonType: constants_1.characterTypeUniversal
}));
const bigDollCharactersButtonsPagination = (0, getButtonsPagination_1.getInnerNameButtons)((0, getButtonsPagination_1.getButtonsPagination)({
    pagesCount: bigDollCharactersPagesCount,
    buttonType: constants_1.characterTypeBigDoll
}));
const allCharactersButtonsInnerName = (0, getButtonsPagination_1.getInnerNameButtons)(allCharactersButtons);
const maleCharactersButtonsInnerName = (0, getButtonsPagination_1.getInnerNameButtons)(maleCharactersButtons);
const femaleCharactersButtonsInnerName = (0, getButtonsPagination_1.getInnerNameButtons)(femaleCharactersButtons);
const universalCharactersButtonsInnerName = (0, getButtonsPagination_1.getInnerNameButtons)(universalCharactersButtons);
const bigDollCharactersButtonsInnerName = (0, getButtonsPagination_1.getInnerNameButtons)(bigDollCharactersButtons);
const inlineKeyboardShowMenu = (0, getInlineKeyboard_1.getInlineKeyboard)({
    buttonsArray: keyboardButtons_1.showsMenu,
    column: 2,
    back: constants_1.mainPagePoint,
});
const showsButtonsInnerName = (0, getButtonsPagination_1.getInnerNameButtons)(keyboardButtons_1.showsMenu);
const programsPagesCount = (0, getPagesCount_1.getPagesCount)(keyboardButtons_1.programsMenu.length, constants_1.pageSize);
const additionsPagesCount = (0, getPagesCount_1.getPagesCount)(keyboardButtons_1.additionsMenu.length, constants_1.pageSize);
const masterClassesPagesCount = (0, getPagesCount_1.getPagesCount)(keyboardButtons_1.masterClassesMenu.length, constants_1.pageSize);
const inlineKeyboardPrograms = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
    buttonsArray: keyboardButtons_1.programsMenu,
    buttonType: constants_1.programsPoint,
    pageSize: constants_1.pageSize,
    pagesCount: programsPagesCount,
    column: 1,
    back: constants_1.mainPagePoint,
});
const inlineKeyboardAdditions = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
    buttonsArray: keyboardButtons_1.additionsMenu,
    buttonType: constants_1.additionsPoint,
    pageSize: constants_1.pageSize,
    pagesCount: additionsPagesCount,
    column: 2,
    back: constants_1.mainPagePoint,
});
const inlineKeyboardMasterClasses = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
    buttonsArray: keyboardButtons_1.masterClassesMenu,
    buttonType: constants_1.masterClassesPoint,
    pageSize: constants_1.pageSize,
    pagesCount: masterClassesPagesCount,
    column: 1,
    back: constants_1.mainPagePoint,
});
const programsButtonsPagination = (0, getButtonsPagination_1.getInnerNameButtons)((0, getButtonsPagination_1.getButtonsPagination)({
    pagesCount: programsPagesCount,
    buttonType: constants_1.programsPoint
}));
const additionsButtonsPagination = (0, getButtonsPagination_1.getInnerNameButtons)((0, getButtonsPagination_1.getButtonsPagination)({
    pagesCount: additionsPagesCount,
    buttonType: constants_1.additionsPoint
}));
const masterClassesButtonsPagination = (0, getButtonsPagination_1.getInnerNameButtons)((0, getButtonsPagination_1.getButtonsPagination)({
    pagesCount: masterClassesPagesCount,
    buttonType: constants_1.masterClassesPoint
}));
const programsButtonsInnerName = (0, getButtonsPagination_1.getInnerNameButtons)(keyboardButtons_1.programsMenu);
const additionsButtonsInnerName = (0, getButtonsPagination_1.getInnerNameButtons)(keyboardButtons_1.additionsMenu);
const masterClassesButtonsInnerName = (0, getButtonsPagination_1.getInnerNameButtons)(keyboardButtons_1.masterClassesMenu);
const addUser = (id, nick, name) => {
    const userId = String(id);
    const userNick = nick || 'ник отсутствует';
    const userName = name || 'имя отсутствует';
    if (!(userId in users)) {
        users[userId] = {
            id: userId,
            userNick,
            userName
        };
    }
};
bot.command("start", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (ctx.from) {
        addUser(ctx.from.id, ctx.from.username, ctx.from.first_name);
    }
    const hibiscus = ctx.emoji `${"hibiscus"}`;
    const userName = ctx.from ? ctx.from.first_name : 'дорогой пользователь';
    const sticker = (0, getSticker_1.getSticker)(stickers);
    yield ctx.replyWithSticker(sticker);
    yield ctx.reply(`Привет <b>${userName}${hibiscus}</b>\n\n ${pagesText_1.mainPage}`, {
        parse_mode: 'HTML',
        reply_markup: mainInlineKeyBoard,
    });
}));
bot.callbackQuery(allCharactersButtonsPagination, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (ctx.session.using) {
        ctx.session.using = false;
        ctx.session.currentItemNumber = 1;
        ctx.session.itemsQuantity = 0;
        ctx.session.currentType = '';
        ctx.session.currentItem = '';
        ctx.session.back = '';
    }
    const currentPage = ctx.callbackQuery.data.match(constants_1.findCurrentPage);
    if (!((_a = ctx.callbackQuery.message) === null || _a === void 0 ? void 0 : _a.text) && currentPage) {
        const inlineKeyboard = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
            buttonsArray: allCharactersButtons,
            buttonType: constants_1.characterTypeAll,
            pageSize: constants_1.pageSize,
            pagesCount: allCharactersPagesCount,
            column: 2,
            back: constants_1.charactersPoint,
            currentPage: Number(currentPage[0]),
        });
        yield ctx.reply(`<b>Страница ${currentPage[0]} из ${allCharactersPagesCount}</b>\n${pagesText_1.allCharactersPage}`, {
            parse_mode: 'HTML',
            reply_markup: inlineKeyboard,
        });
        yield ctx.deleteMessage();
    }
    if ((_b = ctx.callbackQuery.message) === null || _b === void 0 ? void 0 : _b.text) {
        const pageText = ctx.callbackQuery.message.text;
        const numberPageOnPage = pageText.match(constants_1.findNumberPageOnPage);
        if (numberPageOnPage && currentPage) {
            if (currentPage[0] !== numberPageOnPage[0]) {
                const inlineKeyboard = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
                    buttonsArray: allCharactersButtons,
                    buttonType: constants_1.characterTypeAll,
                    pageSize: constants_1.pageSize,
                    pagesCount: allCharactersPagesCount,
                    column: 2,
                    back: constants_1.charactersPoint,
                    currentPage: Number(currentPage[0]),
                });
                yield ctx.callbackQuery.message.editText(`<b>Страница ${currentPage[0]} из ${allCharactersPagesCount}</b>\n${pagesText_1.allCharactersPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboard,
                });
            }
        }
    }
    yield ctx.answerCallbackQuery();
}));
bot.callbackQuery(maleCharactersButtonsPagination, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    if (ctx.session.using) {
        ctx.session.using = false;
        ctx.session.currentItemNumber = 1;
        ctx.session.itemsQuantity = 0;
        ctx.session.currentType = '';
        ctx.session.currentItem = '';
        ctx.session.back = '';
    }
    const currentPage = ctx.callbackQuery.data.match(constants_1.findCurrentPage);
    if (!((_c = ctx.callbackQuery.message) === null || _c === void 0 ? void 0 : _c.text) && currentPage) {
        const inlineKeyboard = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
            buttonsArray: maleCharactersButtons,
            buttonType: constants_1.characterTypeMale,
            pageSize: constants_1.pageSize,
            pagesCount: maleCharactersPagesCount,
            column: 2,
            back: constants_1.charactersPoint,
            currentPage: Number(currentPage[0]),
        });
        yield ctx.reply(`<b>Страница ${currentPage[0]} из ${maleCharactersPagesCount}</b>\n${pagesText_1.maleCharactersPage}`, {
            parse_mode: 'HTML',
            reply_markup: inlineKeyboard,
        });
        yield ctx.deleteMessage();
    }
    if ((_d = ctx.callbackQuery.message) === null || _d === void 0 ? void 0 : _d.text) {
        const pageText = ctx.callbackQuery.message.text;
        const numberPageOnPage = pageText.match(constants_1.findNumberPageOnPage);
        if (numberPageOnPage && currentPage) {
            if (currentPage[0] !== numberPageOnPage[0]) {
                const inlineKeyboard = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
                    buttonsArray: maleCharactersButtons,
                    buttonType: constants_1.characterTypeMale,
                    pageSize: constants_1.pageSize,
                    pagesCount: maleCharactersPagesCount,
                    column: 2,
                    back: constants_1.charactersPoint,
                    currentPage: Number(currentPage[0]),
                });
                yield ctx.callbackQuery.message.editText(`<b>Страница ${currentPage[0]} из ${maleCharactersPagesCount}</b>\n${pagesText_1.maleCharactersPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboard,
                });
            }
        }
    }
    yield ctx.answerCallbackQuery();
}));
bot.callbackQuery(femaleCharactersButtonsPagination, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    if (ctx.session.using) {
        ctx.session.using = false;
        ctx.session.currentItemNumber = 1;
        ctx.session.itemsQuantity = 0;
        ctx.session.currentType = '';
        ctx.session.currentItem = '';
        ctx.session.back = '';
    }
    const currentPage = ctx.callbackQuery.data.match(constants_1.findCurrentPage);
    if (!((_e = ctx.callbackQuery.message) === null || _e === void 0 ? void 0 : _e.text) && currentPage) {
        const inlineKeyboard = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
            buttonsArray: femaleCharactersButtons,
            buttonType: constants_1.characterTypeFemale,
            pageSize: constants_1.pageSize,
            pagesCount: femaleCharactersPagesCount,
            column: 2,
            back: constants_1.charactersPoint,
            currentPage: Number(currentPage[0]),
        });
        yield ctx.reply(`<b>Страница ${currentPage[0]} из ${femaleCharactersPagesCount}</b>\n${pagesText_1.femaleCharactersPage}`, {
            parse_mode: 'HTML',
            reply_markup: inlineKeyboard,
        });
        yield ctx.deleteMessage();
    }
    if ((_f = ctx.callbackQuery.message) === null || _f === void 0 ? void 0 : _f.text) {
        const pageText = ctx.callbackQuery.message.text;
        const numberPageOnPage = pageText.match(constants_1.findNumberPageOnPage);
        if (numberPageOnPage && currentPage) {
            if (currentPage[0] !== numberPageOnPage[0]) {
                const inlineKeyboard = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
                    buttonsArray: femaleCharactersButtons,
                    buttonType: constants_1.characterTypeFemale,
                    pageSize: constants_1.pageSize,
                    pagesCount: femaleCharactersPagesCount,
                    column: 2,
                    back: constants_1.charactersPoint,
                    currentPage: Number(currentPage[0]),
                });
                yield ctx.callbackQuery.message.editText(`<b>Страница ${currentPage[0]} из ${femaleCharactersPagesCount}</b>\n${pagesText_1.femaleCharactersPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboard,
                });
            }
        }
    }
    yield ctx.answerCallbackQuery();
}));
bot.callbackQuery(universalCharactersButtonsPagination, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    if (ctx.session.using) {
        ctx.session.using = false;
        ctx.session.currentItemNumber = 1;
        ctx.session.itemsQuantity = 0;
        ctx.session.currentType = '';
        ctx.session.currentItem = '';
        ctx.session.back = '';
    }
    const currentPage = ctx.callbackQuery.data.match(constants_1.findCurrentPage);
    if (!((_g = ctx.callbackQuery.message) === null || _g === void 0 ? void 0 : _g.text) && currentPage) {
        const inlineKeyboard = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
            buttonsArray: universalCharactersButtons,
            buttonType: constants_1.characterTypeUniversal,
            pageSize: constants_1.pageSize,
            pagesCount: universalCharactersPagesCount,
            column: 2,
            back: constants_1.charactersPoint,
            currentPage: Number(currentPage[0]),
        });
        yield ctx.reply(`<b>Страница ${currentPage[0]} из ${universalCharactersPagesCount}</b>\n${pagesText_1.universalCharactersPage}`, {
            parse_mode: 'HTML',
            reply_markup: inlineKeyboard,
        });
        yield ctx.deleteMessage();
    }
    if ((_h = ctx.callbackQuery.message) === null || _h === void 0 ? void 0 : _h.text) {
        const pageText = ctx.callbackQuery.message.text;
        const numberPageOnPage = pageText.match(constants_1.findNumberPageOnPage);
        if (numberPageOnPage && currentPage) {
            if (currentPage[0] !== numberPageOnPage[0]) {
                const inlineKeyboard = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
                    buttonsArray: universalCharactersButtons,
                    buttonType: constants_1.characterTypeUniversal,
                    pageSize: constants_1.pageSize,
                    pagesCount: universalCharactersPagesCount,
                    column: 2,
                    back: constants_1.charactersPoint,
                    currentPage: Number(currentPage[0]),
                });
                yield ctx.callbackQuery.message.editText(`<b>Страница ${currentPage[0]} из ${universalCharactersPagesCount}</b>\n${pagesText_1.universalCharactersPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboard,
                });
            }
        }
    }
    yield ctx.answerCallbackQuery();
}));
bot.callbackQuery(bigDollCharactersButtonsPagination, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k;
    if (ctx.session.using) {
        ctx.session.using = false;
        ctx.session.currentItemNumber = 1;
        ctx.session.itemsQuantity = 0;
        ctx.session.currentType = '';
        ctx.session.currentItem = '';
        ctx.session.back = '';
    }
    const currentPage = ctx.callbackQuery.data.match(constants_1.findCurrentPage);
    if (!((_j = ctx.callbackQuery.message) === null || _j === void 0 ? void 0 : _j.text) && currentPage) {
        const inlineKeyboard = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
            buttonsArray: bigDollCharactersButtons,
            buttonType: constants_1.characterTypeBigDoll,
            pageSize: constants_1.pageSize,
            pagesCount: bigDollCharactersPagesCount,
            column: 2,
            back: constants_1.charactersPoint,
            currentPage: Number(currentPage[0]),
        });
        yield ctx.reply(`<b>Страница ${currentPage[0]} из ${bigDollCharactersPagesCount}</b>\n${pagesText_1.bigDollCharactersPage}`, {
            parse_mode: 'HTML',
            reply_markup: inlineKeyboard,
        });
        yield ctx.deleteMessage();
    }
    if ((_k = ctx.callbackQuery.message) === null || _k === void 0 ? void 0 : _k.text) {
        const pageText = ctx.callbackQuery.message.text;
        const numberPageOnPage = pageText.match(constants_1.findNumberPageOnPage);
        if (numberPageOnPage && currentPage) {
            if (currentPage[0] !== numberPageOnPage[0]) {
                const inlineKeyboard = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
                    buttonsArray: bigDollCharactersButtons,
                    buttonType: constants_1.characterTypeBigDoll,
                    pageSize: constants_1.pageSize,
                    pagesCount: bigDollCharactersPagesCount,
                    column: 2,
                    back: constants_1.charactersPoint,
                    currentPage: Number(currentPage[0]),
                });
                yield ctx.callbackQuery.message.editText(`<b>Страница ${currentPage[0]} из ${bigDollCharactersPagesCount}</b>\n${pagesText_1.bigDollCharactersPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboard,
                });
            }
        }
    }
    yield ctx.answerCallbackQuery();
}));
bot.callbackQuery(programsButtonsPagination, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _l, _m;
    if (ctx.session.using) {
        ctx.session.using = false;
        ctx.session.currentItemNumber = 1;
        ctx.session.itemsQuantity = 0;
        ctx.session.currentType = '';
        ctx.session.currentItem = '';
        ctx.session.back = '';
    }
    const currentPage = ctx.callbackQuery.data.match(constants_1.findCurrentPage);
    if (!((_l = ctx.callbackQuery.message) === null || _l === void 0 ? void 0 : _l.text) && currentPage) {
        const inlineKeyboard = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
            buttonsArray: keyboardButtons_1.programsMenu,
            buttonType: constants_1.programsPoint,
            pageSize: constants_1.pageSize,
            pagesCount: programsPagesCount,
            column: 1,
            back: constants_1.mainPagePoint,
            currentPage: Number(currentPage[0]),
        });
        yield ctx.reply(`<b>Страница ${currentPage[0]} из ${programsPagesCount}</b>\n${pagesText_1.programsPage}`, {
            parse_mode: 'HTML',
            reply_markup: inlineKeyboard,
        });
        yield ctx.deleteMessage();
    }
    if ((_m = ctx.callbackQuery.message) === null || _m === void 0 ? void 0 : _m.text) {
        const pageText = ctx.callbackQuery.message.text;
        const numberPageOnPage = pageText.match(constants_1.findNumberPageOnPage);
        if (numberPageOnPage && currentPage) {
            if (currentPage[0] !== numberPageOnPage[0]) {
                const inlineKeyboard = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
                    buttonsArray: keyboardButtons_1.programsMenu,
                    buttonType: constants_1.programsPoint,
                    pageSize: constants_1.pageSize,
                    pagesCount: programsPagesCount,
                    column: 1,
                    back: constants_1.mainPagePoint,
                    currentPage: Number(currentPage[0]),
                });
                yield ctx.callbackQuery.message.editText(`<b>Страница ${currentPage[0]} из ${programsPagesCount}</b>\n${pagesText_1.programsPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboard,
                });
            }
        }
    }
    yield ctx.answerCallbackQuery();
}));
bot.callbackQuery(additionsButtonsPagination, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, _p;
    if (ctx.session.using) {
        ctx.session.using = false;
        ctx.session.currentItemNumber = 1;
        ctx.session.itemsQuantity = 0;
        ctx.session.currentType = '';
        ctx.session.currentItem = '';
        ctx.session.back = '';
    }
    const currentPage = ctx.callbackQuery.data.match(constants_1.findCurrentPage);
    if (!((_o = ctx.callbackQuery.message) === null || _o === void 0 ? void 0 : _o.text) && currentPage) {
        const inlineKeyboard = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
            buttonsArray: keyboardButtons_1.additionsMenu,
            buttonType: constants_1.additionsPoint,
            pageSize: constants_1.pageSize,
            pagesCount: additionsPagesCount,
            column: 2,
            back: constants_1.mainPagePoint,
            currentPage: Number(currentPage[0]),
        });
        yield ctx.reply(`<b>Страница ${currentPage[0]} из ${additionsPagesCount}</b>\n${pagesText_1.additionsPage}`, {
            parse_mode: 'HTML',
            reply_markup: inlineKeyboard,
        });
        yield ctx.deleteMessage();
    }
    if ((_p = ctx.callbackQuery.message) === null || _p === void 0 ? void 0 : _p.text) {
        const pageText = ctx.callbackQuery.message.text;
        const numberPageOnPage = pageText.match(constants_1.findNumberPageOnPage);
        if (numberPageOnPage && currentPage) {
            if (currentPage[0] !== numberPageOnPage[0]) {
                const inlineKeyboard = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
                    buttonsArray: keyboardButtons_1.additionsMenu,
                    buttonType: constants_1.additionsPoint,
                    pageSize: constants_1.pageSize,
                    pagesCount: additionsPagesCount,
                    column: 2,
                    back: constants_1.mainPagePoint,
                    currentPage: Number(currentPage[0]),
                });
                yield ctx.callbackQuery.message.editText(`<b>Страница ${currentPage[0]} из ${additionsPagesCount}</b>\n${pagesText_1.additionsPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboard,
                });
            }
        }
    }
    yield ctx.answerCallbackQuery();
}));
bot.callbackQuery(masterClassesButtonsPagination, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _q, _r;
    if (ctx.session.using) {
        ctx.session.using = false;
        ctx.session.currentItemNumber = 1;
        ctx.session.itemsQuantity = 0;
        ctx.session.currentType = '';
        ctx.session.currentItem = '';
        ctx.session.back = '';
    }
    const currentPage = ctx.callbackQuery.data.match(constants_1.findCurrentPage);
    if (!((_q = ctx.callbackQuery.message) === null || _q === void 0 ? void 0 : _q.text) && currentPage) {
        const inlineKeyboard = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
            buttonsArray: keyboardButtons_1.masterClassesMenu,
            buttonType: constants_1.masterClassesPoint,
            pageSize: constants_1.pageSize,
            pagesCount: masterClassesPagesCount,
            column: 1,
            back: constants_1.mainPagePoint,
            currentPage: Number(currentPage[0]),
        });
        yield ctx.reply(`<b>Страница ${currentPage[0]} из ${masterClassesPagesCount}</b>\n${pagesText_1.masterClassesPage}`, {
            parse_mode: 'HTML',
            reply_markup: inlineKeyboard,
        });
        yield ctx.deleteMessage();
    }
    if ((_r = ctx.callbackQuery.message) === null || _r === void 0 ? void 0 : _r.text) {
        const pageText = ctx.callbackQuery.message.text;
        const numberPageOnPage = pageText.match(constants_1.findNumberPageOnPage);
        if (numberPageOnPage && currentPage) {
            if (currentPage[0] !== numberPageOnPage[0]) {
                const inlineKeyboard = (0, getInlineKeyboard_1.getInlineKeyboardWithPagination)({
                    buttonsArray: keyboardButtons_1.masterClassesMenu,
                    buttonType: constants_1.masterClassesPoint,
                    pageSize: constants_1.pageSize,
                    pagesCount: masterClassesPagesCount,
                    column: 1,
                    back: constants_1.mainPagePoint,
                    currentPage: Number(currentPage[0]),
                });
                yield ctx.callbackQuery.message.editText(`<b>Страница ${currentPage[0]} из ${masterClassesPagesCount}</b>\n${pagesText_1.masterClassesPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboard,
                });
            }
        }
    }
    yield ctx.answerCallbackQuery();
}));
bot.callbackQuery([
    ...allCharactersButtonsInnerName,
    ...maleCharactersButtonsInnerName,
    ...femaleCharactersButtonsInnerName,
    ...universalCharactersButtonsInnerName,
    ...bigDollCharactersButtonsInnerName,
    ...programsButtonsInnerName,
    ...additionsButtonsInnerName,
    ...masterClassesButtonsInnerName,
], (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _s;
    const currentGoodType = ctx.callbackQuery.data.match(constants_1.findCurrentType);
    const currentGood = ctx.callbackQuery.data.match(constants_1.findCurrentCharacter);
    if ((_s = ctx.callbackQuery.message) === null || _s === void 0 ? void 0 : _s.text) {
        const pageText = ctx.callbackQuery.message.text;
        const numberPageOnPage = pageText.match(constants_1.findNumberPageOnPage);
        if (numberPageOnPage && currentGoodType && currentGood) {
            const inlineKeyboardGoodMenu = (0, getInlineKeyboard_1.getInlineKeyboard)({
                buttonsArray: keyboardButtons_1.itemMenu,
                column: 2,
                back: `${currentGoodType[0]}_${numberPageOnPage[0]}`,
            });
            const currentGoods = (0, getCurrentGoodsData_1.getCurrentGoodsData)(currentGoodType[0]);
            const currentGoodsPath = (0, getCurrentGoodsData_1.getCurrentGoodsPath)(currentGoodType[0]);
            const photosNumber = currentGoods[currentGood[0]].images.length;
            ctx.session.using = true;
            ctx.session.currentType = currentGoodsPath;
            ctx.session.currentItem = currentGood[0];
            ctx.session.itemsQuantity = photosNumber;
            ctx.session.back = `${currentGoodType[0]}_${numberPageOnPage[0]}`;
            const scroll = ctx.emoji `${"scroll"}`;
            const partyPopper = ctx.emoji `${"party_popper"}`;
            yield ctx.replyWithPhoto(new grammy_1.InputFile(`./images/${currentGoodsPath}/${currentGood[0]}1.jpg`), {
                caption: `<b>Фото 1 из ${photosNumber}</b>
                        \n${partyPopper}<b>${currentGoods[currentGood[0]].name}</b>
                        \n${scroll}<b>Описание:</b>\n${currentGoods[currentGood[0]].description}`,
                parse_mode: 'HTML',
                reply_markup: inlineKeyboardGoodMenu,
            });
        }
    }
    yield ctx.answerCallbackQuery();
    yield ctx.deleteMessage();
}));
bot.callbackQuery([...showsButtonsInnerName], (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const currentShow = ctx.callbackQuery.data;
    const photosNumber = showsData_1.showsData[currentShow].images.length;
    const inlineKeyboardShowMenu = (0, getInlineKeyboard_1.getInlineKeyboard)({
        buttonsArray: keyboardButtons_1.itemMenu,
        column: 2,
        back: constants_1.showsPoint,
    });
    const scroll = ctx.emoji `${"scroll"}`;
    const sparkler = ctx.emoji `${"sparkler"}`;
    ctx.session.using = true;
    ctx.session.currentType = constants_1.showsPoint;
    ctx.session.currentItem = currentShow;
    ctx.session.itemsQuantity = photosNumber;
    ctx.session.back = constants_1.showsPoint;
    yield ctx.replyWithPhoto(new grammy_1.InputFile(`./images/shows/${currentShow}1.jpg`), {
        caption: `<b>Фото 1 из ${photosNumber}</b>
                    \n${sparkler}<b>${showsData_1.showsData[currentShow].name}</b>
                    \n${scroll}<b>Описание:</b>\n${showsData_1.showsData[currentShow].description}`,
        parse_mode: 'HTML',
        reply_markup: inlineKeyboardShowMenu,
    });
    yield ctx.answerCallbackQuery();
    yield ctx.deleteMessage();
}));
bot.callbackQuery([constants_1.prev, constants_1.next], (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (ctx.session.itemsQuantity > 1) {
        const currentButton = ctx.callbackQuery.data;
        if (currentButton === constants_1.next) {
            ctx.session.currentItemNumber += 1;
            if (ctx.session.currentItemNumber > ctx.session.itemsQuantity)
                ctx.session.currentItemNumber = 1;
        }
        ;
        if (currentButton === constants_1.prev) {
            ctx.session.currentItemNumber -= 1;
            if (ctx.session.currentItemNumber < 1)
                ctx.session.currentItemNumber = ctx.session.itemsQuantity;
        }
        ;
        const currentItem = ctx.session.currentItem;
        const currentItemNumber = ctx.session.currentItemNumber;
        const itemsQuantity = ctx.session.itemsQuantity;
        const currentType = ctx.session.currentType;
        const scroll = ctx.emoji `${"scroll"}`;
        const partyPopper = ctx.emoji `${"party_popper"}`;
        const inlineKeyboardShowMenu = (0, getInlineKeyboard_1.getInlineKeyboard)({
            buttonsArray: keyboardButtons_1.itemMenu,
            column: 2,
            back: ctx.session.back,
        });
        const currentGoodsData = (0, getCurrentGoodsData_1.getCurrentGoodsData)(currentType);
        const currentGoodsPath = (0, getCurrentGoodsData_1.getCurrentGoodsPath)(currentType);
        const goodPhoto = grammy_1.InputMediaBuilder.photo(new grammy_1.InputFile(`./images/${currentGoodsPath}/${currentGoodsData[currentItem].images[currentItemNumber - 1]}.jpg`), {
            caption: `<b>Фото ${currentItemNumber} из ${itemsQuantity}</b>
                    \n${partyPopper}<b>${currentGoodsData[currentItem].name}</b>
                    \n${scroll}<b>Описание:</b>\n${currentGoodsData[currentItem].description}`,
            parse_mode: 'HTML',
        });
        yield ctx.editMessageMedia(goodPhoto, {
            reply_markup: inlineKeyboardShowMenu
        });
        yield ctx.answerCallbackQuery();
    }
    yield ctx.answerCallbackQuery();
}));
bot.on('callback_query:data', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _t;
    switch (ctx.callbackQuery.data) {
        case constants_1.masterClassesPoint:
            if (ctx.from) {
                addUser(ctx.from.id, ctx.from.username, ctx.from.first_name);
            }
            ctx.callbackQuery.message &&
                (yield ctx.callbackQuery.message.editText(`<b>Страница 1 из ${masterClassesPagesCount}</b>\n${pagesText_1.masterClassesPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboardMasterClasses,
                }));
            yield ctx.answerCallbackQuery();
            break;
        case constants_1.programsPoint:
            if (ctx.from) {
                addUser(ctx.from.id, ctx.from.username, ctx.from.first_name);
            }
            ctx.callbackQuery.message &&
                (yield ctx.callbackQuery.message.editText(`<b>Страница 1 из ${programsPagesCount}</b>\n${pagesText_1.programsPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboardPrograms,
                }));
            yield ctx.answerCallbackQuery();
            break;
        case constants_1.additionsPoint:
            if (ctx.from) {
                addUser(ctx.from.id, ctx.from.username, ctx.from.first_name);
            }
            ctx.callbackQuery.message &&
                (yield ctx.callbackQuery.message.editText(`<b>Страница 1 из ${additionsPagesCount}</b>\n${pagesText_1.additionsPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboardAdditions,
                }));
            yield ctx.answerCallbackQuery();
            break;
        case constants_1.showsPoint:
            if (ctx.from) {
                addUser(ctx.from.id, ctx.from.username, ctx.from.first_name);
            }
            if (ctx.session.using) {
                ctx.session.using = false;
                ctx.session.currentItemNumber = 1;
                ctx.session.itemsQuantity = 0;
                ctx.session.currentType = '';
                ctx.session.currentItem = '';
                ctx.session.back = '';
            }
            if (!((_t = ctx.callbackQuery.message) === null || _t === void 0 ? void 0 : _t.text)) {
                yield ctx.reply(pagesText_1.showsPage, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboardShowMenu,
                });
                yield ctx.deleteMessage();
            }
            else {
                ctx.callbackQuery.message &&
                    (yield ctx.callbackQuery.message.editText(pagesText_1.showsPage, {
                        parse_mode: 'HTML',
                        reply_markup: inlineKeyboardShowMenu,
                    }));
            }
            yield ctx.answerCallbackQuery();
            break;
        case constants_1.charactersPoint:
            if (ctx.from) {
                addUser(ctx.from.id, ctx.from.username, ctx.from.first_name);
            }
            ctx.callbackQuery.message &&
                (yield ctx.callbackQuery.message.editText(pagesText_1.charactersPage, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboardCharactersMenu,
                }));
            yield ctx.answerCallbackQuery();
            break;
        case constants_1.mainPagePoint:
            const hibiscus = ctx.emoji `${"hibiscus"}`;
            const userName = ctx.from ? ctx.from.first_name : 'дорогой пользователь';
            ctx.callbackQuery.message &&
                (yield ctx.callbackQuery.message.editText(`Привет <b>${userName}${hibiscus}</b>\n\n ${pagesText_1.mainPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: mainInlineKeyBoard,
                }));
            yield ctx.answerCallbackQuery();
            break;
        case constants_1.characterTypeAll:
            ctx.callbackQuery.message &&
                (yield ctx.callbackQuery.message.editText(`<b>Страница 1 из ${allCharactersPagesCount}</b>\n${pagesText_1.allCharactersPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboardAllCharacters,
                }));
            yield ctx.answerCallbackQuery();
            break;
        case constants_1.characterTypeMale:
            ctx.callbackQuery.message &&
                (yield ctx.callbackQuery.message.editText(`<b>Страница 1 из ${maleCharactersPagesCount}</b>\n${pagesText_1.maleCharactersPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboardMaleCharacters,
                }));
            yield ctx.answerCallbackQuery();
            break;
        case constants_1.characterTypeFemale:
            ctx.callbackQuery.message &&
                (yield ctx.callbackQuery.message.editText(`<b>Страница 1 из ${femaleCharactersPagesCount}</b>\n${pagesText_1.femaleCharactersPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboardFemaleCharacters,
                }));
            yield ctx.answerCallbackQuery();
            break;
        case constants_1.characterTypeUniversal:
            ctx.callbackQuery.message &&
                (yield ctx.callbackQuery.message.editText(`<b>Страница 1 из ${universalCharactersPagesCount}</b>\n${pagesText_1.universalCharactersPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboardUniversalCharacters,
                }));
            yield ctx.answerCallbackQuery();
            break;
        case constants_1.characterTypeBigDoll:
            ctx.callbackQuery.message &&
                (yield ctx.callbackQuery.message.editText(`<b>Страница 1 из ${bigDollCharactersPagesCount}</b>\n${pagesText_1.bigDollCharactersPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboardBigDollCharacters,
                }));
            yield ctx.answerCallbackQuery();
            break;
    }
}));
bot.hears(constants_1.secretWordGeneral, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const numberUsers = Object.keys(users).length;
    yield ctx.reply(`Количество пользователей заходивших в бот: ${numberUsers}`);
}));
bot.hears(constants_1.secretWordDetail, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const numberUsers = Object.keys(users).length;
    let text = '';
    for (let key in users) {
        text += `\n\n
        Пользователь: ${users[key].id}
        Ник: ${users[key].userNick}
        Имя: ${users[key].userName}
        `;
    }
    yield ctx.reply(`Количество пользователей заходивших в бот: ${numberUsers}${text}`);
}));
bot.on("message", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply("Введите командн '/start' для запуска бота!", {
        reply_parameters: { message_id: ctx.msg.message_id },
    });
}));
bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof grammy_1.GrammyError) {
        console.error(`Error in request: ${e.description}`);
    }
    else if (e instanceof grammy_1.HttpError) {
        console.error(`Could not contact Telegram: ${e}`);
    }
    else {
        console.error(`Unknown error: ${e}`);
    }
});
bot.start();
