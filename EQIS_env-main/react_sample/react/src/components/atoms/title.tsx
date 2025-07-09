/**
 * Title Style
 */
import styled, { css } from 'styled-components';

import theme from '@/styles/theme';

type colorType = keyof typeof theme.color;
type sizeType = keyof typeof theme.font.size;
type weightType = keyof typeof theme.font.weight;

export interface Iprops {
    color?: colorType;
    size?: sizeType;
    weight?: weightType;
    width?: number | string;
    height?: number | string;
    margin?: number | string;
    padding?: number | string;
}

const Title = styled.h2<Iprops>`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;

    line-height: 1.5;
    word-break: keep-all;

    ${(props) => css`
        ${props.color && `color: ${props.theme.color[props.color]};`}
        ${props.size && `font-size: ${props.theme.font.size[props.size]};`}
        ${props.weight && `font-weight: ${props.theme.font.weight[props.weight]};`}
    `}

    ${(props) => {
        switch (typeof props.width) {
            case 'number':
                return css`
                    width: ${props.width}px;
                `;

            case 'string':
                return css`
                    width: ${props.width}px;
                `;
        }
    }}

    ${(props) => {
        switch (typeof props.height) {
            case 'number':
                return css`
                    height: ${props.height}px;
                `;

            case 'string':
                return css`
                    height: ${props.height};
                `;
        }
    }}

    ${(props) => {
        switch (typeof props.margin) {
            case 'number':
                return css`
                    margin: ${props.margin}px;
                `;

            case 'string':
                return css`
                    margin: ${props.margin};
                `;
        }
    }}

    ${(props) => {
        switch (props.padding) {
            case 'number':
                return css`
                    padding: ${props.padding}px;
                `;

            case 'string':
                return css`
                    padding: ${props.padding};
                `;
        }
    }}
`;

export default Title;
