import * as React from 'react';

import { UseFormRegisterReturn } from 'react-hook-form';
import styled, { css } from 'styled-components';

import Input from '@/components/atoms/input';
import Text from '@/components/atoms/text';

import { getImage } from '@/utils/image';

export const RadioProps = {
    color: [] as const,
    size: [] as const,
};

interface IWrapper {
    color?: typeof RadioProps.color[number];
    size?: typeof RadioProps.size[number];
    width?: number | string;
    height?: number | string;
    margin?: number | string;
    padding?: number | string;
}

interface ILabel {
    disabled?: boolean;
}

interface IInput {
    value?: number | string;
    name?: string;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Iprops extends IWrapper, ILabel, IInput {
    label?: string;
    register?: UseFormRegisterReturn;
}

const Checkbox = React.forwardRef((props: Iprops, ref) => {
    return (
        <Wrapper
            color={props.color}
            size={props.size}
            width={props.width}
            height={props.height}
            margin={props.margin}
            padding={props.padding}
        >
            <Label disabled={props.disabled}>
                <RadioInput
                    type="checkbox"
                    value={props.value}
                    name={props.name}
                    checked={props.checked}
                    onChange={props.onChange}
                    disabled={props.disabled}
                    {...props.register}
                />
                <IconBox />
                <Text>{props.label}</Text>
            </Label>
        </Wrapper>
    );
});

export default Checkbox;

const Wrapper = styled.div<IWrapper>`
    ${(props) => {
        switch (props.color) {
            default:
                return css`
                    & > label > span {
                        color: ${props.theme.color.darkGray100};
                    }
                `;
        }
    }}

    ${(props) => {
        switch (props.size) {
            default:
                return css`
                    & > label {
                        gap: 6px;
                    }

                    & > label > div {
                        width: 20px;
                        height: 20px;

                        background-size: 20px !important;
                    }

                    & > label > span {
                        font-size: ${props.theme.font.size.small};
                    }
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

    ${(props) => {
        switch (typeof props.margin) {
            case 'number':
                return css`
                    margin: ${props.margin}px;
                `;

            case 'string':
                return css`
                        margin ${props.margin};
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

const Label = styled.label<ILabel>`
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;

    ${(props) => {
        if (!props.disabled) {
            return css`
                cursor: pointer;
            `;
        }
    }}
`;

const RadioInput = styled(Input)<IInput>`
    display: none;

    & + div {
        background: url(${getImage('CHECK-BOX-OFF')});
    }

    &:checked {
        & + div {
            background: url(${getImage('CHECK-BOX-ON')});
        }
    }
`;

const IconBox = styled.div``;
