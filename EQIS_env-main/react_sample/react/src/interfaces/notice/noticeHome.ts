import { cloneDeep } from 'lodash';

export interface InoticeHome {
    pwiImtrNo: number;
    titlNm: string;
    vbgRgstTismp: string;
}

export const noticeHomeInit = () => {
    const noticeHome: InoticeHome = {
        pwiImtrNo: 0,
        titlNm: '',
        vbgRgstTismp: '',
    };

    return cloneDeep(noticeHome);
};
