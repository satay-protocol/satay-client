export const ellipsize = (str : string | undefined, n = 5) => (
    str 
        ? str.length > n
            ? str.slice(0, n) + '...' + str.slice(-n)
            : str
        : ''
);

export const round2 = (num : number) => Math.round(num * 100) / 100;

export const stringToHex = (text: string) => {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(text);
    return Array.from(encoded, (i) => i.toString(16).padStart(2, "0")).join("");
}

export const toAptos = (lamports: number) => lamports / Math.pow(10, 8);

export const fromAptos = (aptos: number) => aptos * Math.pow(10, 8);

export const getPerformanceArray = (numPoints = 30, apy = 0.07) => {
    let val = 0;
    const arr = [];
    for (let i = 0; i < numPoints; i++) {
        arr.push({
            val,
            i
        });
        val += (Math.random() * (apy / numPoints));
    }
    return arr;
}

export const performanceArray = getPerformanceArray();