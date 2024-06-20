export const sortByDate = <T extends { createdAt: string }>(arr: T[]): T[] => {
    return arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

