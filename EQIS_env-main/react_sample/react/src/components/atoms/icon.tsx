/**
 * Icon Style
 */
import styled, { css } from 'styled-components';

export interface Iprops {
    width?: number | string;
    maxWidth?: number | string;
    height?: number | string;
    margin?: number | string;
    padding?: number | string;
    pointer?: boolean;
}

const Icon = styled.img<Iprops>`
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;

    border: none;

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
        switch (typeof props.maxWidth) {
            case 'number':
                return css`
                    max-width: ${props.maxWidth}px;
                `;

            case 'string':
                return css`
                    max-width: ${props.maxWidth};
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

    ${(props) => {
        if (props.pointer) {
            return css`
                cursor: pointer;
            `;
        }
    }}
`;

export default Icon;
