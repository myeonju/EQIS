import { cloneDeep } from 'lodash';

export interface IvehlSearchModalGrid {
    // VehlC DB
    prdnCorpCd: string;
    stdVehlCd: string;
    prjVehlCd: string;
    vehlNm: string;
    qltyVhclTypeCd: string;
    saleBrndCd: string;

    // PrdnCorpC DB
    prdnCorpAbbNm: string;

    // Etc
    qltyVhclTypeNm: string;
    saleBrndNm: string;
}

export const vehlModalGridInit = () => {
    const vehlSearchModalGrid: IvehlSearchModalGrid = {
        // VehlC DB
        prdnCorpCd: '',
        stdVehlCd: '',
        prjVehlCd: '',
        vehlNm: '',
        qltyVhclTypeCd: '',
        saleBrndCd: '',

        // PrdnCorpC DB
        prdnCorpAbbNm: '',

        // Etc
        qltyVhclTypeNm: '',
        saleBrndNm: '',
    };

    return cloneDeep(vehlSearchModalGrid);
};
