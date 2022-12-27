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
exports.getVaultEarnings = exports.getVaultEarningsRaw = void 0;
const aptosClient_1 = require("./aptosClient");
const coinDecimals_1 = require("./coinDecimals");
const getVaultEarningsRaw = (vaultAddress, network) => __awaiter(void 0, void 0, void 0, function* () {
    const client = (0, aptosClient_1.getAptosClient)(network);
    const resources = yield client.getAccountResources(vaultAddress);
    const earnings = resources
        .filter(resource => resource.type.includes("VaultStrategy"))
        .map(vaultStrategy => vaultStrategy.data)
        .map(strategyData => parseInt(strategyData.total_gain) - parseInt(strategyData.total_loss))
        .reduce((acc, earnings) => acc + earnings, 0);
    return earnings;
});
exports.getVaultEarningsRaw = getVaultEarningsRaw;
const getVaultEarnings = (vaultAddress, baseCoinAddress, network = 'testnet') => __awaiter(void 0, void 0, void 0, function* () {
    const earnings = yield (0, exports.getVaultEarningsRaw)(vaultAddress, network);
    const decimals = yield (0, coinDecimals_1.getDecimals)(baseCoinAddress, network);
    return earnings / Math.pow(10, decimals);
});
exports.getVaultEarnings = getVaultEarnings;
