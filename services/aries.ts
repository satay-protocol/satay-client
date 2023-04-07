
export const getLeverAmount = (ltv: number, numIterations: number) => (ltv ** numIterations - 1) / (ltv - 1);