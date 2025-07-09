import { useRecoilState } from 'recoil';

import { IeeB } from '@/interfaces/employee/eeB';
import { IopsGrpP } from '@/interfaces/ops/opsGrpP';

import { _recoilLang } from '../lang';

import { _eeB } from './atom';
import { _opsGrpPList } from './atom';

export const _recoilEmployee = () => {
    /**
     * useRecoilState
     */
    const [eeB, setEeB] = useRecoilState<IeeB>(_eeB);
    const [opsGrpPList, setOpsGrpPList] = useRecoilState<IopsGrpP[]>(_opsGrpPList);

    /**
     * recoil
     */
    const recoilLang = _recoilLang();

    return {
        eeB,
        opsGrpPList,

        /**
         * 사원정보 저장
         */
        saveEeB: (eeB: IeeB) => {
            setEeB(eeB);
        },

        /**
         * 언어별 사원 이름 조회
         */
        getName: () => {
            switch (recoilLang.langCd) {
                case 'KO':
                    return eeB.eeKoNm;

                default:
                    return eeB.eeEnNm;
            }
        },

        /**
         * 이메일 조회
         */
        getEmail: () => {
            const baseEmail = '@AUTOS.HMGC.NET';
            return `${eeB.itgEeno}${baseEmail}`;
        },

        /**
         * 사원 부서그룹 정보 저장
         */
        saveOpsGrpPList: (opsGrpPList: IopsGrpP[]) => {
            setOpsGrpPList(opsGrpPList);
        },

        /**
         * 로그인 여부
         */
        isLogin: () => {
            return !!eeB.itgEeno;
        },
    };
};
