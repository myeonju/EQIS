import { useRecoilState } from 'recoil';

import { _axios } from '@/apis/axios';

import { IlangCd } from '@/interfaces/lang/langCd';
import { ImlgMsgB } from '@/interfaces/lang/mlgMsgB';

import { _langCd, _translationKO, _translationEN } from './atom';

export const _recoilLang = () => {
    /**
     * axios
     */
    const axios = _axios();

    /**
     * useRecoilState
     */
    const [langCd, setLangCd] = useRecoilState<IlangCd>(_langCd);
    const [translateKO, setTranslateKO] = useRecoilState<Map<string, string>>(_translationKO);
    const [translateEN, setTranslateEN] = useRecoilState<Map<string, string>>(_translationEN);

    return {
        langCd,
        translateKO,
        translateEN,

        /**
         * 언어 변경
         */
        changeLangCd: (langCd: IlangCd, notReload?: boolean) => {
            localStorage.setItem(process.env.LANG_CD, langCd);
            if (notReload) {
                setLangCd(langCd);
            } else {
                window.location.reload(); // 새로고침
            }
        },

        /**
         * 언어코드 초기화
         */
        langInit: async (langCodeList: string[]) => {
            const mlgCdList: string[] = [];
            langCodeList.forEach((langCode) => {
                switch (langCd) {
                    case 'KO':
                        if (!translateKO.has(langCode)) {
                            mlgCdList.push(langCode);
                        }

                        break;

                    case 'EN':
                        if (!translateEN.has(langCode)) {
                            mlgCdList.push(langCode);
                        }

                        break;
                }
            });

            if (mlgCdList.length > 0) {
                const res = await axios.post('/lang/mappingCodeList_search.do', mlgCdList);
                if (res.data) {
                    const mlgMsgBList: ImlgMsgB[] = res.data.data;
                    switch (langCd) {
                        case 'KO':
                            setTranslateKO((prev) => {
                                const translateKO = new Map(prev);

                                mlgMsgBList.forEach((mlgMsgB) => {
                                    if (mlgMsgB.langCd === 'KO') {
                                        translateKO.set(mlgMsgB.mlgCd, mlgMsgB.mlgSbc);
                                    }
                                });

                                return translateKO;
                            });

                            break;

                        case 'EN':
                            setTranslateEN((prev) => {
                                const translateEN = new Map(prev);

                                mlgMsgBList.forEach((mlgMsgB) => {
                                    if (mlgMsgB.langCd === 'EN') {
                                        translateEN.set(mlgMsgB.mlgCd, mlgMsgB.mlgSbc);
                                    }
                                });

                                return translateEN;
                            });

                            break;
                    }
                }
            }
        },

        /**
         * 코드 번역값 조회
         */
        translate: (code: string) => {
            switch (langCd) {
                case 'KO':
                    return translateKO.get(code);

                case 'EN':
                    return translateEN.get(code);
            }
        },
    };
};
