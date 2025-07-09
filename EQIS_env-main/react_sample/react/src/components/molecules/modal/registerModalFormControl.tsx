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

const RegisterModalFormControl = (props: Iprops) => {
    return (
        <Wrapper width={props.width} height={props.height}>
            <FormText width={props.labelWidth ?? 88}>{props.label}</FormText>
            {props.children}
        </Wrapper>
    );
};

export default RegisterModalFormControl;

const Wrapper = styled.div<IWrapper>`
    display: flex;
    align-items: flex-start;
    gap: 16px;

    padding: 8px 0;

    & > span:first-child {
        flex: 1 0 auto;
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
`;

const FormText = styled(Text)`
    text-align: right;

    line-height: 32px;
`;
