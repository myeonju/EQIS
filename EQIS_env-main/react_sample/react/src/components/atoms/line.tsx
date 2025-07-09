/**
 * Line Style
 */
import styled, { css } from 'styled-components';

import theme from '@/styles/theme';

type colorType = keyof typeof theme.color;

export interface IProps {
    width?: number | string | false;
    height?: number | string | false;
    color?: colorType;
    margin?: number | string;
    padding?: number | string;
}

const Line = styled.hr<IProps>`
    border: none;

    ${(props) => css`
        ${props.color && `background-color: ${props.theme.color[props.color]};`}
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

export default Line;
