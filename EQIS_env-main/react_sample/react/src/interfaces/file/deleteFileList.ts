import { cloneDeep } from 'lodash';

export interface IdeleteFileList {
    encAttcFilNo: string;
    encAttcFilSeqList: string[];
}

export const deleteFileListInit = () => {
    const deleteFileList: IdeleteFileList = {
        encAttcFilNo: '',
        encAttcFilSeqList: [],
    };
    return cloneDeep(deleteFileList);
};
