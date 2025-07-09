import { cloneDeep } from 'lodash';

import { Ibase, baseInit } from '@/interfaces/common/base';

export interface IrepnPartModalSearch extends Ibase {
    repnPno: string;
    repnPnoList: string[];
    repnPartNm: string;
    repnPartNmList: string[];
    useYn: string;
}

export const repnPartModalSearchInit = () => {
    const repnPartModalSearch: IrepnPartModalSearch = {
        repnPno: '',
        repnPnoList: [],
        repnPartNm: '',
        repnPartNmList: [],
        useYn: '',
        ...baseInit(),
    };

    return cloneDeep(repnPartModalSearch);
};
