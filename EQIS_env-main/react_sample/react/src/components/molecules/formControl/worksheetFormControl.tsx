import * as React from 'react';

import styled, { css } from 'styled-components';

import Icon from '@/components/atoms/icon';
import Text from '@/components/atoms/text';

import { getImage } from '@/utils/image';

interface IWrapper {
    className?: string;
    style?: React.CSSProperties;
}

interface ITextList {
    labelWidth: number | string;
}

interface Iprops extends ITextList, IWrapper {
    label?: string;
    tooltip?: string;
    children: React.ReactNode;
}

const WorksheetFormControl = (props: Iprops) => {
    return (
        <Wrapper className={props.className} style={props.style}>
            <TextList labelWidth={props.labelWidth}>
                <FormText color="darkGray100" size="small">
                    {props.label}
                </FormText>

                {props.tooltip && <Icon src={getImage('TOOLTIP')} title={props.tooltip} />}
            </TextList>

            {props.children}
        </Wrapper>
    );
};

export default WorksheetFormControl;

const Wrapper = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 24px;

    width: 100%;
`;

const TextList = styled.div<ITextList>`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;

    flex: 1 0 auto;

    ${(props) => {
        switch (typeof props.labelWidth) {
            case 'number':
                return css`
                    width: ${props.labelWidth}px;
                    min-width: ${props.labelWidth}px;
                    max-width: ${props.labelWidth}px;
                `;
            case 'string':
                return css`
                    width: ${props.labelWidth};
                    min-width: ${props.labelWidth};
                    max-width: ${props.labelWidth};
                `;
        }
    }}
`;

const FormText = styled(Text)`
    line-height: 32px;
`;
