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
exports.getTVL = void 0;
const moduleAddresses_1 = require("../consts/moduleAddresses");
const coinDecimals_1 = require("./coinDecimals");
const executeViewFunction_1 = require("./executeViewFunction");
const getTVL = (vaultId, baseCoinAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const [tvl, decimals] = yield Promise.all([
        getTVLRaw(vaultId, baseCoinAddress),
        (0, coinDecimals_1.getDecimals)(baseCoinAddress, 'testnet')
    ]);
    return tvl / 10 ** decimals;
});
exports.getTVL = getTVL;
const getTVLRaw = (vaultId, baseCoinAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const tvlResonse = yield (0, executeViewFunction_1.callGetFunction)({
        func: `${moduleAddresses_1.satay}::satay::get_vault_total_asset`,
        args: [moduleAddresses_1.satay, vaultId],
        ledger_version: 0,
        network: 'testnet',
        type_args: [baseCoinAddress]
    });
    const tvl = tvlResonse.details.return_values[0];
    return tvl;
});
