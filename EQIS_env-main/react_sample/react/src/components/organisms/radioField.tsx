import * as React from 'react';

import styled, { css } from 'styled-components';

import Text from '@/components/atoms/text';

interface IWrapper {
    width?: number | string;
    margin?: number | string;
    padding?: number | string;
    style?: React.CSSProperties;
    className?: string;
}

interface IContainer {
    height?: number | string;
}

export interface Iprops extends IWrapper, IContainer {
    errorLabel?: string;
    children: React.ReactNode;
}

const RadioField = (props: Iprops) => {
    return (
        <Wrapper
            width={props.width}
            margin={props.margin}
            padding={props.padding}
            style={props.style}
            className={props.className}
        >
            <Container height={props.height}>{props.children}</Container>

            {props.errorLabel && (
                <Text color="vivid200" style={{ fontSize: '11px' }}>
                    {props.errorLabel}
                </Text>
            )}
        </Wrapper>
    );
};

export default RadioField;

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

                text-align: center;
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
    align-items: center;

    height: 32px;

    ${(props) => {
        if (props.theme.device.deskTop) {
            return css`
                gap: 52px;
            `;
        }
    }}

    ${(props) => {
        if (props.theme.device.mobile) {
            return css`
                justify-content: center;
                gap: 64px;
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
`;
