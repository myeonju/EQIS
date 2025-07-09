import * as React from 'react';

import { Outlet } from 'react-router';
import styled from 'styled-components';

import TopNav from '@/components/organisms/nav/topNav';

const TopNavPage = () => {
    return (
        <Wrapper>
            <TopNav />

            <Page.Container>
                <Outlet />
            </Page.Container>
        </Wrapper>
    );
};

export default TopNavPage;

const Wrapper = styled.div``;

const Page = {
    Container: styled.div``,
};
