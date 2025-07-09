import { cloneDeep } from 'lodash';

export interface IvehlModalSearch {
    prjVehlCd: string;
    prjVehlCdList: string[];
    vehlNm: string;
    vehlNmList: string[];
    saleBrndCd: string;
    naRegnYn: string;
    coScnChangeYn: string;
}

export const vehlModalSearchInit = () => {
    const vehlModalSearch: IvehlModalSearch = {
        prjVehlCd: '',
        prjVehlCdList: [],
        vehlNm: '',
        vehlNmList: [],
        saleBrndCd: '',
        naRegnYn: '',
        coScnChangeYn: '',
    };

    return cloneDeep(vehlModalSearch);
};
