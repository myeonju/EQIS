import React, { ReactNode } from 'react';

import DayjsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import enLocale from 'date-fns/locale/en-US';
import koLocale from 'date-fns/locale/ko';
import styled, { css } from 'styled-components';

import Input from '@/components/atoms/input';
import Text from '@/components/atoms/text';

import { _recoilLang } from '@/modules/recoil/lang';

import { toYYYYMMDD } from '@/utils/dateformat';
import { getImage } from '@/utils/image';

export const DatepickerProps = {
    color: ['error'] as const,
};

interface IWrapper {
    width?: number | string;
    margin?: number | string;
    padding?: number | string;
}

interface IContainer {
    color?: typeof DatepickerProps.color[number];
    height?: number | string;
    disabled?: boolean;
}

export interface Iprops extends IWrapper, IContainer {
    value?: string;
    locale?: ReactNode;
    disabled?: boolean;
    errorLabel?: string;
    onChange: (date: string) => void;
}

const DatePicker = React.forwardRef((props: Iprops, ref) => {
    /**
     * recoil
     */
    const recoilLang = _recoilLang();

    return (
        <Wrapper width={props.width} margin={props.margin} padding={props.padding}>
            <Container color={props.color} height={props.height} disabled={props.disabled}>
                <MuiPickersUtilsProvider locale={recoilLang.langCd === 'KO' ? koLocale : enLocale} utils={DayjsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        InputProps={{
                            disableUnderline: true,
                        }}
                        variant="inline"
                        format={recoilLang.langCd === 'KO' ? 'yyyy-MM-dd' : 'MM-dd-yyyy'}
                        value={props.value && props.value !== 'Invalid Date' ? props.value : null}
                        onChange={(date) =>
                            props.onChange(toYYYYMMDD(date as Date) === 'Invalid Date' ? '' : toYYYYMMDD(date as Date))
                        }
                        disabled={props.disabled}
                        autoOk={true}
                    />

                    <DatepickerInput ref={ref as React.RefObject<HTMLInputElement>} />
                </MuiPickersUtilsProvider>
            </Container>

            {props.errorLabel && (
                <Text color="vivid200" style={{ fontSize: '11px' }}>
                    {props.errorLabel}
                </Text>
            )}
        </Wrapper>
    );
});

export default DatePicker;

const Wrapper = styled.div<IWrapper>`
    width: 178px;

    display: flex;
    flex-direction: column;
    gap: 4px;

    // 달력 Root
    .MuiFormControl-root {
        width: 100%;
    }

    // 달력 아이콘 버튼
    .MuiIconBitton-label {
        background: url(${getImage('CALENDAR')}) no-repeat;
    }

    // 아이콘 root
    .MuiButtonBase-root {
        padding: 0;
    }

    // 달력 아이콘
    .MuiSvgIcon-root {
        display: none;
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
        switch (typeof props.margin) {
            case 'number':
                return css`
                    height: ${props.margin}px;
                `;

            case 'string':
                return css`
                    height: ${props.margin};
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

    padding: 0 12px;

    ${(props) => {
        switch (props.color) {
            case 'error':
                return css`
                    background-color: ${props.theme.color.vivid100};
                    border: 1px solid ${props.theme.color.vivid200};

                    // input
                    .MuiInputBase-input {
                        color: ${props.theme.color.darkGray200};

                        &::placeholder {
                            color: ${props.theme.color.gray700};
                        }
                    }
                `;

            default:
                return css`
                    background-color: ${props.theme.color.white};
                    border: 1px solid ${props.theme.color.gray500};

                    &:hover {
                        border: 1px solid ${props.theme.color.black};
                    }

                    // input
                    .MuiInputBase-input {
                        color: ${props.theme.color.darkGray100};

                        &::placeholder {
                            color: ${props.theme.color.gray600};
                        }
                    }
                `;
        }
    }}

    ${(props) => css`
        height: 32px;

        // input
        .MuiInputBase-input {
            font-size: ${props.theme.font.size.small};
        }

        // 달력 아이콘 버튼
        .MuiIconButton-label {
            background: url(${getImage('CALENDAR')}) no-repeat;
            background-size: 20px;

            width: 20px;
            height: 20px;
        }
    `}

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
        if (props.disabled) {
            return css`
                border: 1px solid ${props.theme.color.gray500};
                color: ${props.theme.color.gray500};
                background-color: ${props.theme.color.gray300};

                &:hover {
                    border: 1px solid ${props.theme.color.gray500};
                }
            `;
        }
    }}
`;

const DatepickerInput = styled(Input)`
    width: 0;
    height: 0;

    border: none;
`;
