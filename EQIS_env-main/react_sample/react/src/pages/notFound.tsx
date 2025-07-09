import * as React from 'react';

import styled from 'styled-components';

import Title from '@/components/atoms/title';

const NotFound = () => {
    return (
        <Wrapper>
            <Title size="2xlarge" weight="bold">
                Not Found
            </Title>
        </Wrapper>
    );
};

export default NotFound;

const Wrapper = styled.div`
    text-align: center;

    padding: 36px 48px;
`;
