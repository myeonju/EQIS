import * as React from 'react';

import { useNavigate } from 'react-router';
import styled, { css } from 'styled-components';

import { _axios } from '@/apis/axios';

import Icon from '@/components/atoms/icon';
import Line from '@/components/atoms/line';
import Text from '@/components/atoms/text';
import TodoBox from '@/components/home/footer/todoBox';
import NoticeInformationModal from '@/components/home/noticeInformationModal';
import NoticeListInformationModal from '@/components/home/noticeListInformationModal';

import { InoticeHome } from '@/interfaces/notice/noticeHome';
import { IpwiImtrB, pwiImtrBInit } from '@/interfaces/notice/pwiImtrB';
import { departmentTodoListSearchInit, IdepartmentTodoListSearch } from '@/interfaces/todo/departmentTodoListSearch';
import { personalTodoListSearchInit, IpersonalTodoListSearch } from '@/interfaces/todo/personalTodoListSearch';

import _useModal from '@/modules/customHook/useModal';
import { _recoilEmployee } from '@/modules/recoil/employee';
import { _recoilLang } from '@/modules/recoil/lang';

import { NOTICE } from '@/utils/constant';
import { toDotYYYYMMDD, toYYYYMMDD, toYYYYMMDDHHmmss } from '@/utils/dateformat';
import { getImage } from '@/utils/image';

const Index = () => {
    /**
     * recoil
     */
    const recoilLang = _recoilLang();
    const recoilEmployee = _recoilEmployee();

    /**
     * axios
     */
    const axios = _axios();

    /**
     * customHook
     */
    const useModal = _useModal();

    /**
     * navigate
     */
    const navigate = useNavigate();

    /**
     * useState
     */
    const [departmentTodoTotalCount, setDepartmentTodoTotalCount] = React.useState<number>(0);
    const [personalTodoTotalCount, setPersonalTodoTotalCount] = React.useState(0);
    const [selectedPwiImtrNo, setSelectedPwiImtrNo] = React.useState<number>(0);
    const [noticeHomeList, setNoticeHomeList] = React.useState<InoticeHome[]>([]);
    const [pwiImtrB, setPwiImtrB] = React.useState<IpwiImtrB>(pwiImtrBInit());

    /**
     * api
     */
    const api = {
        // 부서할일 조회
        departmentTodoListSearch: async () => {
            const departmentTodoListSearch: IdepartmentTodoListSearch = {
                ...departmentTodoListSearchInit(),
                trtmStCd: 'N',
                page: 1, // page 1이상 값 필요해서 추가
                limit: 1, // limit 1이상 값 필요해서 추가
            };

            const res = await axios.post('/todo/department/listGrid_search.do', departmentTodoListSearch);

            if (res.data) {
                setDepartmentTodoTotalCount(res.data.data.totalCount);
            }
        },

        // 개인할일 조회
        personalTodoListSearch: async () => {
            const personalTodoListSearch: IpersonalTodoListSearch = {
                ...personalTodoListSearchInit(),
                trtmStCd: 'N',
                page: 1,
                limit: 1,
            };

            const res = await axios.post('/todo/personal/listGrid_search.do', personalTodoListSearch);

            if (res.data) {
                setPersonalTodoTotalCount(res.data.data.totalCount);
            }
        },

        // 공지사항 조회
        homeListSearch: async () => {
            const res = await axios.get('/notice/homeList_search.do', {
                params: {
                    limit: 5,
                },
            });

            if (res.data) {
                setNoticeHomeList(res.data.data);
            }
        },

        // 로그인 공지 상세 조회
        loginDetailSearch: async () => {
            if (
                localStorage.getItem(NOTICE.LOGIN_NOTICE_SHOW) === 'Y' &&
                localStorage.getItem(NOTICE.TODAY_NOTICE_SHOW) !== toYYYYMMDD(new Date())
            ) {
                const res = await axios.get('/notice/loginDetail_search.do');

                if (res.data) {
                    const pwiImtrB: IpwiImtrB = res.data.data;

                    if (pwiImtrB) {
                        setPwiImtrB(pwiImtrB);
                    }

                    localStorage.setItem(NOTICE.LOGIN_NOTICE_SHOW, 'N');
                }
            }
        },
    };

    /**
     * event handler
     */
    const handle = {
        clickAdd: () => {
            handle.toggleNoticeListInformationModal();
        },

        clickNotice: (pwiImtrNo: number) => {
            setSelectedPwiImtrNo(pwiImtrNo);
            handle.toggleNoticeInformationModal();
        },

        moveToDepartmentTodo: () => {
            navigate('/todo/department');
        },

        moveTopersionalTodo: () => {
            navigate('/todo/personal');
        },

        toggleNoticeInformationModal: () => {
            useModal.toggle('toggleNoticeInformationModal');
        },

        toggleNoticeListInformationModal: () => {
            useModal.toggle('toggleNoticeListInformationModal');
        },
    };

    React.useEffect(() => {
        // 다국어
        const langCodeList: string[] = [];
        recoilLang.langInit(langCodeList);
    }, []);

    React.useEffect(() => {
        if (recoilEmployee.isLogin()) {
            // 부서할일 조회
            api.departmentTodoListSearch();

            // 개인할일 조회
            api.personalTodoListSearch();

            // 공지사항 조회
            api.homeListSearch();
        }
    }, [recoilEmployee.isLogin()]);

    React.useEffect(() => {
        if (recoilEmployee.isLogin()) {
            // 로그인 공지사항 오픈
            api.loginDetailSearch();
        }
    }, [recoilEmployee.isLogin(), localStorage.getItem(NOTICE.LOGIN_NOTICE_SHOW)]);

    return (
        <Wrapper>
            <Container>
                <Notice.Container>
                    <Notice.Header>
                        <Text size="medium" color="black" weight="bold">
                            공지사항
                        </Text>

                        <Icon
                            width="32px"
                            height="32px"
                            src={getImage('BTN-MORE-ON')}
                            pointer
                            onClick={handle.clickAdd}
                        />
                    </Notice.Header>

                    <Line color="brown200" width={86} height={5} />
                    <Line color="gray400" height={1} />

                    <Notice.List>
                        {noticeHomeList.map((noticeHome) => (
                            <Notice.ListItem
                                key={noticeHome.pwiImtrNo}
                                onClick={() => handle.clickNotice(noticeHome.pwiImtrNo)}
                            >
                                <Text size="xsmall" color="darkGray100" overflow="ellipsis">
                                    {noticeHome.titlNm}
                                </Text>

                                <Text size="xsmall" weight="medium" color="gray600">
                                    {toDotYYYYMMDD(noticeHome.vbgRgstTismp, recoilLang.langCd)}
                                </Text>
                            </Notice.ListItem>
                        ))}
                    </Notice.List>
                </Notice.Container>

                <Work.Container>
                    <Work.Header>
                        <Text size="medium" weight="bold" color="black">
                            처리할 업무
                        </Text>
                    </Work.Header>

                    <Work.List>
                        <TodoBox
                            hoverOnIcon={getImage('INBOX-ON')}
                            hoverOffIcon={getImage('INBOX-OFF')}
                            text="부서 수신함"
                            count={departmentTodoTotalCount}
                            onClickWrapper={handle.moveToDepartmentTodo}
                        />

                        <TodoBox
                            hoverOnIcon={getImage('MAIL-ON')}
                            hoverOffIcon={getImage('MAIL-OFF')}
                            text="개인 수신함"
                            count={personalTodoTotalCount}
                            onClickWrapper={handle.moveTopersionalTodo}
                        />
                    </Work.List>
                </Work.Container>
            </Container>

            <TextSection>
                <Text color="gray600" size="2xsmall">
                    최근 로그인 시간 {toYYYYMMDDHHmmss(recoilEmployee.eeB.lastLoginDate)}
                </Text>
            </TextSection>

            {/* 공지사항모달 */}
            <NoticeInformationModal
                visible={useModal.isShown['toggleNoticeInformationModal']}
                selectedPwiImtrNo={selectedPwiImtrNo}
                pwiImtrB={pwiImtrB}
                onClose={handle.toggleNoticeInformationModal}
            />

            {/* 공지사항목록모달 */}
            <NoticeListInformationModal
                visible={useModal.isShown['toggleNoticeListInformationModal']}
                onClose={handle.toggleNoticeListInformationModal}
            />
        </Wrapper>
    );
};

export default Index;

const Wrapper = styled.div`
    width: 1200px;
    height: 100%;

    margin: 0 auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
`;

const Container = styled.div`
    width: 100%;

    border-radius: 8px;

    display: grid;
    grid-template-columns: 6fr 4fr;

    ${(props) => css`
        border: 1px solid ${props.theme.color.gray200};
        background-color: ${props.theme.color.white};
        box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.1);
    `}
`;

const Notice = {
    Container: styled.div`
        width: 678px;

        padding: 38px 40px;

        ${(props) => css`
            border-radius: 2px solid ${props.theme.color.gray200};
        `}
    `,

    Header: styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding-bottom: 10px;
    `,

    List: styled.div`
        display: flex;
        flex-direction: column;

        margin: 22px 0px 0px 0px;

        gap: 12px;
    `,

    ListItem: styled.li`
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;

        width: 100%;

        cursor: pointer;

        line-height: 20px;
    `,
};

const Work = {
    Container: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        padding: 38px 40px;
    `,

    Header: styled.div`
        display: inline-block;

        padding-bottom: 10px;
    `,

    List: styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 30px;

        height: 100%;
    `,
};

const TextSection = styled.section`
    display: flex;
    justify-content: flex-end;
`;
