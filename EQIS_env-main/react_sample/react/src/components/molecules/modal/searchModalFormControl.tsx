import * as React from 'react';

import styled, { css } from 'styled-components';

import Text from '@/components/atoms/text';

interface IWrapper {
    width?: number | string;
    height?: number | string;
}

interface Iprops extends IWrapper {
    label: string;
    labelWidth?: number;
    children?: React.ReactNode;
}

const SearchModalFormControl = (props: Iprops) => {
    return (
        <Wrapper width={props.width} height={props.height}>
            <FormText labelWidth={props.labelWidth}>{props.label}</FormText>
            {props.children}
        </Wrapper>
    );
};

export default SearchModalFormControl;

const Wrapper = styled.div<IWrapper>`
    display: flex;
    gap: 16px;

    padding: 8px 0;

    & > span:first-child {
        flex: 1 0 auto;
    }

    ${(props) => {
        if (props.theme.device.deskTop) {
            return css`
                align-items: center;
                gap: 16px;
            `;
        }
    }}

    ${(props) => {
        if (props.theme.device.mobile) {
            return css`
                flex-direction: column;
                gap: 6px;
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

const FormText = styled(Text)<{ labelWidth?: number }>`
    ${(props) => {
        if (props.theme.device.deskTop) {
            return css`
                width: ${props.labelWidth ?? 102}px;

                text-align: right;
            `;
        }
    }}
`;
