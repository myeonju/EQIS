import { cloneDeep } from 'lodash';

import { baseInit, Ibase } from '@/interfaces/common/base';

export interface IprdnCorpC extends Ibase {
    prdnCorpCd: string;
    prdnCorpAbbNm: string;
    prdnCorpKoNm: string;
    prdnCorpEnNm: string;
    coScnCd: string;
    natCd: string;
    useYn: string;
}

export const langComCdPInit = () => {
    const prdnCorp: IprdnCorpC = {
        prdnCorpCd: '',
        prdnCorpAbbNm: '',
        prdnCorpKoNm: '',
        prdnCorpEnNm: '',
        coScnCd: '',
        natCd: '',
        useYn: '',
        ...baseInit(),
    };
    return cloneDeep(prdnCorp);
};
