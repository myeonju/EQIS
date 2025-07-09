/*
 * styled-components theme 타입 정의
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        minWidth: string;
        maxWidth: string;

        device: {
            mobile: boolean;
            deskTop: boolean;
        };

        font: {
            family: {
                kr: string;
                en: string;
            };

            weight: {
                regular: number;
                medium: number;
                bold: number;
            };

            size: {
                '3xlarge': string;
                '2xlarge': string;
                xlarge: string;
                large: string;
                medium: string;
                small: string;
                xsmall: string;
                '2xsmall': string;
                '3xsmall': string;
            };
        };

        color: {
            black: string;

            darkGray100: string;
            darkGray200: string;

            gray100: string;
            gray200: string;
            gray300: string;
            gray400: string;
            gray500: string;
            gray600: string;
            gray700: string;
            gray800: string;

            white: string;

            brown100: string;
            brown200: string;
            brown300: string;

            cyan50: string;
            cyan100: string;
            cyan200: string;

            purple100: string;
            purple200: string;
            purple300: string;

            vivid100: string;
            vivid200: string;

            blue: string;

            orange: string;

            red: string;

            skyblue100: string;
            skyblue200: string;
            skyblue300: string;

            none: string;
        };
    }
}
