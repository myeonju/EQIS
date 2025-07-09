import * as React from 'react';

import styled, { css } from 'styled-components';

export interface Iprops {
    children: React.ReactNode;
}

const BasicList = (props: Iprops) => {
    return <Wrapper>{props.children}</Wrapper>;
};

export default BasicList;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    margin: 0 auto;
    padding: 20px;

    ${(props) => css`
        min-width: ${props.theme.minWidth};
        max-width: ${props.theme.maxWidth};
    `}
`;

export const ButtonSection = styled.section`
    display: flex;
    justify-content: space-between;
    gap: 12px;
`;

export const ButtonList = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const SearchField = styled.div<{ columns?: number }>`
    display: grid;
    gap: 12px 20px;

    padding: 20px 28px;

    ${(props) => css`
        background-color: ${props.theme.color.white};
        border: 1px solid ${props.theme.color.gray400};
    `}

    ${(props) => {
        if (props.columns) {
            return css`
                grid-template-columns: repeat(${props.columns}, 1fr);
            `;
        } else {
            return css`
                grid-template-columns: repeat(3, 1fr);
            `;
        }
    }}
`;

export const FieldList = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    gap: 8px;
`;

export const GridField = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const PaginationField = styled.div`
    padding: 12px;
`;
