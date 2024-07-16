"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentGoodsPath = exports.getCurrentGoodsData = void 0;
const constants_1 = require("../constants/constants");
const charactersData_1 = require("../constants/charactersData");
const programsData_1 = require("../constants/programsData");
const showsData_1 = require("../constants/showsData");
const additionsData_1 = require("../constants/additionsData");
const masterClassesData_1 = require("../constants/masterClassesData");
const getCurrentGoodsData = (type) => {
    if (type === constants_1.programsPoint)
        return programsData_1.programsData;
    if (type === constants_1.showsPoint)
        return showsData_1.showsData;
    if (type === constants_1.additionsPoint)
        return additionsData_1.additionsData;
    if (type === constants_1.masterClassesPoint)
        return masterClassesData_1.masterClassesData;
    return charactersData_1.charactersData;
};
exports.getCurrentGoodsData = getCurrentGoodsData;
const getCurrentGoodsPath = (type) => {
    if (type === constants_1.programsPoint)
        return constants_1.programsPoint;
    if (type === constants_1.showsPoint)
        return constants_1.showsPoint;
    if (type === constants_1.additionsPoint)
        return constants_1.additionsPoint;
    if (type === constants_1.masterClassesPoint)
        return constants_1.masterClassesPoint;
    return constants_1.charactersPoint;
};
exports.getCurrentGoodsPath = getCurrentGoodsPath;
