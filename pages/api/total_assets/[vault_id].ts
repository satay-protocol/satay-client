import type { NextApiRequest, NextApiResponse } from 'next'

import { getTVL } from '../../../services/vaultPerformance';

interface Data {
  totalAssets: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const { vault_id } = req.query;

    const totalAssets = await getTVL(vault_id as string)
    res.status(200).json({ totalAssets })
}