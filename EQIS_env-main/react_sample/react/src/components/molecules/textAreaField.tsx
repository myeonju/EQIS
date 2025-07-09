import * as React from 'react';

import { UseFormRegisterReturn } from 'react-hook-form';
import styled, { css } from 'styled-components';

import Text from '@/components/atoms/text';

export const TextareaFieldProps = {
    color: ['none', 'default', 'error'] as const,
    size: [] as const,
};

interface IWrapper {
    size?: typeof TextareaFieldProps.size[number];
    width?: number | string;
    wrapperHeight?: number | string;
    margin?: number | string;
    padding?: number | string;
    pointer?: boolean;
    maxLength?: number;
    style?: React.CSSProperties;
    className?: string;
}

interface IContainer {
    color?: typeof TextareaFieldProps.color[number];
    size?: typeof TextareaFieldProps.size[number];
    height?: number | string;
}

interface ITextarea {
    readOnly?: boolean;
    placeholder?: string;
    value?: number | string;
    pointer?: boolean;
}

export interface Iprops extends IWrapper, IContainer, ITextarea {
    register?: UseFormRegisterReturn;
    errorLabel?: string;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaField = React.forwardRef((props: Iprops, ref) => {
    return (
        <Wrapper
            size={props.size}
            width={props.width}
            wrapperHeight={props.wrapperHeight}
            margin={props.margin}
            padding={props.padding}
            pointer={props.pointer}
            style={props.style}
            className={props.className}
            onClick={props.onClick}
        >
            <Container color={props.color} size={props.size} height={props.height}>
                <Textarea
                    readOnly={props.readOnly}
                    placeholder={props.placeholder}
                    value={props.value}
                    pointer={props.pointer}
                    maxLength={props.maxLength}
                    onChange={props.onChange}
                    {...props.register}
                />
            </Container>

            {props.errorLabel && (
                <Text color="vivid200" style={{ fontSize: '11px' }}>
                    {props.errorLabel}
                </Text>
            )}
        </Wrapper>
    );
});

export default TextareaField;

const Wrapper = styled.div<IWrapper>`
    display: flex;
    flex-direction: column;
    gap: 4px;

    ${(props) => {
        switch (props.size) {
            default: {
                if (props.theme.device.deskTop) {
                    return css`
                        width: 624px;
                    `;
                }

                if (props.theme.device.mobile) {
                    return css`
                        width: 100%;
                    `;
                }
            }
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
        switch (typeof props.wrapperHeight) {
            case 'number':
                return css`
                    height: ${props.wrapperHeight}px;
                `;

            case 'string':
                return css`
                    height: ${props.wrapperHeight};
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
`;

const Container = styled.div<IContainer>`
    padding: 12px;

    ${(props) => {
        switch (props.color) {
            case 'none':
                return css`
                    background-color: ${props.theme.color.none};
                    border: none;

                    & > textarea {
                        color: ${props.theme.color.darkGray100};

                        &::placeholder {
                            color: ${props.theme.color.gray600};
                        }
                    }
                `;

            case 'error':
                return css`
                    background-color: ${props.theme.color.vivid100};
                    border: 1px solid ${props.theme.color.vivid200};

                    & > textarea {
                        color: ${props.theme.color.darkGray100};

                        &::placeholder {
                            color: ${props.theme.color.gray600};
                        }
                    }
                `;

            default:
                return css`
                    background-color: ${props.theme.color.white};
                    border: 1px solid ${props.theme.color.gray500};

                    &:hover {
                        border: 1px solid ${props.theme.color.black};
                    }

                    & > textarea {
                        color: ${props.theme.color.darkGray100};

                        &::placeholder {
                            color: ${props.theme.color.gray600};
                        }
                    }
                `;
        }
    }};

    ${(props) => {
        switch (props.size) {
            default:
                return css`
                    font-size: ${props.theme.font.size.medium};

                    height: 196px;
                `;
        }
    }};

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
    }};
`;

const Textarea = styled.textarea<ITextarea>`
    width: 100%;
    height: 100%;

    border: none;
    resize: none;

    &:focus {
        outline: none;
    }

    line-height: 1.5;

    ${(props) => css`
        background-color: ${props.theme.color.none};
    `}

    ${(props) => {
        if (props.pointer) {
            return css`
                cursor: pointer;
            `;
        }
    }}
`;
