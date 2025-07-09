import React from 'react';

import styled, { css } from 'styled-components';

export const SelectItemProps = {
    color: [] as const,
    size: [] as const,
};

interface IWrapper {
    color?: typeof SelectItemProps.color[number];
    size?: typeof SelectItemProps.size[number];
}

interface Iprops extends IWrapper {
    value?: number | string;
    children?: React.ReactNode;
}

const SelectItem = (props: Iprops) => {
    return (
        <Wrapper color={props.color} size={props.size}>
            <Li value={props.value}>{props.children}</Li>
        </Wrapper>
    );
};

export default SelectItem;

const Wrapper = styled.div<IWrapper>`
    cursor: pointer;

    display: flex;
    align-items: center;

    ${(props) => {
        switch (props.color) {
            default:
                return css`
                    & > li {
                        color: ${props.theme.color.darkGray100};

                        &:hover {
                            background-color: ${props.theme.color.gray200};
                        }
                    }
                `;
        }
    }}

    ${(props) => {
        switch (props.size) {
            default:
                return css`
                    & > li {
                        font-size: ${props.theme.font.size.xsmall};
                    }
                `;
        }
    }}
`;

const Li = styled.li`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    width: 100%;
    height: 100%;

    ${(props) => {
        if (props.theme.device.deskTop) {
            return css`
                padding: 8px 8px;
            `;
        }
    }}

    ${(props) => {
        if (props.theme.device.mobile) {
            return css`
                padding: 12px 8px;
            `;
        }
    }}
`;
