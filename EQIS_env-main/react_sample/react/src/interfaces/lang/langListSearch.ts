import { cloneDeep } from 'lodash';

import { Ibase } from '@/interfaces/common/base';

export interface IlangListSearch extends Ibase {
    mlgCd: string;
    langCd: string;
    mlgSbc: string;
}

export const langListSearchInit = () => {
    const langListSearch: IlangListSearch = {
        mlgCd: '',
        langCd: '',
        mlgSbc: '',
    };

    return cloneDeep(langListSearch);
};
