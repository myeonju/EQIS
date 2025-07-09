import { cloneDeep } from 'lodash';

export interface InoticeModal {
    pwiImtrNo: number;
    titlNm: string;
    vbgRgstTismp: string;
}

export const noticeModalInit = () => {
    const noticeModal: InoticeModal = {
        pwiImtrNo: 0,
        titlNm: '',
        vbgRgstTismp: '',
    };

    return cloneDeep(noticeModal);
};
