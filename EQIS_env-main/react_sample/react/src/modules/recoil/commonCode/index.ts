import { useRecoilState } from 'recoil';

import { _axios } from '@/apis/axios';

import { IlangComCdP } from '@/interfaces/commonCode/langComCdP';

import { _recoilLang } from '@/modules/recoil/lang';

import { _conversionKO, _conversionEN } from './atom';

export const _recoilCommonCode = () => {
    /**
     * axios
     */
    const axios = _axios();

    /**
     * useRecoilState
     */
    const [conversionKO, setConversionKO] = useRecoilState<Map<string, IlangComCdP[]>>(_conversionKO);
    const [conversionEN, setConversionEN] = useRecoilState<Map<string, IlangComCdP[]>>(_conversionEN);

    /**
     * recoil
     */
    const recoilLang = _recoilLang();

    return {
        conversionKO,
        conversionEN,

        /**
         * 공통코드 초기화
         */
        commonCodeInit: async (commonCodeList: string[]) => {
            const comCdGrpCdList: string[] = [];
            commonCodeList.forEach((code) => {
                switch (recoilLang.langCd) {
                    case 'KO':
                        if (!conversionKO.has(code)) {
                            comCdGrpCdList.push(code);
                        }
                        break;

                    case 'EN':
                        if (!conversionEN.has(code)) {
                            comCdGrpCdList.push(code);
                        }
                        break;
                }
            });

            if (comCdGrpCdList.length > 0) {
                const res = await axios.post('/commonCode/mappingCodeList_search.do', comCdGrpCdList);

                const langComCdPList: IlangComCdP[] = res.data.data;

                switch (recoilLang.langCd) {
                    case 'KO':
                        setConversionKO((prev) => {
                            const conversionKO = new Map(prev);

                            langComCdPList.forEach((langComCdP) => {
                                if (langComCdP.langCd === 'KO') {
                                    if (conversionKO.has(langComCdP.comCdGrpCd)) {
                                        conversionKO.set(langComCdP.comCdGrpCd, [
                                            ...(conversionKO.get(langComCdP.comCdGrpCd) as IlangComCdP[]),
                                            langComCdP,
                                        ]);
                                    } else {
                                        conversionKO.set(langComCdP.comCdGrpCd, [langComCdP]);
                                    }
                                }
                            });
                            return conversionKO;
                        });
                        break;
                    case 'EN':
                        setConversionEN((prev) => {
                            const conversionEN = new Map(prev);

                            langComCdPList.forEach((langComCdP) => {
                                if (langComCdP.langCd === 'EN') {
                                    if (conversionEN.has(langComCdP.comCdGrpCd)) {
                                        conversionEN.set(langComCdP.comCdGrpCd, [
                                            ...(conversionEN.get(langComCdP.comCdGrpCd) as IlangComCdP[]),
                                            langComCdP,
                                        ]);
                                    } else {
                                        conversionEN.set(langComCdP.comCdGrpCd, [langComCdP]);
                                    }
                                }
                            });
                            return conversionEN;
                        });
                        break;
                }
            }
        },

        /**
         * 공통코드 리스트 조회
         */
        conversionList: (comCdGrpCd: string) => {
            switch (recoilLang.langCd) {
                case 'KO':
                    return conversionKO.get(comCdGrpCd);

                case 'EN':
                    return conversionEN.get(comCdGrpCd);
            }
        },

        /**
         * 공통코드 조회
         */
        conversion: (comCdGrpCd: string, comCd: string) => {
            switch (recoilLang.langCd) {
                case 'KO':
                    return conversionKO.get(comCdGrpCd)?.find((langComCdP) => langComCdP.comCd === comCd)?.langComCdNm;
                case 'EN':
                    return conversionEN.get(comCdGrpCd)?.find((langComCdP) => langComCdP.comCd === comCd)?.langComCdNm;
            }
        },
    };
};
