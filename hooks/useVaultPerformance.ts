import { useEffect, useState } from "react";

interface VaultPerformance {
    totalAssets: number;
    time: string;
}

const useVaultPerformance = (vaultId: string) => {

    const [performance, setPerformance] = useState<VaultPerformance[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPerformance = async () => {
        const response = await fetch(`https://us-central1-satay-finance.cloudfunctions.net/readTVL`);
        const data = await response.json();
        setPerformance(data.performance as VaultPerformance[]);
        setLoading(false);
    }

    useEffect(() => {
        fetchPerformance();
    }, []);

    return { performance, loading };
}

export default useVaultPerformance;