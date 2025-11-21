import { IGoodsData } from "../interfaces/goods";
import {
    additionsPoint,
    charactersPoint,
    masterClassesPoint,
    programsPoint,
    showsPoint,
    characterTypeNewYear,
    programsNewYear,
} from "../constants/constants";
import {charactersData} from "../constants/charactersData";
import {programsData} from "../constants/programsData";
import { showsData } from "../constants/showsData";
import { additionsData } from "../constants/additionsData";
import { masterClassesData } from "../constants/masterClassesData";
import { charactersNewYearData } from "../constants/charactersNewYearData";
import { programsNewYearData } from "../constants/programsNewYearData";

export const getCurrentGoodsData = (type: string): IGoodsData => {
    if(type === programsPoint)
        return programsData;

    if(type === showsPoint)
        return showsData;

    if(type === additionsPoint)
        return additionsData;

    if(type === masterClassesPoint)
        return masterClassesData;

    if(type === characterTypeNewYear)
        return charactersNewYearData;

    if(type === programsNewYear)
        return programsNewYearData;

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

    if(type === characterTypeNewYear)
        return characterTypeNewYear;

    if(type === programsNewYear)
        return programsNewYear;

    return charactersPoint;
}
