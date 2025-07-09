import { cloneDeep } from 'lodash';

import { baseInit, Ibase } from '@/interfaces/common/base';

export interface IcommonCodeListSearch extends Ibase {
    comCdGrpCd: string;
    comCd: string;
    langCd: string;
    langComCdNm: string;
}

export const commonCodeListSearchInit = () => {
    const commonCodeListSearch: IcommonCodeListSearch = {
        comCdGrpCd: '',
        comCd: '',
        langCd: '',
        langComCdNm: '',
        ...baseInit(),
    };
    return cloneDeep(commonCodeListSearch);
};
