import { useEffect, useState } from "react";
interface VaultPerformanceRecord {
    tvl: number;
    earnings: number;
    time: string;
}
  
interface PerformanceMetrics {
    "tvl": number;
    "earnings": number;
}

export type MetricsSlug = keyof PerformanceMetrics;

interface PerformancePoint {
    metrics: PerformanceMetrics;
    time: string;
}

const useVaultPerformance = (vaultId: string, numDays: number) => {

    const [performance, setPerformance] = useState<PerformancePoint[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPerformance = async () => {
        const response = await fetch(`https://us-central1-satay-finance.cloudfunctions.net/readVaultPerformance?numDays=${numDays}`);
        const data = await response.json();
        const performance = data.performance.map((point: VaultPerformanceRecord) => {
            return {
                metrics: {
                    tvl: point.tvl || 0,
                    earnings: point.earnings || 0,
                },
                time: point.time,
            }
        })
        setPerformance(performance);
        setLoading(false);
    }

    useEffect(() => {
        fetchPerformance();
    }, [numDays]);

    return { performance, loading };
}

export default useVaultPerformance;