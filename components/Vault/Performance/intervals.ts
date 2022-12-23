export interface Interval {
    name: string;
    value: number;
}

export const intervals: Interval[] = [
    {
        name: '1D',
        value: 1,
    },
    {
        name: '1W',
        value: 7,
    },
    {
        name: '1M',
        value: 30,
    },
    {
        name: '3M',
        value: 90,
    }
]