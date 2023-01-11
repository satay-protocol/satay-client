import { SUPPORTED_NETWORKS } from "../data/networks";

import { SupportedNetwork } from "../types/network";

export const getNetworkSlug = (networkName: string | null): SupportedNetwork | undefined => {
    if (!networkName) return undefined;
    for(const network of SUPPORTED_NETWORKS) {
        if (networkName.toLowerCase().includes(network)) {
            return network;
        }
    }
    return undefined;
}
