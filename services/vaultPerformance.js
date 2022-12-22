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
const moduleAddresses_1 = require("../data/moduleAddresses");
const simulation_1 = require("./simulation");
const getTVL = (vaultId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, simulation_1.callGetFunction)({
        func: `${moduleAddresses_1.satay}::satay::get_vault_total_asset`,
        args: [moduleAddresses_1.satay, vaultId],
        ledger_version: 0,
        network: 'testnet',
        type_args: ['0x1::aptos_coin::AptosCoin']
    });
    return response.details.return_values[0];
});
exports.getTVL = getTVL;
