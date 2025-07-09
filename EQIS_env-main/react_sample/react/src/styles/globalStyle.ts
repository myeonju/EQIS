/*
 * 전역으로 사용될 Style 등록
 */

import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import theme from './theme';

const GlobalStyle = createGlobalStyle`
    ${reset}

    * {
        box-sizing: border-box;

        margin: 0;
        padding: 0;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
    }

    html,
    body {
        height: 100%;
    }

    body {
        background-color: ${theme.color.gray200};
    }

    a,
    a:active,
    a:hover {
        text-decoration: none;
    }

    pre {
        white-space: break-spaces;
    }
`;

export default GlobalStyle;
