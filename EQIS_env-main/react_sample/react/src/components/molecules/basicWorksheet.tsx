import * as React from 'react';

import styled, { css } from 'styled-components';

interface IWrapper {
    width?: number | string;
}

interface IHeader {
    shadow?: boolean;
}

export interface IProps extends IWrapper {
    children: React.ReactNode;
}

const BasicWorksheet = (props: IProps) => {
    return (
        <Wrapper width={props.width}>
            <Container>{props.children}</Container>
        </Wrapper>
    );
};

export default BasicWorksheet;

const Wrapper = styled.div<IWrapper>`
    margin: 0 auto;

    padding: 32px 0;

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

            default:
                return css`
                    width: 1200px;
                `;
        }
    }}
`;

const Container = styled.div`
    padding: 0 32px 60px;

    ${(props) => css`
        background-color: ${props.theme.color.white};
    `}
`;

export const Header = styled.div<IHeader>`
    display: flex;
    justify-content: space-between;
    align-items: center;

    position: sticky;
    top: 0;

    z-index: 300;

    padding: 32px 0 24px;

    ${(props) => css`
        background-color: ${props.theme.color.white};
    `}

    ${(props) => {
        if (props.shadow) {
            return css`
                box-shadow: 0px 6px 4px -4px rgba(51, 51, 51, 0.1);
            `;
        }
    }}
`;

export const NoBox = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    padding: 4px 24px;

    max-width: 728px;
    height: 32px;

    ${(props) => css`
        background-color: ${props.theme.color.gray200};
        border: 1px solid ${props.theme.color.gray400};
    `}
`;

export const ButtonList = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const Body = styled.div``;
