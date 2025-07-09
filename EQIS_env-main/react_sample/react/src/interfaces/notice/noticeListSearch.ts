import { baseInit, Ibase } from '@/interfaces/common/base';

export interface InoticeListSearch extends Ibase {
    titlNm: string;
    pwiImtrSbc: string;
    pwiYn: string;
    supiFxgYn: string;
    popuYn: string;
}

export const noticeListSearchInit = () => {
    const noticeListSearch: InoticeListSearch = {
        titlNm: '',
        pwiImtrSbc: '',
        pwiYn: '',
        supiFxgYn: '',
        popuYn: '',
        ...baseInit(),
    };

    return noticeListSearch;
};
