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
