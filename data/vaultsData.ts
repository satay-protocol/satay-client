import { Strategy } from "../types/vaults";

interface VaultInfo {
    symbol: string;
    logo: string,
    about: string,
}

interface Vaults {
    [key : string] : VaultInfo
}

const vaults : Vaults = {
    'USDT': {
        symbol: 'USDT',
        logo: 'https://seeklogo.com//images/T/tether-usdt-logo-FA55C7F397-seeklogo.com.png',
        about: "Tether, is an asset-backed cryptocurrency stablecoin. It was launched by the company Tether Limited Inc. in 2014. Tether Limited is owned by the Hong Kong-based company iFinex Inc., which also owns the Bitfinex cryptocurrency exchange.",
    },
    'AptosCoin': {
        symbol: 'APT',
        logo: 'https://cdn-images-1.medium.com/max/1200/1*Gf747eyRywU8Img0tK5wvw.png',
        about: "APT is the native token of Aptos, a layer-1 blockchain network created by Aptos Labs. In order to maximize the network\'s security and scalability, Aptos utilizes the Move programming language, which was created as part of Meta\'s effort to launch the Libra blockchain.",
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