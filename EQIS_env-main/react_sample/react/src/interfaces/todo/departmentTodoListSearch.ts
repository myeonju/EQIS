import { cloneDeep } from 'lodash';

import { baseInit, Ibase } from '@/interfaces/common/base';
import { IvehlSearchModalGrid } from '@/interfaces/vehicle/vehlSearchModalGrid';

export interface IdepartmentTodoListSearch extends Ibase {
    prcScnCd: string;
    sftyQltyIssuMgmtNo: string;
    trtmStCd: string;
    vehlModalGridList: IvehlSearchModalGrid[];
    titlNm: string;
    fromRcpmDtm: string;
    toRcpmDtm: string;
}

export const departmentTodoListSearchInit = () => {
    const departmentTodoListSearch: IdepartmentTodoListSearch = {
        prcScnCd: '',
        sftyQltyIssuMgmtNo: '',
        trtmStCd: '',
        vehlModalGridList: [],
        titlNm: '',
        fromRcpmDtm: '',
        toRcpmDtm: '',
        ...baseInit(),
    };

    return cloneDeep(departmentTodoListSearch);
};
