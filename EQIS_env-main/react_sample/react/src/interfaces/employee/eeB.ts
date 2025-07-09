import { cloneDeep } from 'lodash';

import { baseInit, Ibase } from '@/interfaces/common/base';

export interface IeeB extends Ibase {
    // EeB DB
    itgEeno: string;
    eeKoNm: string;
    eeEnNm: string;
    poaCd: string;
    opsId: string;
    prdnCorpCd: string;
    coScnCd: string;
    accLckYn: string;
    useYn: string;

    // Ops DB
    opsKoNm: string;
    opsEnNm: string;
    itgOpsYn: string;

    // PrdnCorp DB
    prdnCorpKoNm: string;
    prdnCorpEnNm: string;
    prdnCorpNm: string;

    // Nat DB
    natCd: string;
    natKoNm: string;
    natEnNo: string;

    // Etc
    lastLoginDate: string;
}

export const eeBInit = () => {
    const eeB: IeeB = {
        // EeB DB
        itgEeno: '',
        eeKoNm: '',
        eeEnNm: '',
        poaCd: '',
        opsId: '',
        prdnCorpCd: '',
        coScnCd: '',
        accLckYn: '',
        useYn: '',
        ...baseInit(),

        // Ops DB
        opsKoNm: '',
        opsEnNm: '',
        itgOpsYn: '',

        // PrdnCorp DB
        prdnCorpKoNm: '',
        prdnCorpEnNm: '',
        prdnCorpNm: '',

        // Nat DB
        natCd: '',
        natKoNm: '',
        natEnNo: '',

        // Etc
        lastLoginDate: '',
    };
    return cloneDeep(eeB);
};
