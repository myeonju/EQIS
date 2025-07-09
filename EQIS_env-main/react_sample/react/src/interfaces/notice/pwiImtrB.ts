import { baseInit, Ibase } from '../common/base';

export interface IpwiImtrB extends Ibase {
    pwiImtrNo: number;
    titlNm: string;
    pwiImtrSbc: string;
    pwiYn: string;
    supiFxgYn: string;
    popuYn: string;
    popuStrDtm: string;
    popuFnhDtm: string;
    useYn: string;
}

export const pwiImtrBInit = () => {
    const pwiImtrB: IpwiImtrB = {
        pwiImtrNo: 0,
        titlNm: '',
        pwiImtrSbc: '',
        pwiYn: '',
        supiFxgYn: '',
        popuYn: '',
        popuStrDtm: '',
        popuFnhDtm: '',
        useYn: '',
        ...baseInit(),
    };

    return pwiImtrB;
};
