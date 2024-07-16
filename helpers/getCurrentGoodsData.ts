import { IGoodsData } from "../interfaces/goods";
import {
    additionsPoint,
    charactersPoint,
    masterClassesPoint,
    programsPoint, showsPoint
} from "../constants/constants";
import {charactersData} from "../constants/charactersData";
import {programsData} from "../constants/programsData";
import { showsData } from "../constants/showsData";
import { additionsData } from "../constants/additionsData";
import { masterClassesData } from "../constants/masterClassesData";

export const getCurrentGoodsData = (type: string): IGoodsData => {
    if(type === programsPoint)
        return programsData;

    if(type === showsPoint)
        return showsData;

    if(type === additionsPoint)
        return additionsData;

    if(type === masterClassesPoint)
        return masterClassesData;

    return charactersData;
}

export const getCurrentGoodsPath = (type: string): string => {
    if(type === programsPoint)
        return programsPoint;

    if(type === showsPoint)
        return showsPoint;

    if(type === additionsPoint)
        return additionsPoint;

    if(type === masterClassesPoint)
        return masterClassesPoint;

    return charactersPoint;
}
