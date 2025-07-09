import { cloneDeep } from 'lodash';

export interface IopsB {
    opsId: string;
    prdnCorpCd: string;
    coScnCd: string;
    opsKoNm: string;
    opsEnNm: string;
    itgOpsYn: string;
    dptyRdcsYn: string;
    useYn: string;
}

export const opsBInit = () => {
    const opsB: IopsB = {
        opsId: '',
        prdnCorpCd: '',
        coScnCd: '',
        opsKoNm: '',
        opsEnNm: '',
        itgOpsYn: '',
        dptyRdcsYn: '',
        useYn: '',
    };

    return cloneDeep(opsB);
};
