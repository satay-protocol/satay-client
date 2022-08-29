export const ellipsize = (str : string | undefined, n = 5) => (
    str 
        ? str.length > n
            ? str.slice(0, n) + '...' + str.slice(-n)
            : str
        : ''
);

