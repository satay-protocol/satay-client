export interface Coin {
    name: string;
    type: string;
}

export const coins : Coin[] = [
    {
        name: "Aptos",
        type: "0x1::aptos_coin::AptosCoin"
    }
]
