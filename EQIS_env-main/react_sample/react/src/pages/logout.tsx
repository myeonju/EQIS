import * as React from 'react';

import styled from 'styled-components';

import Title from '@/components/atoms/title';

const Logout = () => {
    return (
        <Wrapper>
            <Title size="2xlarge" weight="bold">
                로그아웃되었습니다.
            </Title>
        </Wrapper>
    );
};

export default Logout;

const Wrapper = styled.div`
    text-align: center;

    padding: 36px 48px;
`;
