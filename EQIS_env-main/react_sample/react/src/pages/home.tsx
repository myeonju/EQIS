import * as React from 'react';

import styled from 'styled-components';

import Footer from '@/components/home/footer';
import Header from '@/components/home/header';

const Home = () => {
    return (
        <Wrapper>
            <Header />
            <Footer />
        </Wrapper>
    );
};

export default Home;

const Wrapper = styled.div`
    height: calc(100vh - 60px);

    display: grid;
    grid-template-rows: 4.2fr 5.8fr;
`;
