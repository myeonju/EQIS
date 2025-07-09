import { cloneDeep } from 'lodash';

export interface IattcFileSaveResult {
    attcFilNo: string;
    encAttcFilNo: string;
}

export const attcFileSaveResultInit = () => {
    const attcFileSaveResult: IattcFileSaveResult = {
        attcFilNo: '',
        encAttcFilNo: '',
    };
    return cloneDeep(attcFileSaveResult);
};
