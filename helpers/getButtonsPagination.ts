interface IButtonsPagination {
    pagesCount: number;
    buttonType: string;
};
export const getButtonsPagination = (data: IButtonsPagination) => {
    const {pagesCount, buttonType} = data;
    const buttonsPagination: string[][] = [];

    for(let i = 1; i <= pagesCount; i++) {
        buttonsPagination.push([`${i}`, `${buttonType}_${i}`]);
    }

    return buttonsPagination;
};

export const getInnerNameButtons = (buttons: string[][]): string[] =>
    buttons.map((button) => button[1]);
