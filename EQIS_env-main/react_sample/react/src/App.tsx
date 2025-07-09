import * as React from 'react';

import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import { useLocation, useNavigate } from 'react-router';

import { _axios } from '@/apis/axios';

import SnackBar from '@/components/molecules/snackBar';
import LoadingModal from '@/components/organisms/modal/loadingModal';

import { IloginResult } from '@/interfaces/login/loginResult';

import _useLogin from '@/modules/customHook/useLogin';
import { _recoilAuth } from '@/modules/recoil/auth';
import { _recoilLang } from '@/modules/recoil/lang';
import { _recoilLoading } from '@/modules/recoil/loading';

import Router from '@/router';

import 'dayjs/locale/ko';

/**
 * dayjs 설정
 */
dayjs.extend(isLeapYear);

const App = () => {
    // token로그인 제외 url
    const exceptTokenLoginList = [
        '/login/sso',
        '/login/mobileAutoway',
        '/autopass/login',
        '/notFound',
        '/logout',
        '/robots.tst',
        '/peanut',
        '/candy',
    ];

    // 메뉴권한조회 제외 url
    const exceptMenuAuthSearchList = [
        '/login/sso',
        '/login/mobileAutoway',
        '/autopass/login',
        '/notFound',
        '/logout',
        '/robots.tst',
        '/peanut',
        '/candy',
    ];

    /**
     * axios
     */
    const axios = _axios();

    /**
     * useLocation
     */
    const location = useLocation();

    /**
     * useNavigate
     */
    const navigate = useNavigate();

    /**
     * recoil
     */
    const recoilLoading = _recoilLoading();
    const recoilLang = _recoilLang();
    const recoilAuth = _recoilAuth();

    /**
     * customHook
     */
    const useLogin = _useLogin();

    /**
     * useEffect
     */
    React.useEffect(() => {
        // token 로그인제외페이지 확인
        let include = false;

        exceptTokenLoginList.some((exceptTokenLogin) => {
            if (location.pathname.includes(exceptTokenLogin)) {
                include = true;
                return true;
            }
        });

        if (!include) {
            //tokenLogin();
        }
    }, []);

    React.useEffect(() => {
        const pathname = location.pathname;

        if (pathname && pathname !== '/') {
            // 메뉴조회 제외 페이지 확인
            let include = false;

            exceptMenuAuthSearchList.some((exceptMenuAuthSearch) => {
                if (location.pathname.includes(exceptMenuAuthSearch)) {
                    include = true;
                    return true;
                }
            });

            if (!include) {
                //menuAuthSearch(location.pathname);
            }
        }

        // 페이지 이동 시 overflow 초기화
        document.body.style.cssText = `
            overflow:none;
        `;
    }, [location.pathname]);

    React.useEffect(() => {
        if (recoilLang.langCd === 'EN') {
            dayjs.locale('en');
        } else {
            dayjs.locale('ko');
        }
    }, [recoilLang.langCd]);

    /**
     * token login
     */
    const tokenLogin = async () => {
        try {
            const res = await axios.post('/login/token_login.do');

            if (res.data) {
                const loginResult: IloginResult = res.data.data;
                useLogin.tokenLoginAfter(loginResult);
            } else {
                localStorage.removeItem(process.env.JWT_TOKENNAME);
                navigate('/notFound');
            }
        } catch (error) {
            localStorage.removeItem(process.env.JWT_TOKENNAME);
            navigate('/notFound');
        }
    };

    /**
     * 메뉴 권한 조회 (url에 접속가능한지 확인)
     */
    const menuAuthSearch = async (pathName: string) => {
        try {
            const res = await axios.get('/menu/menuAuth_search.do', {
                params: {
                    pathId: pathName,
                },
            });

            if (res.data) {
                const processIdList: string[] = res.data.data;

                if (processIdList && processIdList.length > 0) {
                    recoilAuth.save(processIdList);
                } else {
                    navigate('/notFound');
                }
            } else {
                navigate('/notFound');
            }
        } catch (e) {
            // 에러날 경우 notFound 이동 필요
            navigate('/notFound');
        }
    };

    /**
     * logout
     */
    const logout = async () => {
        try {
            await axios.post('/login/logout/do');
        } catch (error) {
            // logout은 error나도 무시
        }

        localStorage.removeItem(process.env.JWT_TOKENNAME);
    };

    React.useEffect(() => {
        getIp();
    }, []);

    const getIp = async () => {
        const gapSecond = dayjs(new Date()).diff(dayjs('2022-12-16 13:00:00'), 'second');
        if (gapSecond >= 0) {
            setIpOpen(true);
        } else {
            const ipList = ['127.0.0.1'];

            const res = await axios.get('commonCode/ip_search.do');
            if (res.data) {
                const ip = res.data.data;
                setIpOpen(ipList.includes(ip));
            }
        }
    };

    const [isOpen, setIpOpen] = React.useState<boolean>(false);

    return (
        <>
            <SnackBar />
            <LoadingModal visible={recoilLoading.open} />
            <Router isOpen={isOpen} />
        </>
    );
};

export default App;
