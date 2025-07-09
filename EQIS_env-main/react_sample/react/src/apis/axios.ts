/**
 * axios 설정 파일
 */

import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router';

import { _recoilLoading } from '@/modules/recoil/loading';
import { _recoilSnackBar } from '@/modules/recoil/snackBar';

export const _axios = () => {
    /**
     * navigate
     */
    const navigate = useNavigate();

    /**
     * recoil
     */
    const recoilLoading = _recoilLoading();
    const recoilSnackBar = _recoilSnackBar();

    // axios 기본 설정
    const instance = axios.create({
        baseURL: '/',
    });

    // queryParam 설정
    instance.defaults.paramsSerializer = (params) => qs.stringify(params);

    // axios interceptor 설정
    instance.interceptors.request.use(
        (request) => {
            // token 헤더에 담아서 전달
            request.headers = {
                [process.env.JWT_TOKENNAME]: localStorage.getItem(process.env.JWT_TOKENNAME) as string,
                [process.env.LANG_CD]: localStorage.getItem(process.env.LANG_CD) ?? '',
            };

            // loading on
            recoilLoading.setLoading(true);

            // return
            return request;
        },
        (error) => {
            // loading off
            recoilLoading.setLoading(false);

            // return
            return Promise.reject(error);
        },
    );

    instance.interceptors.response.use(
        (response) => {
            // token 헤더에 담아서 전달받으면 브라우저 저장소에 저장
            if (response.headers[process.env.JWT_TOKENNAME]) {
                localStorage.setItem(process.env.JWT_TOKENNAME, response.headers[process.env.JWT_TOKENNAME]);
            }

            // loading off
            recoilLoading.setLoading(false);

            // 메시지 전달받았을 경우 snackbar on
            if (response && response.data && response.data.message) {
                recoilSnackBar.alert('SUCCESS', response.data.message);
            }

            // return
            return response;
        },
        (error) => {
            // loading off
            recoilLoading.setLoading(false);

            // 메시지 전달받았을 경우 snackbar on
            const res = (error as any).response;
            if (res && res.data && res.data.message) {
                recoilSnackBar.alert('FAIL', res.data.message);
            }

            // 권한 없는 error일 경우 notFound로 이동
            if (res.statusText === 'Unauthorized') {
                navigate('/notFound');
            }

            // return
            return Promise.reject(error);
        },
    );

    return instance;
};
