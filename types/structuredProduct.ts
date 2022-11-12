import { Block } from "./block";

export interface StructuredProduct {
    moduleAddress: string;
    name: string;
    description: string;
    coinStruct: string;
    coinSymbol: string;
    coinSlug: string;
    protocols: string[];
    blocks: Block[];
    block: Block;
}