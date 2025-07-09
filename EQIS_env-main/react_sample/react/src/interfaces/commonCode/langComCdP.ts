import { cloneDeep } from 'lodash';

import { baseInit, Ibase } from '@/interfaces/common/base';

export interface IlangComCdP extends Ibase {
    comCdGrpCd: string;
    comCd: string;
    langCd: string;
    langComCdNm: string;
    sortSqn: number;
    useYn: string;
}

export const langComCdPInit = () => {
    const langComCdP: IlangComCdP = {
        comCdGrpCd: '',
        comCd: '',
        langCd: '',
        langComCdNm: '',
        sortSqn: 0,
        useYn: '',
        ...baseInit(),
    };
    return cloneDeep(langComCdP);
};
