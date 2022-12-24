import { MetricsSlug } from "../../../hooks/useVaultPerformance";

export interface Metric {
    name: string;
    value: MetricsSlug
}

export const metrics: Metric[] = [
    {
        name: 'TVL',
        value: 'tvl'
    },
    {
        name: 'Earnings',
        value: 'earnings'
    },
]