import { MetricsSlug } from "../../../hooks/useVaultPerformance";

export interface Metric {
    name: string;
    value: MetricsSlug
}

export const metrics: Metric[] = [
    {
        name: 'Earnings',
        value: 'earnings'
    },
    {
        name: 'TVL',
        value: 'tvl'
    }
]