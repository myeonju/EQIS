import * as React from 'react';

import styled, { css } from 'styled-components';

import { _axios } from '@/apis/axios';

import Text from '@/components/atoms/text';
import Title from '@/components/atoms/title';
import Checkbox from '@/components/molecules/checkbox';
import InformationModal from '@/components/organisms/modal/informationModal';

import { IpwiImtrB, pwiImtrBInit } from '@/interfaces/notice/pwiImtrB';

import { _recoilLang } from '@/modules/recoil/lang';

import { NOTICE } from '@/utils/constant';
import { toYYYYMMDD } from '@/utils/dateformat';

interface Iprops {
    visible: boolean;
    selectedPwiImtrNo: number;
    pwiImtrB?: IpwiImtrB;
    onClose: () => void;
}

const NoticeInformationModal = (props: Iprops) => {
    /**
     * recoil
     */
    const recoilLang = _recoilLang();

    /**
     * axios
     */
    const axios = _axios();

    /**
     * useState
     */
    const [pwiImtrB, setPwiImtrB] = React.useState<IpwiImtrB>(pwiImtrBInit());

    /**
     * useEffect
     */
    React.useEffect(() => {
        // 다국어
        const langCodeList: string[] = [];
        recoilLang.langInit(langCodeList);
    }, []);

    React.useEffect(() => {
        if (props.selectedPwiImtrNo > 0) {
            // 번호를 이용해서 상세 조회
            api.detailSearch(props.selectedPwiImtrNo);
        } else {
            // 로그인 공지로 보여주기
            if (props.pwiImtrB) {
                setPwiImtrB(props.pwiImtrB);
            }
        }
    }, [props.selectedPwiImtrNo, props.pwiImtrB]);

    /**
     * api
     */
    const api = {
        detailSearch: async (pwiImtrNo: number) => {
            const res = await axios.get('/notice/detail_search.do', {
                params: {
                    pwiImtrNo,
                },
            });

            if (res.data) {
                setPwiImtrB(res.data.data);
            }
        },
    };

    /**
     * handle
     */
    const handle = {
        onChangeTodayNotShow: (e: React.ChangeEvent<HTMLInputElement>) => {
            const checked = e.target.checked;

            if (checked) {
                localStorage.setItem(NOTICE.TODAY_NOTICE_SHOW, toYYYYMMDD(new Date()));
                props.onClose();
            }
        },
    };

    return (
        <>
            {/* 공지사항 */}
            <InformationModal visible={props.visible} title="공지사항" onClose={props.onClose}>
                <Header>
                    <Text size="small" color="gray500" weight="bold">
                        {toYYYYMMDD(pwiImtrB.vbgRgstTismp as string)}
                    </Text>

                    <Title size="xlarge" color="darkGray100" weight="bold">
                        {pwiImtrB.titlNm}
                    </Title>
                </Header>

                <Body>
                    <pre>{pwiImtrB.pwiImtrSbc}</pre>
                </Body>

                {localStorage.getItem(NOTICE.TODAY_NOTICE_SHOW) !== toYYYYMMDD(new Date()) && (
                    <Footer>
                        {/* 오늘 하루 보지 않기 */}
                        <Checkbox label="오늘 하루 보지 않기" onChange={handle.onChangeTodayNotShow} />
                    </Footer>
                )}
            </InformationModal>
        </>
    );
};

export default NoticeInformationModal;

const Header = styled.header``;

const Body = styled.div`
    height: 506px;

    padding: 20px;

    overflow: auto;

    ${(props) => css`
        border: 1px solid ${props.theme.color.gray500};
        color: ${props.theme.color.darkGray100};
    `}
`;

const Footer = styled.footer`
    display: flex;
    justify-content: flex-end;
`;
