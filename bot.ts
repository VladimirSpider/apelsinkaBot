import {
    Bot,
    Context,
    NextFunction,
    InlineKeyboard,
    InputFile,
    InputMediaBuilder,
    session,
    SessionFlavor,
    HttpError,
    GrammyError} from "grammy";
import 'dotenv/config';
import { EmojiFlavor, emojiParser } from "@grammyjs/emoji";
import { hydrate, HydrateFlavor } from "@grammyjs/hydrate";
import { getCharactersButtons } from "./helpers/getCharactersButtons";
import { getPagesCount } from "./helpers/getPagesCount";
import {
    stickerBear,
    stickerCat,
    stickerMole,
    stickerHippo,
    stickerCatInGlasses,
    managerNumber,
    managerId,
    pageSize,
    mainPagePoint,
    charactersPoint,
    showsPoint,
    programsPoint,
    additionsPoint,
    masterClassesPoint,
    findCurrentPage,
    findCurrentCharacter,
    findCurrentType,
    findNumberPageOnPage,
    characterTypeAll,
    characterTypeMale,
    characterTypeFemale,
    characterTypeUniversal,
    characterTypeBigDoll,
    prev,
    next,
} from "./constants/constants";
import {
    getInlineKeyboard,
    getInlineKeyboardWithPagination
} from "./helpers/getInlineKeyboard";
import {
    characters,
    charactersMenu,
    itemMenu,
    showsMenu,
    programsMenu,
    additionsMenu,
    masterClassesMenu
} from "./constants/keyboardButtons";
import {
    mainPage,
    charactersPage,
    bigDollCharactersPage,
    universalCharactersPage,
    femaleCharactersPage,
    maleCharactersPage,
    allCharactersPage,
    showsPage,
    programsPage,
    additionsPage,
    masterClassesPage
} from "./constants/pagesText";
import { getButtonsPagination, getInnerNameButtons } from "./helpers/getButtonsPagination";
import {getSticker} from "./helpers/getSticker";
import { showsData } from "./constants/showsData";
import {getCurrentGoodsData, getCurrentGoodsPath} from "./helpers/getCurrentGoodsData";

interface SessionData {
    using: boolean;
    currentItemNumber: number;
    itemsQuantity: number;
    currentType: string;
    currentItem: string;
    back: string;
}

const stickers: string[] = [
    stickerBear,
    stickerCat,
    stickerMole,
    stickerHippo,
    stickerCatInGlasses
];

type MyContext = EmojiFlavor & HydrateFlavor<Context> & Context & SessionFlavor<SessionData>;
const { BOT_TOKEN } = process.env;
const bot = new Bot<MyContext>(BOT_TOKEN ?? '');

const createInitialSessionData = () => {
    return {
        using: false,
        currentItemNumber: 1,
        itemsQuantity: 0,
        currentType: '',
        currentItem: '',
        back: '',
    };
}

bot.api.setMyCommands([
    {
        command: 'start',
        description: 'Запуск бота',
    }
]);

bot.use(session({ initial: createInitialSessionData }));

bot.use(emojiParser());
bot.use(hydrate());

async function responseTime(
    ctx: Context,
    next: NextFunction, // is an alias for: () => Promise<void>
): Promise<void> {
    // take time before
    const before = Date.now(); // milliseconds
    // invoke downstream middleware
    await next(); // make sure to `await`!
    // take time after
    const after = Date.now(); // milliseconds
    // log difference
    console.log(`Response time: ${after - before} ms`);
}

bot.use(responseTime);

const mainInlineKeyBoard = new InlineKeyboard()
    .text('📓 Программы', programsPoint)
    .text('🧸 Персонажи', charactersPoint)
    .row()
    .text('🎁 Шоу', showsPoint)
    .text('🏷️ Дополнения', additionsPoint)
    .row()
    .text('🪁 Мастер-классы', masterClassesPoint)
    .url('📷 Instagram', 'https://www.instagram.com/apelsinka_minsk/')
    .row()
    .url('📞Связаться(viber)', `https://viber.click/${managerNumber}`)
    .row()
    .url('📞Связаться(telegram)', `tg://user?id=${managerId}`)
    .row();

const inlineKeyboardCharactersMenu = getInlineKeyboard({
    buttonsArray: charactersMenu,
    column: 2,
    back: mainPagePoint,
});

const allCharactersButtons = getCharactersButtons(characters);
const maleCharactersButtons = getCharactersButtons(characters, characterTypeMale);
const femaleCharactersButtons = getCharactersButtons(characters, characterTypeFemale);
const universalCharactersButtons = getCharactersButtons(characters, characterTypeUniversal);
const bigDollCharactersButtons = getCharactersButtons(characters, characterTypeBigDoll);

const allCharactersPagesCount = getPagesCount(allCharactersButtons.length, pageSize);
const maleCharactersPagesCount = getPagesCount(maleCharactersButtons.length, pageSize);
const femaleCharactersPagesCount = getPagesCount(femaleCharactersButtons.length, pageSize);
const universalCharactersPagesCount = getPagesCount(universalCharactersButtons.length, pageSize);
const bigDollCharactersPagesCount = getPagesCount(bigDollCharactersButtons.length, pageSize);

const inlineKeyboardAllCharacters = getInlineKeyboardWithPagination({
    buttonsArray: allCharactersButtons,
    buttonType: characterTypeAll,
    pageSize: pageSize,
    pagesCount: allCharactersPagesCount,
    column: 2,
    back: charactersPoint,
});
const inlineKeyboardMaleCharacters = getInlineKeyboardWithPagination({
    buttonsArray: maleCharactersButtons,
    buttonType: characterTypeMale,
    pageSize: pageSize,
    pagesCount: maleCharactersPagesCount,
    column: 2,
    back: charactersPoint,
});
const inlineKeyboardFemaleCharacters = getInlineKeyboardWithPagination({
    buttonsArray: femaleCharactersButtons,
    buttonType: characterTypeFemale,
    pageSize: pageSize,
    pagesCount: femaleCharactersPagesCount,
    column: 2,
    back: charactersPoint,
});
const inlineKeyboardUniversalCharacters = getInlineKeyboardWithPagination({
    buttonsArray: universalCharactersButtons,
    buttonType: characterTypeUniversal,
    pageSize: pageSize,
    pagesCount: universalCharactersPagesCount,
    column: 2,
    back: charactersPoint,
});
const inlineKeyboardBigDollCharacters = getInlineKeyboardWithPagination({
    buttonsArray: bigDollCharactersButtons,
    buttonType: characterTypeBigDoll,
    pageSize: pageSize,
    pagesCount: bigDollCharactersPagesCount,
    column: 2,
    back: charactersPoint,
});

const allCharactersButtonsPagination = getInnerNameButtons(
    getButtonsPagination({
        pagesCount: allCharactersPagesCount,
        buttonType: characterTypeAll
    })
);


const maleCharactersButtonsPagination = getInnerNameButtons(
    getButtonsPagination({
        pagesCount: maleCharactersPagesCount,
        buttonType: characterTypeMale
    })
);

const femaleCharactersButtonsPagination = getInnerNameButtons(
    getButtonsPagination({
        pagesCount: femaleCharactersPagesCount,
        buttonType: characterTypeFemale
    })
);

const universalCharactersButtonsPagination = getInnerNameButtons(
    getButtonsPagination({
        pagesCount: universalCharactersPagesCount,
        buttonType: characterTypeUniversal
    })
);

const bigDollCharactersButtonsPagination = getInnerNameButtons(
    getButtonsPagination({
        pagesCount: bigDollCharactersPagesCount,
        buttonType: characterTypeBigDoll
    })
);

const allCharactersButtonsInnerName = getInnerNameButtons(allCharactersButtons);
const maleCharactersButtonsInnerName = getInnerNameButtons(maleCharactersButtons);
const femaleCharactersButtonsInnerName = getInnerNameButtons(femaleCharactersButtons);
const universalCharactersButtonsInnerName = getInnerNameButtons(universalCharactersButtons);
const bigDollCharactersButtonsInnerName = getInnerNameButtons(bigDollCharactersButtons);

const inlineKeyboardShowMenu = getInlineKeyboard({
    buttonsArray: showsMenu,
    column: 2,
    back: mainPagePoint,
});

const showsButtonsInnerName = getInnerNameButtons(showsMenu);

const programsPagesCount = getPagesCount(programsMenu.length, pageSize);
const additionsPagesCount = getPagesCount(additionsMenu.length, pageSize);
const masterClassesPagesCount = getPagesCount(masterClassesMenu.length, pageSize);

const inlineKeyboardPrograms = getInlineKeyboardWithPagination({
    buttonsArray: programsMenu,
    buttonType: programsPoint,
    pageSize: pageSize,
    pagesCount: programsPagesCount,
    column: 1,
    back: mainPagePoint,
});

const inlineKeyboardAdditions = getInlineKeyboardWithPagination({
    buttonsArray: additionsMenu,
    buttonType: additionsPoint,
    pageSize: pageSize,
    pagesCount: additionsPagesCount,
    column: 2,
    back: mainPagePoint,
});

const inlineKeyboardMasterClasses = getInlineKeyboardWithPagination({
    buttonsArray: masterClassesMenu,
    buttonType: masterClassesPoint,
    pageSize: pageSize,
    pagesCount: masterClassesPagesCount,
    column: 1,
    back: mainPagePoint,
});

const programsButtonsPagination = getInnerNameButtons(
    getButtonsPagination({
        pagesCount: programsPagesCount,
        buttonType: programsPoint
    })
);

const additionsButtonsPagination = getInnerNameButtons(
    getButtonsPagination({
        pagesCount: additionsPagesCount,
        buttonType: additionsPoint
    })
);

const masterClassesButtonsPagination = getInnerNameButtons(
    getButtonsPagination({
        pagesCount: masterClassesPagesCount,
        buttonType: masterClassesPoint
    })
);

const programsButtonsInnerName = getInnerNameButtons(programsMenu);
const additionsButtonsInnerName = getInnerNameButtons(additionsMenu);
const masterClassesButtonsInnerName = getInnerNameButtons(masterClassesMenu);

bot.command("start", async (ctx) => {
    const hibiscus = ctx.emoji`${"hibiscus"}`;
    const userName: string = ctx.from ? ctx.from.first_name : 'дорогой пользователь';

    const sticker = getSticker(stickers);
    await ctx.replyWithSticker(sticker);

    await ctx.reply(
        `Привет <b>${userName}${hibiscus}</b>\n\n ${mainPage}`
        , {
        parse_mode: 'HTML',
        reply_markup: mainInlineKeyBoard,
    });
});

bot.callbackQuery(allCharactersButtonsPagination, async (ctx) => {
    if(ctx.session.using) {
        ctx.session.using = false;
        ctx.session.currentItemNumber = 1;
        ctx.session.itemsQuantity = 0;
        ctx.session.currentType = '';
        ctx.session.currentItem = '';
        ctx.session.back = '';
    }

    const currentPage = ctx.callbackQuery.data.match(findCurrentPage);

    if(!ctx.callbackQuery.message?.text && currentPage) {
        const inlineKeyboard = getInlineKeyboardWithPagination({
            buttonsArray: allCharactersButtons,
            buttonType: characterTypeAll,
            pageSize: pageSize,
            pagesCount: allCharactersPagesCount,
            column: 2,
            back: charactersPoint,
            currentPage: Number(currentPage[0]),
        });
        await ctx.reply(`<b>Страница ${currentPage[0]} из ${allCharactersPagesCount}</b>\n${allCharactersPage}`, {
            parse_mode: 'HTML',
            reply_markup: inlineKeyboard,
        });
        await ctx.deleteMessage();
    }

    if(ctx.callbackQuery.message?.text) {
        const pageText = ctx.callbackQuery.message.text;
        const numberPageOnPage = pageText.match(findNumberPageOnPage);
        if(numberPageOnPage && currentPage) {
            if(currentPage[0] !== numberPageOnPage[0]) {
                const inlineKeyboard = getInlineKeyboardWithPagination({
                    buttonsArray: allCharactersButtons,
                    buttonType: characterTypeAll,
                    pageSize: pageSize,
                    pagesCount: allCharactersPagesCount,
                    column: 2,
                    back: charactersPoint,
                    currentPage: Number(currentPage[0]),
                });
                await ctx.callbackQuery.message.editText(`<b>Страница ${currentPage[0]} из ${allCharactersPagesCount}</b>\n${allCharactersPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboard,
                });
            }
        }
    }
    await ctx.answerCallbackQuery();
});

bot.callbackQuery(maleCharactersButtonsPagination, async (ctx) => {
    if(ctx.session.using) {
        ctx.session.using = false;
        ctx.session.currentItemNumber = 1;
        ctx.session.itemsQuantity = 0;
        ctx.session.currentType = '';
        ctx.session.currentItem = '';
        ctx.session.back = '';
    }

    const currentPage = ctx.callbackQuery.data.match(findCurrentPage);

    if(!ctx.callbackQuery.message?.text && currentPage) {
        const inlineKeyboard = getInlineKeyboardWithPagination({
            buttonsArray: maleCharactersButtons,
            buttonType: characterTypeMale,
            pageSize: pageSize,
            pagesCount: maleCharactersPagesCount,
            column: 2,
            back: charactersPoint,
            currentPage: Number(currentPage[0]),
        });
        await ctx.reply(`<b>Страница ${currentPage[0]} из ${maleCharactersPagesCount}</b>\n${maleCharactersPage}`, {
            parse_mode: 'HTML',
            reply_markup: inlineKeyboard,
        });
        await ctx.deleteMessage();
    }

    if(ctx.callbackQuery.message?.text) {
        const pageText = ctx.callbackQuery.message.text;
        const numberPageOnPage = pageText.match(findNumberPageOnPage);
        if(numberPageOnPage && currentPage) {
            if(currentPage[0] !== numberPageOnPage[0]) {
                const inlineKeyboard = getInlineKeyboardWithPagination({
                    buttonsArray: maleCharactersButtons,
                    buttonType: characterTypeMale,
                    pageSize: pageSize,
                    pagesCount: maleCharactersPagesCount,
                    column: 2,
                    back: charactersPoint,
                    currentPage: Number(currentPage[0]),
                });
                await ctx.callbackQuery.message.editText(`<b>Страница ${currentPage[0]} из ${maleCharactersPagesCount}</b>\n${maleCharactersPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboard,
                });
            }
        }
    }
    await ctx.answerCallbackQuery();
});

bot.callbackQuery(femaleCharactersButtonsPagination, async (ctx) => {
    if(ctx.session.using) {
        ctx.session.using = false;
        ctx.session.currentItemNumber = 1;
        ctx.session.itemsQuantity = 0;
        ctx.session.currentType = '';
        ctx.session.currentItem = '';
        ctx.session.back = '';
    }

    const currentPage = ctx.callbackQuery.data.match(findCurrentPage);

    if(!ctx.callbackQuery.message?.text && currentPage) {
        const inlineKeyboard = getInlineKeyboardWithPagination({
            buttonsArray: femaleCharactersButtons,
            buttonType: characterTypeFemale,
            pageSize: pageSize,
            pagesCount: femaleCharactersPagesCount,
            column: 2,
            back: charactersPoint,
            currentPage: Number(currentPage[0]),
        });
        await ctx.reply(`<b>Страница ${currentPage[0]} из ${femaleCharactersPagesCount}</b>\n${femaleCharactersPage}`, {
            parse_mode: 'HTML',
            reply_markup: inlineKeyboard,
        });
        await ctx.deleteMessage();
    }

    if(ctx.callbackQuery.message?.text) {
        const pageText = ctx.callbackQuery.message.text;
        const numberPageOnPage = pageText.match(findNumberPageOnPage);
        if(numberPageOnPage && currentPage) {
            if(currentPage[0] !== numberPageOnPage[0]) {
                const inlineKeyboard = getInlineKeyboardWithPagination({
                    buttonsArray: femaleCharactersButtons,
                    buttonType: characterTypeFemale,
                    pageSize: pageSize,
                    pagesCount: femaleCharactersPagesCount,
                    column: 2,
                    back: charactersPoint,
                    currentPage: Number(currentPage[0]),
                });
                await ctx.callbackQuery.message.editText(`<b>Страница ${currentPage[0]} из ${femaleCharactersPagesCount}</b>\n${femaleCharactersPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboard,
                });
            }
        }
    }
    await ctx.answerCallbackQuery();
});

bot.callbackQuery(universalCharactersButtonsPagination, async (ctx) => {
    if(ctx.session.using) {
        ctx.session.using = false;
        ctx.session.currentItemNumber = 1;
        ctx.session.itemsQuantity = 0;
        ctx.session.currentType = '';
        ctx.session.currentItem = '';
        ctx.session.back = '';
    }

    const currentPage = ctx.callbackQuery.data.match(findCurrentPage);

    if(!ctx.callbackQuery.message?.text && currentPage) {
        const inlineKeyboard = getInlineKeyboardWithPagination({
            buttonsArray: universalCharactersButtons,
            buttonType: characterTypeUniversal,
            pageSize: pageSize,
            pagesCount: universalCharactersPagesCount,
            column: 2,
            back: charactersPoint,
            currentPage: Number(currentPage[0]),
        });
        await ctx.reply(`<b>Страница ${currentPage[0]} из ${universalCharactersPagesCount}</b>\n${universalCharactersPage}`, {
            parse_mode: 'HTML',
            reply_markup: inlineKeyboard,
        });
        await ctx.deleteMessage();
    }

    if(ctx.callbackQuery.message?.text) {
        const pageText = ctx.callbackQuery.message.text;
        const numberPageOnPage = pageText.match(findNumberPageOnPage);
        if(numberPageOnPage && currentPage) {
            if(currentPage[0] !== numberPageOnPage[0]) {
                const inlineKeyboard = getInlineKeyboardWithPagination({
                    buttonsArray: universalCharactersButtons,
                    buttonType: characterTypeUniversal,
                    pageSize: pageSize,
                    pagesCount: universalCharactersPagesCount,
                    column: 2,
                    back: charactersPoint,
                    currentPage: Number(currentPage[0]),
                });
                await ctx.callbackQuery.message.editText(`<b>Страница ${currentPage[0]} из ${universalCharactersPagesCount}</b>\n${universalCharactersPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboard,
                });
            }
        }
    }
    await ctx.answerCallbackQuery();
});

bot.callbackQuery(bigDollCharactersButtonsPagination, async (ctx) => {
    if(ctx.session.using) {
        ctx.session.using = false;
        ctx.session.currentItemNumber = 1;
        ctx.session.itemsQuantity = 0;
        ctx.session.currentType = '';
        ctx.session.currentItem = '';
        ctx.session.back = '';
    }

    const currentPage = ctx.callbackQuery.data.match(findCurrentPage);

    if(!ctx.callbackQuery.message?.text && currentPage) {
        const inlineKeyboard = getInlineKeyboardWithPagination({
            buttonsArray: bigDollCharactersButtons,
            buttonType: characterTypeBigDoll,
            pageSize: pageSize,
            pagesCount: bigDollCharactersPagesCount,
            column: 2,
            back: charactersPoint,
            currentPage: Number(currentPage[0]),
        });
        await ctx.reply(`<b>Страница ${currentPage[0]} из ${bigDollCharactersPagesCount}</b>\n${bigDollCharactersPage}`, {
            parse_mode: 'HTML',
            reply_markup: inlineKeyboard,
        });
        await ctx.deleteMessage();
    }

    if(ctx.callbackQuery.message?.text) {
        const pageText = ctx.callbackQuery.message.text;
        const numberPageOnPage = pageText.match(findNumberPageOnPage);
        if(numberPageOnPage && currentPage) {
            if(currentPage[0] !== numberPageOnPage[0]) {
                const inlineKeyboard = getInlineKeyboardWithPagination({
                    buttonsArray: bigDollCharactersButtons,
                    buttonType: characterTypeBigDoll,
                    pageSize: pageSize,
                    pagesCount: bigDollCharactersPagesCount,
                    column: 2,
                    back: charactersPoint,
                    currentPage: Number(currentPage[0]),
                });
                await ctx.callbackQuery.message.editText(`<b>Страница ${currentPage[0]} из ${bigDollCharactersPagesCount}</b>\n${bigDollCharactersPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboard,
                });
            }
        }
    }
    await ctx.answerCallbackQuery();
});

bot.callbackQuery(programsButtonsPagination, async (ctx) => {
    if(ctx.session.using) {
        ctx.session.using = false;
        ctx.session.currentItemNumber = 1;
        ctx.session.itemsQuantity = 0;
        ctx.session.currentType = '';
        ctx.session.currentItem = '';
        ctx.session.back = '';
    }

    const currentPage = ctx.callbackQuery.data.match(findCurrentPage);

    if(!ctx.callbackQuery.message?.text && currentPage) {
        const inlineKeyboard = getInlineKeyboardWithPagination({
            buttonsArray: programsMenu,
            buttonType: programsPoint,
            pageSize: pageSize,
            pagesCount: programsPagesCount,
            column: 1,
            back: mainPagePoint,
            currentPage: Number(currentPage[0]),
        });
        await ctx.reply(`<b>Страница ${currentPage[0]} из ${programsPagesCount}</b>\n${programsPage}`, {
            parse_mode: 'HTML',
            reply_markup: inlineKeyboard,
        });
        await ctx.deleteMessage();
    }

    if(ctx.callbackQuery.message?.text) {
        const pageText = ctx.callbackQuery.message.text;
        const numberPageOnPage = pageText.match(findNumberPageOnPage);
        if(numberPageOnPage && currentPage) {
            if(currentPage[0] !== numberPageOnPage[0]) {
                const inlineKeyboard = getInlineKeyboardWithPagination({
                    buttonsArray: programsMenu,
                    buttonType: programsPoint,
                    pageSize: pageSize,
                    pagesCount: programsPagesCount,
                    column: 1,
                    back: mainPagePoint,
                    currentPage: Number(currentPage[0]),
                });
                await ctx.callbackQuery.message.editText(`<b>Страница ${currentPage[0]} из ${programsPagesCount}</b>\n${programsPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboard,
                });
            }
        }
    }
    await ctx.answerCallbackQuery();
});

bot.callbackQuery(additionsButtonsPagination, async (ctx) => {
    if(ctx.session.using) {
        ctx.session.using = false;
        ctx.session.currentItemNumber = 1;
        ctx.session.itemsQuantity = 0;
        ctx.session.currentType = '';
        ctx.session.currentItem = '';
        ctx.session.back = '';
    }

    const currentPage = ctx.callbackQuery.data.match(findCurrentPage);

    if(!ctx.callbackQuery.message?.text && currentPage) {
        const inlineKeyboard = getInlineKeyboardWithPagination({
            buttonsArray: additionsMenu,
            buttonType: additionsPoint,
            pageSize: pageSize,
            pagesCount: additionsPagesCount,
            column: 2,
            back: mainPagePoint,
            currentPage: Number(currentPage[0]),
        });
        await ctx.reply(`<b>Страница ${currentPage[0]} из ${additionsPagesCount}</b>\n${additionsPage}`, {
            parse_mode: 'HTML',
            reply_markup: inlineKeyboard,
        });
        await ctx.deleteMessage();
    }

    if(ctx.callbackQuery.message?.text) {
        const pageText = ctx.callbackQuery.message.text;
        const numberPageOnPage = pageText.match(findNumberPageOnPage);
        if(numberPageOnPage && currentPage) {
            if(currentPage[0] !== numberPageOnPage[0]) {
                const inlineKeyboard = getInlineKeyboardWithPagination({
                    buttonsArray: additionsMenu,
                    buttonType: additionsPoint,
                    pageSize: pageSize,
                    pagesCount: additionsPagesCount,
                    column: 2,
                    back: mainPagePoint,
                    currentPage: Number(currentPage[0]),
                });
                await ctx.callbackQuery.message.editText(`<b>Страница ${currentPage[0]} из ${additionsPagesCount}</b>\n${additionsPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboard,
                });
            }
        }
    }
    await ctx.answerCallbackQuery();
});

bot.callbackQuery(masterClassesButtonsPagination, async (ctx) => {
    if(ctx.session.using) {
        ctx.session.using = false;
        ctx.session.currentItemNumber = 1;
        ctx.session.itemsQuantity = 0;
        ctx.session.currentType = '';
        ctx.session.currentItem = '';
        ctx.session.back = '';
    }

    const currentPage = ctx.callbackQuery.data.match(findCurrentPage);

    if(!ctx.callbackQuery.message?.text && currentPage) {
        const inlineKeyboard = getInlineKeyboardWithPagination({
            buttonsArray: masterClassesMenu,
            buttonType: masterClassesPoint,
            pageSize: pageSize,
            pagesCount: masterClassesPagesCount,
            column: 1,
            back: mainPagePoint,
            currentPage: Number(currentPage[0]),
        });
        await ctx.reply(`<b>Страница ${currentPage[0]} из ${masterClassesPagesCount}</b>\n${masterClassesPage}`, {
            parse_mode: 'HTML',
            reply_markup: inlineKeyboard,
        });
        await ctx.deleteMessage();
    }

    if(ctx.callbackQuery.message?.text) {
        const pageText = ctx.callbackQuery.message.text;
        const numberPageOnPage = pageText.match(findNumberPageOnPage);
        if(numberPageOnPage && currentPage) {
            if(currentPage[0] !== numberPageOnPage[0]) {
                const inlineKeyboard = getInlineKeyboardWithPagination({
                    buttonsArray: masterClassesMenu,
                    buttonType: masterClassesPoint,
                    pageSize: pageSize,
                    pagesCount: masterClassesPagesCount,
                    column: 1,
                    back: mainPagePoint,
                    currentPage: Number(currentPage[0]),
                });
                await ctx.callbackQuery.message.editText(`<b>Страница ${currentPage[0]} из ${masterClassesPagesCount}</b>\n${masterClassesPage}`, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboard,
                });
            }
        }
    }
    await ctx.answerCallbackQuery();
});

bot.callbackQuery([
    ...allCharactersButtonsInnerName,
    ...maleCharactersButtonsInnerName,
    ...femaleCharactersButtonsInnerName,
    ...universalCharactersButtonsInnerName,
    ...bigDollCharactersButtonsInnerName,
    ...programsButtonsInnerName,
    ...additionsButtonsInnerName,
    ...masterClassesButtonsInnerName,
    ]
    , async (ctx) => {
    const currentGoodType = ctx.callbackQuery.data.match(findCurrentType);
    const currentGood = ctx.callbackQuery.data.match(findCurrentCharacter);
    if(ctx.callbackQuery.message?.text) {
        const pageText = ctx.callbackQuery.message.text;
        const numberPageOnPage = pageText.match(findNumberPageOnPage);

        if(numberPageOnPage && currentGoodType && currentGood) {

            const inlineKeyboardGoodMenu = getInlineKeyboard({
                buttonsArray: itemMenu,
                column: 2,
                back: `${currentGoodType[0]}_${numberPageOnPage[0]}`,
            });

            const currentGoods = getCurrentGoodsData(currentGoodType[0]);
            const currentGoodsPath = getCurrentGoodsPath(currentGoodType[0]);

            const photosNumber = currentGoods[currentGood[0]].images.length;

            ctx.session.using = true;
            ctx.session.currentType = currentGoodsPath;
            ctx.session.currentItem = currentGood[0];
            ctx.session.itemsQuantity = photosNumber;
            ctx.session.back = `${currentGoodType[0]}_${numberPageOnPage[0]}`;

            const scroll = ctx.emoji`${"scroll"}`;
            const partyPopper = ctx.emoji`${"party_popper"}`;

            await ctx.replyWithPhoto(new InputFile(`./images/${currentGoodsPath}/${currentGood[0]}1.jpg`), {
                caption: `<b>Фото 1 из ${photosNumber}</b>
                        \n${partyPopper}<b>${currentGoods[currentGood[0]].name}</b>
                        \n${scroll}<b>Описание:</b>\n${currentGoods[currentGood[0]].description}`,
                parse_mode: 'HTML',
                reply_markup: inlineKeyboardGoodMenu,
            });

        }
    }
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
});

bot.callbackQuery([...showsButtonsInnerName], async (ctx) => {
    const currentShow = ctx.callbackQuery.data;
    const photosNumber = showsData[currentShow].images.length;

    const inlineKeyboardShowMenu = getInlineKeyboard({
        buttonsArray: itemMenu,
        column: 2,
        back: showsPoint,
    });

    const scroll = ctx.emoji`${"scroll"}`;
    const sparkler = ctx.emoji`${"sparkler"}`;

    ctx.session.using = true;
    ctx.session.currentType = showsPoint;
    ctx.session.currentItem = currentShow;
    ctx.session.itemsQuantity = photosNumber;
    ctx.session.back = showsPoint;

    await ctx.replyWithPhoto(new InputFile(`./images/shows/${currentShow}1.jpg`), {
        caption: `<b>Фото 1 из ${photosNumber}</b>
                    \n${sparkler}<b>${showsData[currentShow].name}</b>
                    \n${scroll}<b>Описание:</b>\n${showsData[currentShow].description}`,
        parse_mode: 'HTML',
        reply_markup: inlineKeyboardShowMenu,
    });

    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
});

bot.callbackQuery([prev, next], async (ctx) => {
    if(ctx.session.itemsQuantity > 1) {
        const currentButton = ctx.callbackQuery.data;

        if(currentButton === next) {
            ctx.session.currentItemNumber += 1;
            if(ctx.session.currentItemNumber > ctx.session.itemsQuantity)
                ctx.session.currentItemNumber = 1;
        };

        if(currentButton === prev) {
            ctx.session.currentItemNumber -= 1;
            if(ctx.session.currentItemNumber < 1)
                ctx.session.currentItemNumber = ctx.session.itemsQuantity;
        };

        const currentItem = ctx.session.currentItem;
        const currentItemNumber = ctx.session.currentItemNumber;
        const itemsQuantity = ctx.session.itemsQuantity;
        const currentType = ctx.session.currentType;

        const scroll = ctx.emoji`${"scroll"}`;
        const partyPopper = ctx.emoji`${"party_popper"}`;

        const inlineKeyboardShowMenu = getInlineKeyboard({
            buttonsArray: itemMenu,
            column: 2,
            back: ctx.session.back,
        });

        const currentGoodsData = getCurrentGoodsData(currentType);
        const currentGoodsPath = getCurrentGoodsPath(currentType);

        const goodPhoto = InputMediaBuilder.photo(new InputFile(`./images/${currentGoodsPath}/${currentGoodsData[currentItem].images[currentItemNumber - 1]}.jpg`),{
            caption: `<b>Фото ${currentItemNumber} из ${itemsQuantity}</b>
                    \n${partyPopper}<b>${currentGoodsData[currentItem].name}</b>
                    \n${scroll}<b>Описание:</b>\n${currentGoodsData[currentItem].description}`,
            parse_mode: 'HTML',
        });
        await ctx.editMessageMedia(goodPhoto, {
            reply_markup: inlineKeyboardShowMenu
        });

        await ctx.answerCallbackQuery();
    }

    await ctx.answerCallbackQuery();
});

bot.on('callback_query:data', async (ctx) => {
    switch (ctx.callbackQuery.data) {
        case masterClassesPoint:
            ctx.callbackQuery.message &&
            await ctx.callbackQuery.message.editText(`<b>Страница 1 из ${masterClassesPagesCount}</b>\n${masterClassesPage}`, {
                parse_mode: 'HTML',
                reply_markup: inlineKeyboardMasterClasses,
            });
            await ctx.answerCallbackQuery();
            break;
        case programsPoint:
            ctx.callbackQuery.message &&
            await ctx.callbackQuery.message.editText(`<b>Страница 1 из ${programsPagesCount}</b>\n${programsPage}`, {
                parse_mode: 'HTML',
                reply_markup: inlineKeyboardPrograms,
            });
            await ctx.answerCallbackQuery();
            break;
        case additionsPoint:
            ctx.callbackQuery.message &&
            await ctx.callbackQuery.message.editText(`<b>Страница 1 из ${additionsPagesCount}</b>\n${additionsPage}`, {
                parse_mode: 'HTML',
                reply_markup: inlineKeyboardAdditions,
            });
            await ctx.answerCallbackQuery();
            break;
        case showsPoint:
            if(ctx.session.using) {
                ctx.session.using = false;
                ctx.session.currentItemNumber = 1;
                ctx.session.itemsQuantity = 0;
                ctx.session.currentType = '';
                ctx.session.currentItem = '';
                ctx.session.back = '';
            }
            if(!ctx.callbackQuery.message?.text) {
                await ctx.reply(showsPage, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboardShowMenu,
                });
                await ctx.deleteMessage();
            } else {
                ctx.callbackQuery.message &&
                await ctx.callbackQuery.message.editText(showsPage, {
                    parse_mode: 'HTML',
                    reply_markup: inlineKeyboardShowMenu,
                });
            }
            await ctx.answerCallbackQuery();
            break;
        case charactersPoint:

            ctx.callbackQuery.message &&
            await ctx.callbackQuery.message.editText(charactersPage, {
                parse_mode: 'HTML',
                reply_markup: inlineKeyboardCharactersMenu,
            });
            await ctx.answerCallbackQuery();
            break;
        case mainPagePoint:
            const hibiscus = ctx.emoji`${"hibiscus"}`;
            const userName: string = ctx.from ? ctx.from.first_name : 'дорогой пользователь';

            ctx.callbackQuery.message &&
            await ctx.callbackQuery.message.editText(
                `Привет <b>${userName}${hibiscus}</b>\n\n ${mainPage}`
                , {
                    parse_mode: 'HTML',
                    reply_markup: mainInlineKeyBoard,
                });
            await ctx.answerCallbackQuery();
            break;
        case characterTypeAll:
            ctx.callbackQuery.message &&
            await ctx.callbackQuery.message.editText(`<b>Страница 1 из ${allCharactersPagesCount}</b>\n${allCharactersPage}`, {
                parse_mode: 'HTML',
                reply_markup: inlineKeyboardAllCharacters,
            });
            await ctx.answerCallbackQuery();
            break;
        case characterTypeMale:
            ctx.callbackQuery.message &&
            await ctx.callbackQuery.message.editText(`<b>Страница 1 из ${maleCharactersPagesCount}</b>\n${maleCharactersPage}`, {
                parse_mode: 'HTML',
                reply_markup: inlineKeyboardMaleCharacters,
            });
            await ctx.answerCallbackQuery();
            break;
        case characterTypeFemale:
            ctx.callbackQuery.message &&
            await ctx.callbackQuery.message.editText(`<b>Страница 1 из ${femaleCharactersPagesCount}</b>\n${femaleCharactersPage}`, {
                parse_mode: 'HTML',
                reply_markup: inlineKeyboardFemaleCharacters,
            });
            await ctx.answerCallbackQuery();
            break;
        case characterTypeUniversal:
            ctx.callbackQuery.message &&
            await ctx.callbackQuery.message.editText(`<b>Страница 1 из ${universalCharactersPagesCount}</b>\n${universalCharactersPage}`, {
                parse_mode: 'HTML',
                reply_markup: inlineKeyboardUniversalCharacters,
            });
            await ctx.answerCallbackQuery();
            break;
        case characterTypeBigDoll:
            ctx.callbackQuery.message &&
            await ctx.callbackQuery.message.editText(`<b>Страница 1 из ${bigDollCharactersPagesCount}</b>\n${bigDollCharactersPage}`, {
                parse_mode: 'HTML',
                reply_markup: inlineKeyboardBigDollCharacters,
            });
            await ctx.answerCallbackQuery();
            break;
    }
});

bot.on("message", async (ctx) => {
    await ctx.reply("Введите командн '/start' для запуска бота!", {
        reply_parameters: { message_id: ctx.msg.message_id },
    })
});

bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error(`Error in request: ${e.description}`);
    } else if (e instanceof HttpError) {
        console.error(`Could not contact Telegram: ${e}`);
    } else {
        console.error(`Unknown error: ${e}`);
    }
});

bot.start();
