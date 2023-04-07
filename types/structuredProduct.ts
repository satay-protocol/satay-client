import React from "react";

import { Block } from "./block";
import {Module} from "./aptos";

export interface StructuredProduct {
    module: Module;
    name: string;
    description: string;
    protocols: string[];
    blocks: Block[];
    block: Block;
    inDevelopment?: boolean;
    depositBox: React.FC;
}