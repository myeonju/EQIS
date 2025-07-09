import { cloneDeep } from 'lodash';

export interface IcommonCodeListGrid {
    comCdGrpCd: string;
    comCd: string;
    langCd: string;
    langComCdNm: string;
    sortSqn: number;
}

export const commonCodeListGridInit = () => {
    const commonCodeListGrid: IcommonCodeListGrid = {
        comCdGrpCd: '',
        comCd: '',
        langCd: '',
        langComCdNm: '',
        sortSqn: 0,
    };
    return cloneDeep(commonCodeListGrid);
};
