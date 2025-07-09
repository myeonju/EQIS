import * as React from 'react';

import styled from 'styled-components';

import Button, { ButtonProps } from '@/components/atoms/button';
import Icon from '@/components/atoms/icon';
import Title from '@/components/atoms/title';
import BasicModal from '@/components/molecules/modal/basicModal';

import { _recoilLang } from '@/modules/recoil/lang';

import { getImage } from '@/utils/image';

export interface IsearchModalButton {
    label: string;
    onClick: () => void;
    variant: typeof ButtonProps.variant[number];
}

interface Iprops {
    visible: boolean;
    title: string;
    register?: boolean;
    children: React.ReactNode;
    onRegister?: () => void;
    onUpdate?: () => void;
    onDelete?: () => void;
    onClose: () => void;
}

const RegisterModal = (props: Iprops) => {
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
    });

    return (
        <BasicModal visible={props.visible}>
            <Wrapper>
                <Header>
                    <Title color="black" size="large" weight="bold">
                        {props.title}
                    </Title>
                    <Icon src={getImage('CLOSE')} onClick={props.onClose} pointer />
                </Header>

                <ButtonList>
                    {props.register && props.onRegister && (
                        // 등록
                        <Button variant="contained" color="purple" size="xsmall" onClick={props.onRegister}>
                            등록
                        </Button>
                    )}

                    {!props.register && (
                        <>
                            {/** 삭제 */}
                            {props.onDelete && (
                                <Button variant="contained" color="vivid" size="xsmall" onClick={props.onDelete}>
                                    삭제
                                </Button>
                            )}
                            {/** 수정 */}
                            {props.onUpdate && (
                                <Button variant="contained" color="purple" size="xsmall" onClick={props.onUpdate}>
                                    수정
                                </Button>
                            )}
                        </>
                    )}
                </ButtonList>

                <Body>{props.children}</Body>
            </Wrapper>
        </BasicModal>
    );
};

export default RegisterModal;

const Wrapper = styled.div`
    width: 760px;

    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ButtonList = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;
