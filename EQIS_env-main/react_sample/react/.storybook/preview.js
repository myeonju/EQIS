import {ThemeProvider} from 'styled-components';
import theme from '../src/style/theme';
import GlobalStyle from '../src/style/globalStyle';

/*
 * storybook에 ThemProvider, GlobalStyle 적용
 */

export const decorators = [
    (Story) => (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Story />
        </ThemeProvider>
    )
];

export const parameters = {
    actions: {argTypeRegex: "^on[A-Z].*"},
    controls:{
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}
