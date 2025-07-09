import * as React from 'react';

import styled, { css } from 'styled-components';

import Button, { ButtonProps } from '@/components/atoms/button';
import Icon from '@/components/atoms/icon';
import Title from '@/components/atoms/title';
import Desktop from '@/components/molecules/device/desktop';
import Mobile from '@/components/molecules/device/mobile';
import BasicModal from '@/components/molecules/modal/basicModal';

import { getImage } from '@/utils/image';

export interface IsearchModalButton {
    label: string;
    onClick: () => void;
    variant: typeof ButtonProps.variant[number];
}

interface Iprops {
    visible: boolean;
    title: string;
    buttonList?: IsearchModalButton[];
    children: React.ReactNode;
    onClose: () => void;
}

const SearchModal = (props: Iprops) => {
    return (
        <BasicModal visible={props.visible}>
            <Wrapper>
                <Header>
                    <CloseContainer>
                        <Icon src={getImage('CLOSE')} onClick={props.onClose} pointer />
                    </CloseContainer>

                    <Title color="black" size="large" weight="bold">
                        {props.title}
                    </Title>

                    <>
                        <Desktop>
                            <ButtonList>
                                {props.buttonList &&
                                    props.buttonList.map((button, index) => (
                                        <Button
                                            key={index}
                                            variant={button.variant}
                                            color="purple"
                                            size="xsmall"
                                            onClick={button.onClick}
                                        >
                                            {button.label}
                                        </Button>
                                    ))}
                            </ButtonList>
                        </Desktop>

                        <Mobile>
                            <ButtonList>
                                {props.buttonList &&
                                    props.buttonList.map((button, index) => (
                                        <Button
                                            key={index}
                                            variant={button.variant}
                                            color="purple"
                                            size="xlarge"
                                            onClick={button.onClick}
                                        >
                                            {button.label}
                                        </Button>
                                    ))}
                            </ButtonList>
                        </Mobile>
                    </>
                </Header>

                <Body>{props.children}</Body>
            </Wrapper>
        </BasicModal>
    );
};

export default SearchModal;

const Wrapper = styled.div`
    ${(props) => {
        if (props.theme.device.deskTop) {
            return css`
                width: 704px;
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

const Header = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const CloseContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const ButtonList = styled.div`
    ${(props) => {
        if (props.theme.device.mobile) {
            return css`
                display: flex;
                justify-content: flex-end;
                align-items: center;
                gap: 8px;
            `;
        }
    }}

    ${(props) => {
        if (props.theme.device.mobile) {
            return css`
                display: flex;
                flex-direction: column;
                gap: 8px;

                padding-top: 12px;
            `;
        }
    }}
`;

const Body = styled.div``;
