import { Block } from "./block";

export interface StructuredProduct {
    moduleAddress: string;
    name: string;
    description: string;
    protocols: string[];
    blocks: Block[];
    block: Block;
    inDevelopment?: boolean
}