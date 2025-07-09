import { cloneDeep } from 'lodash';

export interface Imap {
    [key: string]: object;
}

export interface IexcelRegister {
    headerNameList: string[];
    mapList: Imap[];
}

export const excelRegisterInit = () => {
    const excelRegister: IexcelRegister = {
        headerNameList: [],
        mapList: [],
    };

    return cloneDeep(excelRegister);
};
