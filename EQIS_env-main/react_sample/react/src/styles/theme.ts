/*
 * styled-components에 사용할 theme 등록
 */

import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
    minWidth: '1540px',
    maxWidth: '2160px',

    device: {
        mobile: window.innerWidth < 768 ? true : false,
        deskTop: window.innerWidth >= 768 ? true : false,
    },

    font: {
        family: {
            kr: "'Noto Sans KR', sans-serif",
            en: "'Noto Sans', sans-serif",
        },

        weight: {
            regular: 400,
            medium: 500,
            bold: 600,
        },

        size: {
            '3xlarge': '40px',
            '2xlarge': '32px',
            xlarge: '28px',
            large: '24px',
            medium: '20px',
            small: '16px',
            xsmall: '14px',
            '2xsmall': '12px',
            '3xsmall': '10px',
        },
    },

    color: {
        black: '#000000',

        darkGray100: '#333333',
        darkGray200: '#232323',

        gray100: '#fcfcfc',
        gray200: '#f5f5f5',
        gray300: '#eaeaea',
        gray400: '#dbdbdb',
        gray500: '#cccccc',
        gray600: '#a5a5a5',
        gray700: '#767676',
        gray800: '#5a5a5a',

        white: '#ffffff',

        brown100: '#a37d75',
        brown200: '#8c665e',
        brown300: '#a66953',

        cyan50: '#c0ecf2',
        cyan100: '#66c6d9',
        cyan200: '#39aac6',

        purple100: '#f0eef6',
        purple200: '#533ca5',
        purple300: '#432f83',

        vivid100: '#fce4e4',
        vivid200: '#cc0033',

        blue: '#1b47a1',

        orange: '#ee7411',

        red: '#b35059',

        skyblue100: '#e9f4fd',
        skyblue200: '#c2e1fa',
        skyblue300: '#42a4fe',

        none: 'transparent',
    },
};

export default theme;
