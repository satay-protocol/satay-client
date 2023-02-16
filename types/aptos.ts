import { MoveResource } from "aptos/src/generated";

export interface StructData {
    struct_name: string,
    account_address: string;
    module_name: string;
}

export interface CoinStoreResource {
    coin: {
        value: string
    }
}

export interface CoinInfoResource extends MoveResource {
    data: CoinInfoStruct
}

export interface CoinInfoStruct {
    decimals: number;
    symbol: string;
    name: string;
}


