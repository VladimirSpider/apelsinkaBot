import { IGoodsData } from "../interfaces/goods";

const programsDescription = `Программа сформирована оптимально по выгодной стоимости. Всё, что заявлено в программе, актуально. 

Если Вам понравился данный праздничный пакет, свяжитесь с нами и скажите менеджеру название. 

Если Вам понравился данный праздничный пакет, но есть пункты, которые хочется убрать, скажите об этом менеджеру. Мы предложим Вам взамен либо расширить игровой ряд, либо дополнить альтернативным развлечением. На стоимость это не повлияет ни в меньшую, ни в большую сторону.

Также возможно собрать индивидуальную программу праздника из всех пунктов, которые понравились вам 🤗

ПОЖАЛУЙСТА УТОЧНЯЙТЕ СТОИМОСТЬ ПРОГРАММЫ У МЕНЕДЖЕРА 📞
`;

export const programsData: IGoodsData = {
    'congratulationFromBigDoll': {
        name: 'Поздравление от ростовой куклы',
        description: programsDescription,
        images: ['congratulationFromBigDoll1'],
    },
    'expressCongratulations': {
        name: 'Экспресс-поздравление',
        description: programsDescription,
        images: ['expressCongratulations1'],
    },
    'mini': {
        name: 'Мини',
        description: programsDescription,
        images: ['mini1'],
    },
    'compact': {
        name: 'Компакт',
        description: programsDescription,
        images: ['compact1'],
    },
    'wow': {
        name: 'Вау',
        description: programsDescription,
        images: ['wow1'],
    },
    'super': {
        name: 'Супер',
        description: programsDescription,
        images: ['super1'],
    },
    'challengeShow': {
        name: 'Слабо-шоу',
        description: programsDescription,
        images: ['challengeShow1', 'challengeShow2'],
    },
    'brilliantHoliday': {
    name: 'Блестящий праздник',
        description: programsDescription,
        images: ['brilliantHoliday1'],
    },
    'smartHoliday': {
        name: 'Умный праздник',
            description: programsDescription,
            images: ['smartHoliday1'],
    },
    'thematicQuest': {
        name: 'Тематический квест',
            description: programsDescription,
            images: ['thematicQuest1', 'thematicQuest2', 'thematicQuest3', 'thematicQuest4', 'thematicQuest5'],
    },
    'bubbles': {
        name: 'Пузыряши',
            description: programsDescription,
            images: ['bubbles1'],
    },
    'boom': {
        name: 'Бум',
            description: programsDescription,
            images: ['boom1'],
    },
    'booms': {
        name: 'Бумс',
            description: programsDescription,
            images: ['booms1'],
    },
    'disco': {
        name: 'Диско',
            description: programsDescription,
            images: ['disco1'],
    },
    'questWithLabubu': {
        name: 'Квест с Лабубу',
            description: programsDescription,
            images: ['questWithLabubu1'],
    },
    'schoolboyOrTroublemaker': {
        name: 'ШКОЛЬНИК или ШКОДНИК?!',
            description: programsDescription,
            images: ['questWithLabubu1'],
    },
    'customProgram': {
        name: 'Сборная программа',
            description: 'Вы просмотрели все праздничные пакеты и не остановились не на одном? Захотелось что-то с одной программы, а что-то с другой? Не беда! Мы составим только Ваш индивидуальный набор развлечений, который подойдёт именно Вам🤗🎉\n' +
                '\n' +
                'Свяжитесь с нами, опишите Ваши пожелания, и Ваш праздник будет индивидуально составлен под Вашу компанию и видение события.',
            images: ['customProgram1'],
    }
};