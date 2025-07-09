import { useNavigate } from 'react-router';

import { _axios } from '@/apis/axios';

import { IloginResult } from '@/interfaces/login/loginResult';

import { _recoilEmployee } from '@/modules/recoil/employee';
import { _recoilLang } from '@/modules/recoil/lang';

import { NOTICE } from '@/utils/constant';

const _useLogin = () => {
    /**
     * navigate
     */
    const navigate = useNavigate();

    /**
     * axios
     */
    const axios = _axios();

    /**
     * recoil
     */
    const recoilEmployee = _recoilEmployee();
    const recoilLang = _recoilLang();

    return {
        loginAfter: (loginResult: IloginResult, redirectPage?: string) => {
            if (loginResult) {
                // 데이터 저장
                recoilEmployee.saveEeB(loginResult.eeB);
                recoilEmployee.saveOpsGrpPList(loginResult.opsGrpPList);
                recoilLang.changeLangCd(loginResult.langCd, true);

                // 페이지 이동
                if (redirectPage) {
                    navigate(redirectPage);
                } else {
                    navigate('/');

                    // 로그인 공지 할당
                    localStorage.setItem(NOTICE.LOGIN_NOTICE_SHOW, 'Y');
                }
            } else {
                navigate('/notFound');
            }
        },

        tokenLoginAfter: (loginResult: IloginResult) => {
            // 데이터 저장
            recoilEmployee.saveEeB(loginResult.eeB);
            recoilEmployee.saveOpsGrpPList(loginResult.opsGrpPList);

            // 로그인 공지 할당
            localStorage.setItem(NOTICE.LOGIN_NOTICE_SHOW, 'Y');
        },

        logout: async () => {
            try {
                await axios.post('/login/logout.do');
            } catch (error) {
                // logout은 error나도 무시
            }

            localStorage.removeItem(process.env.JWT_TOKENNAME);
            navigate('/logout');
        },
    };
};

export default _useLogin;
