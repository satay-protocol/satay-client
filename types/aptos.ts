
export interface StructData extends Module {
    struct_name: string,
}

export interface Module {
    account_address: string;
    module_name: string;
}

export interface CoinStoreResource {
    coin: {
        value: string
    }
}

export interface CoinInfoStruct {
    decimals: number;
    symbol: string;
    name: string;
}


