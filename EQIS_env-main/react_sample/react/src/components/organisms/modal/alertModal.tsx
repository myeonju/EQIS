import * as React from 'react';

import styled, { css } from 'styled-components';

import Button from '@/components/atoms/button';
import BasicModal from '@/components/molecules/modal/basicModal';

import { _recoilLang } from '@/modules/recoil/lang';

import theme from '@/styles/theme';

interface Iprops {
    visible: boolean;
    children?: React.ReactNode;
    onConfirm: () => void;
}

const AlertModal = (props: Iprops) => {
    /**
     * recoil
     */
    const recoilLang = _recoilLang();

    /**
     * useEffect
     */
    React.useEffect(() => {
        const langCodeList: string[] = ['AA00106014'];
        recoilLang.langInit(langCodeList);
    }, []);

    return (
        <BasicModal visible={props.visible}>
            <Wrapper>
                <Container>{props.children}</Container>
                {theme.device.deskTop && (
                    <>
                        <ButtonList>
                            <Button variant="contained" color="darkGray" size="medium" onClick={props.onConfirm}>
                                확인
                            </Button>
                        </ButtonList>
                    </>
                )}

                {theme.device.mobile && (
                    <>
                        <ButtonList>
                            <Button variant="contained" color="darkGray" size="3xlarge" onClick={props.onConfirm}>
                                확인
                            </Button>
                        </ButtonList>
                    </>
                )}
            </Wrapper>
        </BasicModal>
    );
};

export default AlertModal;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;

    ${(props) => {
        if (props.theme.device.deskTop) {
            return css`
                width: 432px;
            `;
        }
    }}

    ${(props) => {
        if (props.theme.device.mobile) {
            return css`
                width: 100%;
            `;
        }
    }}
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;
`;

const ButtonList = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
