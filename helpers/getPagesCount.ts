export const getPagesCount = (buttonsCount: number, pageSize: number): number =>
    Math.ceil(buttonsCount / pageSize);
