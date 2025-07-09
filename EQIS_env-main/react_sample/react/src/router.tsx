/*
 * 페이지 이동이 이루어 질 Router 등록
 */

import * as React from 'react';

import { Route, Routes, Navigate } from 'react-router-dom';

import LoadingModal from '@/components/organisms/modal/loadingModal';
import TopNavPage from '@/components/templates/nav/topNavPage';

import { reactLazy } from '@/utils/lazy/reactLazy';

/**
 * Code Spliting
 */
const Home = reactLazy(() => import(/* webpackChunkName: 'home' */ '@/pages/home'));
const NotFound = reactLazy(() => import(/* webpackChunkName: 'notfound' */ '@/pages/notFound'));
const Logout = reactLazy(() => import(/* webpackChunkName: 'logout' */ '@/pages/logout'));
//const Candy = reactLazy(() => import(/* webpackChunkName: 'logout' */ '@/pages/candy'));

/**
 * Standard
 */
const StandardCommonCode = reactLazy(
    () => import(/* webpackChunkName: 'standardCommonCode' */ '@/pages/standard/commonCode'),
);
const StandardLang = reactLazy(() => import(/* webpackChunkName: 'standardLang' */ '@/pages/standard/lang'));
const StandardNotice = reactLazy(() => import(/* webpackChunkName: 'standardLang' */ '@/pages/standard/notice/list'));

/**
 * componentCollection
 */
const ComponentCollection = reactLazy(
    () => import(/* webpackChunkName: 'standardLang' */ '@/pages/standard/componentCollection/list'),
);

// Router 등록
const Router = (props: { isOpen: boolean }) => {
    /**
     * useState
     */
    const [allOpen, setAllOpen] = React.useState<boolean | undefined>(undefined);

    React.useEffect(() => {
        // allOpen 여부 확인
        const allOpenHostnameList = ['localhost'];
        if (allOpenHostnameList.includes(location.hostname)) {
            setAllOpen(true);
        } else {
            setAllOpen(false);
        }
    }, []);

    return (
        <React.Suspense fallback={<LoadingModal visible />}>
            {typeof allOpen === 'boolean' && (
                <Routes>
                    {props.isOpen && (
                        <>
                            {/* 로그인 정보 (프로젝트 종료 후 삭제) */}
                            {/* {['localhost'].includes(location.hostname) && <Route path="/peanut" element={<Candy />} />} */}
                            {/* 기본 도메인 */}
                            <Route index element={<Navigate to="/home" />} />
                            <Route path="/logout" element={<Logout />} />
                            {allOpen && ManageRouter()}
                        </>
                    )}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            )}
        </React.Suspense>
    );
};

export default Router;

const ManageRouter = () => {
    return (
        <Route element={<TopNavPage />}>
            <Route path="/home" element={<Home />} /> {/** 홈 (공지 or 처리 업무 조회) */}
            {StandardRouter()} {/** 기준정보 */}
        </Route>
    );
};

const StandardRouter = () => {
    return (
        <Route path="/standard">
            <Route path="commoncode" element={<StandardCommonCode />} /> {/** 공통코드 */}
            <Route path="lang" element={<StandardLang />} /> {/** 다국어 */}
            <Route path="notice" element={<StandardNotice />} /> {/** 공지사항 */}
            <Route path="componentCollection" element={<ComponentCollection />} /> {/** 컴포넌트모음 */}
        </Route>
    );
};
