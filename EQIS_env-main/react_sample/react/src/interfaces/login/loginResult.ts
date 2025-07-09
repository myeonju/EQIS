import { cloneDeep } from 'lodash';

import { eeBInit, IeeB } from '@/interfaces/employee/eeB';
import { IlangCd } from '@/interfaces/lang/langCd';
import { IopsGrpP } from '@/interfaces/ops/opsGrpP';

export interface IloginResult {
    eeB: IeeB;
    opsGrpPList: IopsGrpP[];
    langCd: IlangCd;
}

export const loginResultInit = () => {
    const loginResult: IloginResult = {
        eeB: eeBInit(),
        opsGrpPList: [],
        langCd: 'KO',
    };

    return cloneDeep(loginResult);
};
