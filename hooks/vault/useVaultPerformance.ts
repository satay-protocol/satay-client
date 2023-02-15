import { useEffect, useState } from "react";
import { StructData } from "../../types/aptos";
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

const useVaultPerformance = (baseCoinStruct: StructData, numDays: number) => {

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
        // setPerformance(performance);
        setPerformance(createPerformance());
        setLoading(false);
    }

    useEffect(() => {
        fetchPerformance();
    }, [numDays]);

    return { performance, loading };
}

export default useVaultPerformance;

const createPerformance = () => {
    const performance = [];
    const initialTvl = 10;
    let tvl = initialTvl;
    for (let i = 0; i < 15; i++) {
        performance.push({
            time: new Date().toISOString(),
            metrics: {
                tvl: tvl,
                earnings: tvl - initialTvl,
            }
        })
        tvl += (Math.random() - 0.20) * initialTvl / 100;

    }
    return performance;
        
}