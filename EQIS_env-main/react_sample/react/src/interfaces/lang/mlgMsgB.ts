import { cloneDeep } from 'lodash';

import { baseInit, Ibase } from '../common/base';

export interface ImlgMsgB extends Ibase {
    mlgCd: string;
    langCd: string;
    mlgSbc: string;
    useYn: string;
}

export const mlgMsgBInit = () => {
    const mlgMsgB: ImlgMsgB = {
        mlgCd: '',
        langCd: '',
        mlgSbc: '',
        useYn: '',
        ...baseInit(),
    };

    return cloneDeep(mlgMsgB);
};
