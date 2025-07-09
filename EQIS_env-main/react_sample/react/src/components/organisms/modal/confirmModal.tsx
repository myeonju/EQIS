import * as React from 'react';

import styled, { css } from 'styled-components';

import Button from '@/components/atoms/button';
import Title from '@/components/atoms/title';
import BasicModal from '@/components/molecules/modal/basicModal';

import { _recoilLang } from '@/modules/recoil/lang';

interface IWrapper {
    width?: number;
}

interface Iprops extends IWrapper {
    visible: boolean;
    title: string;
    children?: React.ReactNode;
    onConfirm: () => void;
    onClose: () => void;
}

const ConfirmModal = (props: Iprops) => {
    /**
     * recoil
     */
    const recoilLang = _recoilLang();

    /**
     * useEffect
     */
    React.useEffect(() => {
        const langCodeList: string[] = [];
        recoilLang.langInit(langCodeList);
    }, []);

    return (
        <BasicModal visible={props.visible}>
            <Wrapper width={props.width ?? 432}>
                <Title color="darkGray100" size="medium" weight="bold" margin="0 0 8px 0">
                    {props.title}
                </Title>

                {props.children && <Container>{props.children}</Container>}

                <ButtonList direction={props.children ? 'flex-end' : 'center'}>
                    <Button
                        variant="outlined"
                        color="darkGray"
                        size={props.children ? 'small' : 'large'}
                        onClick={props.onClose}
                    >
                        취소
                    </Button>

                    <Button
                        variant="contained"
                        color="darkGray"
                        size={props.children ? 'small' : 'large'}
                        onClick={props.onConfirm}
                    >
                        확인
                    </Button>
                </ButtonList>
            </Wrapper>
        </BasicModal>
    );
};

export default ConfirmModal;

const Wrapper = styled.div<IWrapper>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;

    ${(props) => {
        if (props.width) {
            return css`
                width: ${props.width}px;
            `;
        }
    }}
`;

const Container = styled.div`
    width: 100%;
`;

const ButtonList = styled.div<{ direction: string }>`
    display: flex;

    align-items: center;
    gap: 8px;

    width: 100%;

    ${(props) => css`
        justify-content: ${props.direction};
    `}
`;
