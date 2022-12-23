import { HttpFunction } from '@google-cloud/functions-framework';

import { Point } from '@influxdata/influxdb-client';

import { writeClient, queryClient } from './influxClient';

import { getTVL } from './utils/vaultPerformance';

export const writeTVL: HttpFunction = async (req, res) => {
  const TVL = await getTVL("0", "0x1::aptos_coin::AptosCoin");
  let point = new Point('TVL')
    .intField('totalAssets', TVL)
  writeClient.writePoint(point)
  await writeClient.flush();
  res.send('Hello World!');
};

interface ReqParams {
  numDays: string;
}

export interface TVLRecord {
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
    console.log(tableObject);
    performance.push({
      tvl: tableObject._value,
      time: tableObject._time,
    })
  })
  res.json({ performance });
}

const calculateWindow = (numDays: number) => {
  const numPoints = 30;
  const minutesPerDay = 1440;
  const totalMinutes = minutesPerDay * numDays;
  const window = totalMinutes / numPoints;
  return Math.floor(window);
}