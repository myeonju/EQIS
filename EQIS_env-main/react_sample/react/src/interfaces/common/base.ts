import { cloneDeep } from 'lodash';

export interface Ibase {
    vbgRgnId?: string;
    vbgRgstTismp?: string;
    finUpdrId?: string;
    finMdfyTismp?: string;
    page?: number;
    limit?: number;
    langCd?: string;
}

export const baseInit = () => {
    const base: Ibase = {
        vbgRgnId: '',
        vbgRgstTismp: '',
        finUpdrId: '',
        finMdfyTismp: '',
        page: 0,
        limit: 0,
        langCd: '',
    };

    return cloneDeep(base);
};
