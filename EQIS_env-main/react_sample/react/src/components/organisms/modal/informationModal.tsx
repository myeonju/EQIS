import * as React from 'react';

import styled from 'styled-components';

import Icon from '@/components/atoms/icon';
import Title from '@/components/atoms/title';
import BasicModal from '@/components/molecules/modal/basicModal';

import { getImage } from '@/utils/image';

interface IWrapper {
    width?: number;
}

interface Iprops extends IWrapper {
    visible: boolean;
    title: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const InformationModal = (props: Iprops) => {
    return (
        <BasicModal visible={props.visible}>
            <Wrapper>
                <Header>
                    <Title color="black" size="large" weight="bold">
                        {props.title}
                    </Title>

                    <Icon src={getImage('CLOSE')} width={20} height={20} pointer onClick={props.onClose}></Icon>
                </Header>

                <Body>{props.children}</Body>
            </Wrapper>
        </BasicModal>
    );
};

export default InformationModal;

const Wrapper = styled.div<IWrapper>`
    width: 1200px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 36px;

    padding-top: 24px;
`;
