export const thousands = (value: number | string) => {
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
