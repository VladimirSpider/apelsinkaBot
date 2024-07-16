interface IGoodContent {
    name: string;
    description: string;
    images: string[];
}

export interface IGoodsData {
    [key: string]: IGoodContent;
}
