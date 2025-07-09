import * as React from 'react';

import styled, { css } from 'styled-components';

import { _axios } from '@/apis/axios';

import Line from '@/components/atoms/line';
import Text from '@/components/atoms/text';
import NoticeInformationModal from '@/components/home/noticeInformationModal';
import { Pagination, PaginationChageEvent } from '@/components/molecules/pagination';
import InformationModal from '@/components/organisms/modal/informationModal';

import { InoticeModal } from '@/interfaces/notice/noticeModal';
import { InoticeModalSearch, noticeModalSearchInit } from '@/interfaces/notice/noticeModalSearch';

import _useModal from '@/modules/customHook/useModal';
import { _recoilLang } from '@/modules/recoil/lang';

import { toDotYYYYMMDD } from '@/utils/dateformat';

interface Iprops {
    visible: boolean;
    onClose: () => void;
}

const NoticeListInformationModal = (props: Iprops) => {
    /**
     * recoil
     */
    const recoilLang = _recoilLang();

    /**
     * axios
     */
    const axios = _axios();

    /**
     * customHook
     */
    const useModal = _useModal();

    /**
     * useState
     */
    const [noticeModalSearch, setNoticeModalSearch] = React.useState<InoticeModalSearch>(noticeModalSearchInit());
    const [noticeModalList, setNoticeModalList] = React.useState<InoticeModal[]>([]);
    const [totalCount, setTotalCount] = React.useState<number>(0);
    const [selectedPwiImtrNo, setSelectedPwiImtrNo] = React.useState<number>(0);

    /**
     * useEffect
     */
    React.useEffect(() => {
        // 다국어
        const langCodeList: string[] = [];
        recoilLang.langInit(langCodeList);
    }, []);

    React.useEffect(() => {
        if ((noticeModalSearch.page as number) > 0 && (noticeModalSearch.limit as number) > 0) {
            console.log(1);
        }
    }, [noticeModalSearch]);

    /**
     * api
     */
    const api = {
        modalListSearch: async () => {
            const res = await axios.get('/notice/modalList_search.do', {
                params: {
                    ...noticeModalSearch,
                },
            });

            if (res.data) {
                setNoticeModalList(res.data.data.data);
                setTotalCount(res.data.data.totalCount);
            }
        },
    };

    /**
     * handle
     */
    const handle = {
        changePagination: (data: PaginationChageEvent) => {
            setNoticeModalSearch((prev) => {
                return {
                    ...prev,
                    page: data.page,
                    limit: data.limitCount,
                };
            });
        },

        clickNotice: (pwiImtrNo: number) => {
            setSelectedPwiImtrNo(pwiImtrNo);
            handle.toggleNoticeInformationModal();
        },

        toggleNoticeInformationModal: () => {
            useModal.toggle('toggleNoticeInformationModal');
        },
    };

    return (
        <>
            {/* 공지사항 목록 */}
            <InformationModal visible={props.visible} title="공지사항 목록" onClose={props.onClose}>
                <Wrapper>
                    <NoticeList>
                        {noticeModalList.map((noticeModal) => (
                            <Container key={noticeModal.pwiImtrNo}>
                                <TextList onClick={() => handle.clickNotice(noticeModal.pwiImtrNo)}>
                                    <Text size="medium" color="darkGray100" weight="bold" overflow="ellipsis">
                                        {noticeModal.titlNm}
                                    </Text>

                                    <Text size="small" weight="medium" color="gray600">
                                        {toDotYYYYMMDD(noticeModal.vbgRgstTismp, recoilLang.langCd)}
                                    </Text>
                                </TextList>

                                <Line color="gray400" height={1} />
                            </Container>
                        ))}
                    </NoticeList>

                    <PaginationSection>
                        <Pagination itemCount={totalCount} onChange={handle.changePagination} />
                    </PaginationSection>
                </Wrapper>

                {/* 공지사항모달 */}
                <NoticeInformationModal
                    visible={useModal.isShown['toggleNoticeInformationModal']}
                    selectedPwiImtrNo={selectedPwiImtrNo}
                    onClose={handle.toggleNoticeInformationModal}
                />
            </InformationModal>
        </>
    );
};

export default NoticeListInformationModal;

const Wrapper = styled.div`
    padding-bottom: 78px;
`;

const NoticeList = styled.div`
    display: flex;
    flex-direction: column;
`;

const Container = styled.div``;

const TextList = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    cursor: pointer;

    padding: 14px 0;
`;

const PaginationSection = styled.section`
    padding: 24px 0;
`;
