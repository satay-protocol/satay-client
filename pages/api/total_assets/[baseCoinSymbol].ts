import type { NextApiRequest, NextApiResponse } from 'next'
import { getCoin } from '../../../data/coins';
import { getAptosClient } from '../../../services/aptosClients';

import { getTVL } from '../../../services/vaultPerformance';

interface Data {
  totalAssets: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const { baseCoinSymbol } = req.query;

    const baseCoin = getCoin(baseCoinSymbol as string);
    const totalAssets = await getTVL(getAptosClient('testnet'), baseCoin.coinStruct)
    res.status(200).json({ totalAssets })
}