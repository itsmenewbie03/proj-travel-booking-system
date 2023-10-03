const compute_duration = (date1: string, date2: string): number => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diff_in_ms = d2.getTime() - d1.getTime();
    const differenceInDays = diff_in_ms / (1000 * 60 * 60 * 24);
    return differenceInDays;
};
export { compute_duration };
