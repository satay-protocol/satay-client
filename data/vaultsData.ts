import { Strategy } from "../types/vaults";

interface VaultInfo {
    logo: string,
    about: string,
    strategies: Strategy[]
}

interface Vaults {
    [key : string] : VaultInfo
}

const vaults : Vaults = {
    'USDT': {
        logo: 'https://seeklogo.com//images/T/tether-usdt-logo-FA55C7F397-seeklogo.com.png',
        about: "Tether, is an asset-backed cryptocurrency stablecoin. It was launched by the company Tether Limited Inc. in 2014. Tether Limited is owned by the Hong Kong-based company iFinex Inc., which also owns the Bitfinex cryptocurrency exchange.",
        strategies: [
            {
                title: "USDT/BTC Liquidity Provision",
                description: "Swap 50% of pooled USDT to BTC and add liquidity to the USDT/BTC Liquidswap pool. Yield earned from trading fees."
            }
        ]
    }
}

export const getVaultInfo = (vaultAsset : string) => ({
    asset: vaultAsset,
    ...vaults[vaultAsset]
});

export const getVaultPreview = (vaultAsset : string) => ({
    asset: vaultAsset,
    logo: vaults[vaultAsset].logo
})