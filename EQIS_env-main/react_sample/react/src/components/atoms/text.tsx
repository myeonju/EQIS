/**
 * Text Style
 */
import styled, { css } from 'styled-components';

import theme from '@/styles/theme';

export const TextProps = {
    decoration: ['underline'] as const,
    overflow: ['ellipsis'] as const,
};

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
    pointer?: boolean;
    decoration?: typeof TextProps.decoration[number];
    overflow?: typeof TextProps.overflow[number];
    verticalSort?: boolean;
}

const Text = styled.span<Iprops>`
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
                    width: ${props.width};
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
                        margin ${props.margin};
                    `;
        }
    }}

    ${(props) => {
        switch (typeof props.padding) {
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

    ${(props) => {
        if (props.pointer) {
            return css`
                cursor: pointer;
            `;
        }
    }}

    ${(props) => {
        switch (props.decoration) {
            case 'underline':
                return css`
                    text-decoration: underline;
                `;
        }
    }}

    ${(props) => {
        switch (props.overflow) {
            case 'ellipsis':
                return css`
                    display: inline-flex;
                    align-items: center;
                    white-space: nowrap;
                `;
        }
    }}

    ${(props) => {
        if (props.verticalSort) {
            return css`
                display: flex;
                align-items: center;
            `;
        }
    }}
`;

export default Text;
