"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagesCount = void 0;
const getPagesCount = (buttonsCount, pageSize) => Math.ceil(buttonsCount / pageSize);
exports.getPagesCount = getPagesCount;
