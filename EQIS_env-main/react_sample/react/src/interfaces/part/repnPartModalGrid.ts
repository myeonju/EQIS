import { cloneDeep } from 'lodash';

export interface IrepnPartModalGrid {
    repnPno: string;
    repnPartKoNm: string;
    repnPartEnNm: string;
}

export const repnPartModalGridInit = () => {
    const repnPartModalGrid: IrepnPartModalGrid = {
        repnPno: '',
        repnPartKoNm: '',
        repnPartEnNm: '',
    };

    return cloneDeep(repnPartModalGrid);
};
