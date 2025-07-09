import { _axios } from '@/apis/axios';

import { IexcelRegister, Imap } from '@/interfaces/file/excelRegister';

const _useFile = () => {
    /**
     * axios
     */

    const axios = _axios();

    return {
        fileDownloadLink: (encAttcFilNo: string, encAttcFilSeq: string) => {
            // localhost를 구분하는것에 있어서 더 좋은 방안 생각 필요
            if (location.hostname === 'localhost') {
                return `http://localhost:8000/file/download.do?encAttcFilNo=${encAttcFilNo}&encAttcFilSeq=${encAttcFilSeq}`;
            } else {
                return `/file/download.do?encAttcFilNo=${encAttcFilNo}&encAttcFilSeq=${encAttcFilSeq}`;
            }
        },

        excelDownload: async (headerNameList: string[], fieldList: string[], dataList: any[]) => {
            // field에 맞게 필터
            const mapList: Imap[] = [];
            dataList.forEach((data) => {
                const map = fieldList.reduce((prev, field) => {
                    return {
                        ...prev,
                        [field]: data[field] ?? '',
                    };
                }, {});

                mapList.push(map);
            });

            const excelRegister: IexcelRegister = {
                headerNameList,
                mapList,
            };

            // 엑셀 등록
            const res = await axios.post('/file/excel_register.do', excelRegister);
            if (res.data) {
                const encFilePathAdr = res.data.data;

                if (location.hostname === 'localhost') {
                    return `http://localhost:8000/file/path_download.do?encFilePathAdr=${encFilePathAdr}&deleteYn=Y`;
                } else {
                    return `/file/download.do?encFilePathAdr=${encFilePathAdr}&deleteY`;
                }
            }
        },
    };
};

export default _useFile;
