import * as React from 'react';

import styled, { css } from 'styled-components';

import Text from '@/components/atoms/text';

interface IFormText {
    labelWidth?: number;
}

interface IWrapper {
    style?: React.CSSProperties;
}

interface Iprops extends IFormText, IWrapper {
    label?: string;
    children?: React.ReactNode;
}

const ListFormControl = (props: Iprops) => {
    return (
        <Wrapper style={props.style}>
            <FormText labelWidth={props.labelWidth}>{props.label}</FormText>
            {props.children}
        </Wrapper>
    );
};

export default ListFormControl;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const FormText = styled(Text)<IFormText>`
    text-align: right;
    line-height: 32px;

    ${(props) => css`
        width: ${props.labelWidth}px;
        min-width: ${props.labelWidth}px;
        max-width: ${props.labelWidth}px;
    `}
`;
