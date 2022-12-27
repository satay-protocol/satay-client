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
exports.readVaultPerformance = exports.readTVL = exports.writeVaultPerformance = exports.writeTVL = void 0;
const influxdb_client_1 = require("@influxdata/influxdb-client");
const influxClient_1 = require("./influxClient");
const vaultEarnings_1 = require("./utils/vaultEarnings");
const vaultPerformance_1 = require("./utils/vaultPerformance");
const vaultId = "0";
const vaultAddress = "0xb6d95f8bdcd6f81a90017c775aff7dd1175eb558c4b9b682f704c5561d9b7437";
const baseCoinAddress = "0x1::aptos_coin::AptosCoin";
const writeTVL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const TVL = yield (0, vaultPerformance_1.getTVL)(vaultId, baseCoinAddress);
    let point = new influxdb_client_1.Point('TVL')
        .intField('totalAssets', TVL);
    influxClient_1.writeClient.writePoint(point);
    yield influxClient_1.writeClient.flush();
    res.send('Hello World!');
});
exports.writeTVL = writeTVL;
const writeVaultPerformance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const TVL = yield (0, vaultPerformance_1.getTVL)("0", "0x1::aptos_coin::AptosCoin");
    const earnings = yield (0, vaultEarnings_1.getVaultEarnings)(vaultAddress, baseCoinAddress, 'testnet');
    let point = new influxdb_client_1.Point('Vault Performance')
        .stringField('vaultId', vaultId)
        .floatField('totalAssets', TVL)
        .floatField('earnings', earnings);
    influxClient_1.writeClient.writePoint(point);
    yield influxClient_1.writeClient.flush();
    res.json({ TVL, earnings });
});
exports.writeVaultPerformance = writeVaultPerformance;
const readTVL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { numDays } = req.query;
    res.set('Access-Control-Allow-Origin', '*');
    const query = `from(bucket: "TVL")
    |> range(start: -${numDays}d)
    |> filter(fn: (r) => r["_measurement"] == "TVL")
    |> filter(fn: (r) => r["_field"] == "totalAssets")
    |> aggregateWindow(every: ${calculateWindow(parseInt(numDays))}m, fn: mean, createEmpty: true)
  `;
    const performance = [];
    yield influxClient_1.queryClient.collectRows(query, (row, tableMeta) => {
        const tableObject = tableMeta.toObject(row);
        performance.push({
            tvl: tableObject._value,
            time: tableObject._time,
        });
    });
    res.json({ performance });
});
exports.readTVL = readTVL;
const readVaultPerformance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { numDays } = req.query;
    res.set('Access-Control-Allow-Origin', '*');
    const query = `
  from(bucket: "Vault Performance")
    |> range(start: -${numDays}d)
    |> filter(fn: (r) => r["_measurement"] == "Vault Performance")
    |> filter(fn: (r) => r["_field"] == "earnings" or r["_field"] == "totalAssets")
    |> aggregateWindow(every: ${calculateWindow(parseInt(numDays))}m, fn: mean, createEmpty: true)
    |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
  `;
    const performance = [];
    yield influxClient_1.queryClient.collectRows(query, (row, tableMeta) => {
        const tableObject = tableMeta.toObject(row);
        performance.push({
            tvl: tableObject.totalAssets,
            earnings: tableObject.earnings,
            time: tableObject._time,
        });
    });
    res.json({ performance });
});
exports.readVaultPerformance = readVaultPerformance;
const calculateWindow = (numDays) => {
    const numPoints = 30;
    const minutesPerDay = 1440;
    const totalMinutes = minutesPerDay * numDays;
    const window = totalMinutes / numPoints;
    return Math.floor(window);
};
