import {Block, NewBlock} from "../types/block";

export const newBlockToOldBlock = (newBlock: NewBlock): Block => ({
    inputCoinType: newBlock.inputCoin.coinStruct,
    outputCoinType: newBlock.outputCoin.coinStruct,
    inputCoinSymbol: newBlock.inputCoin.symbol,
    outputCoinSymbol: newBlock.outputCoin.symbol,
    description: newBlock.description,
    inputProtocol: newBlock.inputCoin.protocol,
    outputProtocol: newBlock.outputCoin.protocol,
    title: newBlock.title,
    apy: newBlock.apy,
})