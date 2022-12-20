// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AptosClient } from 'aptos'
import type { NextApiRequest, NextApiResponse } from 'next'
import { satay } from '../../data/moduleAddresses'

interface Data {
  uniqueAddresses: number,
  totalTransactions: number
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // get all transactions with contract address
  let client = new AptosClient(`https://aptos-testnet.nodereal.io/v1/${process.env.NEXT_PUBLIC_NODEREAL_API_KEY}/v1`)
  res.status(200).json({ 
    uniqueAddresses: 0,
    totalTransactions: 0
  })
}
