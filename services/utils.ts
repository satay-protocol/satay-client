export const ellipsize = (str : string | undefined, n = 5) => (
    str 
        ? str.length > n
            ? str.slice(0, n) + '...' + str.slice(-n)
            : str
        : ''
);

export const stringToHex = (text: string) => {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(text);
    return Array.from(encoded, (i) => i.toString(16).padStart(2, "0")).join("");
}

export const toAptos = (lamports: number) => lamports / Math.pow(10, 8);

export const fromAptos = (aptos: number) => aptos * Math.pow(10, 8);

export const getPerformanceArray = () => {
    let val = 0;
    const arr = [];
    for (let i = 0; i < 30; i++) {
        arr.push({
            val,
            i
        });
        val += (Math.random() - (1/3)) * 10;
    }
    return arr;
}