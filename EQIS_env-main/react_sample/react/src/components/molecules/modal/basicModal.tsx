import * as React from 'react';

import styled, { css } from 'styled-components';

interface IContainer {
    width?: number | string;
    height?: number | string;
}

export interface Iprops extends IContainer {
    className?: string;
    visible: boolean;
    children?: React.ReactChild;
}

const BasicModal = (props: Iprops) => {
    return (
        <Wrapper className={props.className} visible={props.visible}>
            <Container width={props.width} height={props.height}>
                {props.children}
            </Container>
        </Wrapper>
    );
};

export default BasicModal;

const Wrapper = styled.div<{ visible: boolean }>`
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    z-index: 400;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.6);

    padding: 24px 36px;

    ${(props) => {
        if (props.visible) {
            return css`
                visibility: visible;
            `;
        } else {
            return css`
                visibility: hidden;
            `;
        }
    }}
`;

const Container = styled.div<IContainer>`
    padding: 32px;

    overflow: auto;

    max-height: calc(100% - 96px);

    ${(props) => css`
        background-color: ${props.theme.color.white};
    `}

    ${(props) => {
        if (props.theme.device.mobile) {
            return css`
                text-align: center;

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
