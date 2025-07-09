import { cloneDeep } from 'lodash';

import { baseInit, Ibase } from '@/interfaces/common/base';

export interface IattcFilB extends Ibase {
    // 첨부파일 DB
    attcFilNo: string;
    attcFilSeq: number;
    attcFilOgcNm: string;
    attcFilMgn: number;
    attcFilExtnNm: string;
    useYn: string;

    //Etc
    encAttcFilNo: string;
    encAttcFilSeq: string;
}

export const attcFilBInit = () => {
    const attcFilB: IattcFilB = {
        // 첨부파일 DB
        attcFilNo: '',
        attcFilSeq: 0,
        attcFilOgcNm: '',
        attcFilMgn: 0,
        attcFilExtnNm: '',
        useYn: '',
        ...baseInit(),

        //Etc
        encAttcFilNo: '',
        encAttcFilSeq: '',
    };
    return cloneDeep(attcFilB);
};
