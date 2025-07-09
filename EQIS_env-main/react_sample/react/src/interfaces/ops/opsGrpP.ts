import { cloneDeep } from 'lodash';

export interface IopsGrpP {
    opsGrpCd: string;
    opsId: string;
    prdnCorpCd: string;
    vbgRcpmOpsYn: string;
    useYn: string;
}

export const opsGrpInit = () => {
    const opsGrpP: IopsGrpP = {
        opsGrpCd: '',
        opsId: '',
        prdnCorpCd: '',
        vbgRcpmOpsYn: '',
        useYn: '',
    };

    return cloneDeep(opsGrpP);
};
