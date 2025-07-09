/**
 * Text Field Style
 */
import * as React from 'react';

import { UseFormRegisterReturn } from 'react-hook-form';
import styled, { css } from 'styled-components';

import Icon from '@/components/atoms/icon';
import Input from '@/components/atoms/input';
import Text from '@/components/atoms/text';

export const TextFieldProps = {
    type: ['text', 'number', 'password'] as const,
    color: ['default', 'error'] as const,
};

interface IWrapper {
    width?: number | string;
    margin?: number | string;
    padding?: number | string;
    style?: React.CSSProperties;
    className?: string;
}

interface IContainer {
    color?: typeof TextFieldProps.color[number];
    height?: number | string;
    readOnly?: boolean;
    onClick?: () => void;
}

interface IInput {
    type: typeof TextFieldProps.type[number];
    readOnly?: boolean;
    placeholder?: string;
    value?: number | string;
    maxLength?: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface Iprops extends IWrapper, IContainer, IInput {
    rightIcon?: string;
    rightLabel?: string;
    register?: UseFormRegisterReturn;
    errorLabel?: string;
    onClickRight?: () => void;
}

const TextField = React.forwardRef((props: Iprops, ref) => {
    return (
        <Wrapper
            width={props.width}
            margin={props.margin}
            padding={props.padding}
            style={props.style}
            className={props.className}
        >
            <Container height={props.height} color={props.color} readOnly={props.readOnly} onClick={props.onClick}>
                <TextFieldInput
                    type={props.type}
                    width="100%"
                    height="100%"
                    color="none"
                    readOnly={props.readOnly}
                    placeholder={props.placeholder}
                    value={props.value}
                    maxLength={props.maxLength}
                    pointer={!!props.onClick}
                    onChange={props.onChange}
                    onKeyUp={props.onKeyUp}
                    {...props.register}
                />

                <RightContainer onClick={props.onClickRight} pointer={!!props.onClickRight}>
                    {props.rightLabel && <Text>{props.rightLabel}</Text>}
                    {props.rightIcon && <Icon>{props.rightIcon}</Icon>}
                </RightContainer>
            </Container>

            {props.errorLabel && (
                <Text color="vivid200" style={{ fontSize: '11px' }}>
                    {props.errorLabel}
                </Text>
            )}
        </Wrapper>
    );
});

export default TextField;

const Wrapper = styled.div<IWrapper>`
    display: flex;
    flex-direction: column;
    gap: 4px;

    ${(props) => {
        if (props.theme.device.deskTop) {
            return css`
                width: 388px;
            `;
        }
    }}

    ${(props) => {
        if (props.theme.device.mobile) {
            return css`
                width: 100%;
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
`;

const Container = styled.div<IContainer>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;

    padding: 0 12px;

    ${(props) => {
        switch (props.color) {
            case 'error':
                return css`
                    background-color: ${props.theme.color.vivid100};
                    border: 1px solid ${props.theme.color.vivid200};

                    & > input:-webkit-autofill {
                        box-shadow: 0 0 0 1000px ${props.theme.color.vivid100} inset;
                    }

                    & > input {
                        color: ${props.theme.color.darkGray200};

                        &::placeholder {
                            color: ${props.theme.color.gray700};
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

                    & > input:-webkit-autofill {
                        box-shadow: 0 0 0 1000px ${props.theme.color.white} inset;
                    }

                    & > input {
                        color: ${props.theme.color.darkGray100};

                        &::placeholder {
                            color: ${props.theme.color.gray600};
                        }
                    }
                `;
        }
    }}

    ${(props) => {
        if (props.theme.device.deskTop) {
            return css`
                height: 32px;

                & > div > span {
                    font-size: ${props.theme.font.size.small};
                }

                & > div > img {
                    width: 16px;
                    height: 16px;
                }
            `;
        }
    }}

    ${(props) => {
        if (props.theme.device.mobile) {
            return css`
                height: 44px;

                & > div > span {
                    font-size: ${props.theme.font.size.small};
                }

                & > div > img {
                    width: 16px;
                    height: 16px;
                }
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
        if (props.onClick) {
            return css`
                cursor: pointer;
            `;
        }
    }}

    ${(props) => {
        if (props.readOnly) {
            return css`
                border: 1px solid ${props.theme.color.gray500};
                color: ${props.theme.color.gray500};
                background-color: ${props.theme.color.gray300};

                &:hover {
                    border: 1px solid ${props.theme.color.gray500};
                }

                & > input {
                    cursor: auto;
                }
            `;
        }
    }}
`;

const TextFieldInput = styled(Input)<IInput & { pointer: boolean }>`
    ${(props) => {
        switch (props.type) {
            case 'number':
                return css`
                    text-align: right;
                `;
        }
    }}

    ${(props) => {
        if (props.pointer) {
            return css`
                cursor: pointer !important;
            `;
        }
    }}
`;

const RightContainer = styled.div<{ pointer: boolean }>`
    ${(props) => {
        if (props.pointer) {
            return css`
                cursor: pointer;
            `;
        }
    }}
`;
