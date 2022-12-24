import { useEffect, useState } from "react";
import { TVLRecord } from "../cloudFunctions";

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
        const response = await fetch(`https://us-central1-satay-finance.cloudfunctions.net/readTVL?numDays=${numDays}`);
        const data = await response.json();
        const performance = data.performance.map((point: TVLRecord) => {
            return {
                metrics: {
                    tvl: point.tvl || 0,
                    earnings: 0,
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