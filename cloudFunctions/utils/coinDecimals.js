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
exports.getDecimals = void 0;
const executeViewFunction_1 = require("./executeViewFunction");
const getDecimals = (coinAddress, network) => __awaiter(void 0, void 0, void 0, function* () {
    const decimalsResponse = yield (0, executeViewFunction_1.callGetFunction)({
        func: '0x1::coin::decimals',
        type_args: [coinAddress],
        args: [],
        ledger_version: 0,
        network
    });
    const decimals = decimalsResponse.details.return_values[0];
    return decimals;
});
exports.getDecimals = getDecimals;
