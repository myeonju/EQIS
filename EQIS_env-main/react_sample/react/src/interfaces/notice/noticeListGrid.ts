export interface InoticeListGrid {
    pwiImtrNo: number;
    titlNm: string;
    pwiImtrSbc: string;
    pwiNm: string;
    supiFxgNm: string;
    popuNm: string;
    popuStrDtm: string;
    popuFnhDtm: string;
}

export const noticeListGridInit = () => {
    const noticeListGrid: InoticeListGrid = {
        pwiImtrNo: 0,
        titlNm: '',
        pwiImtrSbc: '',
        pwiNm: '',
        supiFxgNm: '',
        popuNm: '',
        popuStrDtm: '',
        popuFnhDtm: '',
    };

    return noticeListGrid;
};
