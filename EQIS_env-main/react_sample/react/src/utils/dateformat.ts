import dayjs from 'dayjs';

import { IlangCd } from '@/interfaces/lang/langCd';

/**
 * example) addDay(new Date(), 1)
 */
export const addDay = (date: string | Date | dayjs.Dayjs, day: number) => {
    return dayjs(date).add(day, 'day').format();
};

/**
 * example) addWeek(new Date(), 1)
 */
export const addWeek = (date: string | Date | dayjs.Dayjs, week: number) => {
    return dayjs(date).add(week, 'week').format();
};

/**
 * example) addMonth(new Date(), 1)
 */
export const addMonth = (date: string | Date | dayjs.Dayjs, month: number) => {
    return dayjs(date).add(month, 'month').format();
};

/**
 * example) addYear(new Date(), 1)
 */
export const addYear = (date: string | Date | dayjs.Dayjs, year: number) => {
    return dayjs(date).add(year, 'year').format();
};

/**
 * example) toYYYYMMDD(new Date())
 */
export const toYYYYMMDD = (date: string | Date | dayjs.Dayjs, langCd?: IlangCd) => {
    if (!date) {
        return '';
    }

    if (langCd) {
        switch (langCd) {
            case 'KO':
                return dayjs(date).format('YYYY-MM-DD');

            case 'EN':
                return dayjs(date).format('MM-DD-YYYY');
        }
    }

    return dayjs(date).format('YYYY-MM-DD');
};

/**
 * example) toDotYYYYMMDD(new Date())
 */
export const toDotYYYYMMDD = (date: string | Date | dayjs.Dayjs, langCd?: IlangCd) => {
    if (!date) {
        return '';
    }

    if (langCd) {
        switch (langCd) {
            case 'KO':
                return dayjs(date).format('YYYY.MM.DD');

            case 'EN':
                return dayjs(date).format('MMM DD, YYYY');
        }
    }

    return dayjs(date).format('YYYY.MM.DD');
};

/**
 * example) toYYYY(new Date())
 */
export const toYYYY = (date: string | Date | dayjs.Dayjs) => {
    if (!date) {
        return '';
    }

    return dayjs(date).format('YYYY');
};

/**
 * example) toYYYYMMDDHHmmss(new Date())
 */
export const toYYYYMMDDHHmmss = (date: string | Date | dayjs.Dayjs, langCd?: IlangCd) => {
    if (!date) {
        return '';
    }

    if (langCd) {
        switch (langCd) {
            case 'KO':
                return dayjs(date).format('YYYY-MM-DD HH:mm:ss');

            case 'EN':
                return dayjs(date).format('MMM DD, YYYY HH:mm:ss');
        }
    }

    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};
