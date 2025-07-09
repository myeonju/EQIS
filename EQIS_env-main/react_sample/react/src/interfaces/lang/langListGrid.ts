import { cloneDeep } from 'lodash';

export interface IlangListGrid {
    mlgCd: string;
    langCd: string;
    mlgSbc: string;
}

export const langListGridInit = () => {
    const langListGrid: IlangListGrid = {
        mlgCd: '',
        langCd: '',
        mlgSbc: '',
    };

    return cloneDeep(langListGrid);
};
