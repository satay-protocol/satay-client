import { Strategy } from "../types/vaults";

interface VaultInfo {
    logo: string,
    about: string,
}

interface Vaults {
    [key : string] : VaultInfo
}

const vaults : Vaults = {
    'USDT': {
        logo: 'https://seeklogo.com//images/T/tether-usdt-logo-FA55C7F397-seeklogo.com.png',
        about: "Tether, is an asset-backed cryptocurrency stablecoin. It was launched by the company Tether Limited Inc. in 2014. Tether Limited is owned by the Hong Kong-based company iFinex Inc., which also owns the Bitfinex cryptocurrency exchange.",
    },
    'AptosCoin': {
        logo: 'https://cdn-images-1.medium.com/max/1200/1*Gf747eyRywU8Img0tK5wvw.png',
        about: "Aptos is a Layer 1 blockchain built on a Proof-of-Stake (PoS) consensus mechanism developed by former Meta developers, who were previously working on the company’s “Diem” $200 million cryptocurrency project before it was scrapped in January 2022.",
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