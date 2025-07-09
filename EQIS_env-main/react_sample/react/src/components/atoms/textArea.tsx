/**
 * TextArea Style
 */
import styled, { css } from 'styled-components';

export const TextareaProps = {
    color: ['default', 'error'] as const,
    size: [] as const,
};

export interface Iprops {
    color?: typeof TextareaProps.color[number];
    size?: typeof TextareaProps.size[number];
    width?: number | string;
    height?: number | string;
    margin?: number | string;
    padding?: number | string;
}

const Textarea = styled.textarea<Iprops>`
    padding: 12px;
    resize: none;

    ${(props) => {
        switch (props.color) {
            case 'error':
                return css`
                    background-color: ${props.theme.color.vivid100};
                    border: 1px solid ${props.theme.color.vivid200};

                    &::placeholder {
                        color: ${props.theme.color.gray600};
                    }
                `;

            default:
                return css`
                    background-color: ${props.theme.color.white};
                    border: 1px solid ${props.theme.color.gray500};

                    &:hover {
                        border: 1px solid ${props.theme.color.black};
                    }

                    &::placeholder {
                        color: ${props.theme.color.gray600};
                    }
                `;
        }
    }}

    ${(props) => {
        switch (typeof props.size) {
            default:
                return css`
                    font-size: ${props.theme.font.size.medium};
                    width: 624px;
                    height: 196px;
                `;
        }
    }}

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
`;

export default Textarea;
