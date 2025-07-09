import { toYYYY } from '@/utils/dateformat';

export const getMyList = () => {
    const startDate = 2000;
    const todayYear = Number(toYYYY(new Date()));

    const myList = [];
    for (let year = startDate; year <= todayYear + 1; year++) {
        myList.push(year);
    }

    return myList;
};
