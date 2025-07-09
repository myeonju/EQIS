import * as React from 'react';

import styled, { css } from 'styled-components';

import Icon from '@/components/atoms/icon';

import { getImage } from '@/utils/image';

const Index = () => {
    return (
        <Wrapper>
            <Container>
                <Icon src={getImage('SQIM-SLOGAN')} />
            </Container>
        </Wrapper>
    );
};

export default Index;

const Wrapper = styled.div`
    ${(props) => css`
        background-color: ${props.theme.color.white};
    `}
`;

const Container = styled.div`
    width: 1200px;
    height: 100%;

    margin: 0 auto;

    display: flex;
    align-items: flex-end;
`;
