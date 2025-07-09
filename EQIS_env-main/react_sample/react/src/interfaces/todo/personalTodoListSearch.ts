import { cloneDeep } from 'lodash';

import { baseInit, Ibase } from '@/interfaces/common/base';
import { IvehlSearchModalGrid } from '@/interfaces/vehicle/vehlSearchModalGrid';

export interface IpersonalTodoListSearch extends Ibase {
    prcScnCd: string;
    sftyQltyIssuMgmtNo: string;
    trtmStCd: string;
    vehlModalGridList: IvehlSearchModalGrid[];
    titlNm: string;
    fromRcpmDtm: string;
    toRcpmDtm: string;
}

export const personalTodoListSearchInit = () => {
    const personalTodoListSearch: IpersonalTodoListSearch = {
        prcScnCd: '',
        sftyQltyIssuMgmtNo: '',
        trtmStCd: '',
        vehlModalGridList: [],
        titlNm: '',
        fromRcpmDtm: '',
        toRcpmDtm: '',
        ...baseInit(),
    };

    return cloneDeep(personalTodoListSearch);
};
