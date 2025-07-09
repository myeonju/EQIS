/**
 * Input Style
 */
import styled, { css } from 'styled-components';

export interface Iprops {
    width?: number | string | false;
    height?: number | string | false;
}

const Input = styled.input<Iprops>`
    outline: none;
    &:focus {
        outline: none;
    }

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
        switch (props.color) {
            case 'none':
                return css`
                    border: none;
                    background-color: transparent;
                `;
        }
    }}
`;

export default Input;
