import React from 'react';

import { LicenseManager } from 'ag-grid-enterprise';
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './styles/globalStyle';
import theme from './styles/theme';

import App from '@/App';

/**
 * AGGrid license 등록
 */
LicenseManager.setLicenseKey('라이센스키');

ReactDom.render(
    <RecoilRoot>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </RecoilRoot>,
    document.querySelector('#root'),
);
