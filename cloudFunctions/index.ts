import { HttpFunction } from '@google-cloud/functions-framework';

import { Point } from '@influxdata/influxdb-client';

import { writeClient, queryClient } from './influxClient';
import { getVaultEarnings } from './utils/vaultEarnings';

import { getTVL } from './utils/vaultPerformance';

const vaultId = "0";
const vaultAddress = "0xb6d95f8bdcd6f81a90017c775aff7dd1175eb558c4b9b682f704c5561d9b7437";
const baseCoinAddress = "0x1::aptos_coin::AptosCoin";

export const writeTVL: HttpFunction = async (req, res) => {
  const TVL = await getTVL(vaultId, baseCoinAddress);
  let point = new Point('TVL')
    .intField('totalAssets', TVL)
  writeClient.writePoint(point)
  await writeClient.flush();
  res.send('Hello World!');
};

export const writeVaultPerformance: HttpFunction = async (req, res) => {
  const TVL = await getTVL("0", "0x1::aptos_coin::AptosCoin");
  const earnings = await getVaultEarnings(vaultAddress, baseCoinAddress, 'testnet');
  let point = new Point('Vault Performance')
    .stringField('vaultId', vaultId)
    .floatField('totalAssets', TVL)
    .floatField('earnings', earnings)
  writeClient.writePoint(point)
  await writeClient.flush();
  res.json({ TVL, earnings });
};

interface TVLRecord {
  tvl: number;
  time: string;
}

export const readTVL: HttpFunction = async (req, res) => {

  const { numDays } = req.query;

  res.set('Access-Control-Allow-Origin', '*');
  const query = `from(bucket: "TVL")
    |> range(start: -${numDays}d)
    |> filter(fn: (r) => r["_measurement"] == "TVL")
    |> filter(fn: (r) => r["_field"] == "totalAssets")
    |> aggregateWindow(every: ${calculateWindow(parseInt(numDays as string))}m, fn: mean, createEmpty: true)
  `;
  const performance: TVLRecord[] = []
  await queryClient.collectRows(query, (row, tableMeta) => {
    const tableObject = tableMeta.toObject(row)
    performance.push({
      tvl: tableObject._value,
      time: tableObject._time,
    })
  })
  res.json({ performance });
}

interface VaultPerformanceRecord {
  tvl: number;
  earnings: number;
  time: string;
}


export const readVaultPerformance: HttpFunction = async (req, res) => {
  const { numDays } = req.query;

  res.set('Access-Control-Allow-Origin', '*');
  const query = `
  from(bucket: "Vault Performance")
    |> range(start: -${numDays}d)
    |> filter(fn: (r) => r["_measurement"] == "Vault Performance")
    |> filter(fn: (r) => r["_field"] == "earnings" or r["_field"] == "totalAssets")
    |> aggregateWindow(every: ${calculateWindow(parseInt(numDays as string))}m, fn: mean, createEmpty: true)
    |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
  `;

  const performance: VaultPerformanceRecord[] = [];
  await queryClient.collectRows(query, (row, tableMeta) => {
    const tableObject = tableMeta.toObject(row);
    performance.push({
      tvl: tableObject.totalAssets,
      earnings: tableObject.earnings,
      time: tableObject._time,
    })
  })
  res.json({ performance });
};

const calculateWindow = (numDays: number) => {
  const numPoints = 30;
  const minutesPerDay = 1440;
  const totalMinutes = minutesPerDay * numDays;
  const window = totalMinutes / numPoints;
  return Math.floor(window);
}