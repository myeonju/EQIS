/*
 * button Style
 */

import styled, { css } from 'styled-components';

export const ButtonProps = {
    size: ['2xsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', '2xlarge', '3xlarge'] as const,
    color: ['purple', 'darkGray', 'cyan', 'brown', 'vivid'] as const,
    variant: ['contained', 'outlined'] as const,
};

export interface Iprops {
    size?: typeof ButtonProps.size[number];
    variant?: typeof ButtonProps.variant[number];
    color?: typeof ButtonProps.color[number];
    disabled?: boolean;
    width?: number | string;
    maxWidth?: number | string;
    height?: number | string;
    margin?: number | string;
    padding?: number | string;
}

const Button = styled.button<Iprops>`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;

    border: none;
    outline: none;
    padding: 0 12px;

    ${(props) => css`
        background-color: ${props.theme.color.none};
    `}

    ${(props) => {
        switch (props.size) {
            case '2xsmall':
                return css`
                    font-size: ${props.theme.font.size.small};
                    height: 32px;
                    ${props.theme.device.deskTop && `min-width: 46px;`}
                    ${props.theme.device.mobile && `width: 100%;`}
                `;

            case 'xsmall':
                return css`
                    font-size: ${props.theme.font.size.small};
                    height: 32px;
                    ${props.theme.device.deskTop && `min-width: 76px;`}
                    ${props.theme.device.mobile && `width: 100%;`}
                `;

            case 'small':
                return css`
                    font-size: ${props.theme.font.size.small};
                    height: 32px;
                    ${props.theme.device.deskTop && `min-width: 92px;`}
                    ${props.theme.device.mobile && `width: 100%;`}
                `;

            case 'medium':
                return css`
                    font-size: ${props.theme.font.size.small};
                    min-width: 116px;
                    ${props.theme.device.deskTop && `min-width: 116px;`}
                    ${props.theme.device.mobile && `width: 100%;`}
                `;

            case 'large':
                return css`
                    font-size: ${props.theme.font.size.small};
                    height: 32px;
                    ${props.theme.device.deskTop && `min-width: 120px;`}
                    ${props.theme.device.mobile && `width: 100%;`}
                `;

            case 'xlarge':
                return css`
                    font-size: ${props.theme.font.size.small};
                    height: 48px;
                    ${props.theme.device.deskTop && `min-width: 200px;`}
                    ${props.theme.device.mobile && `width: 100%;`}
                `;

            case '2xlarge':
                return css`
                    font-size: ${props.theme.font.size.small};
                    height: 56px;
                    ${props.theme.device.deskTop && `min-width: 284px;`}
                    ${props.theme.device.mobile && `width: 100%;`}
                `;

            case '3xlarge':
                return css`
                    font-size: ${props.theme.font.size.small};
                    height: 56px;
                    ${props.theme.device.deskTop && `min-width: 360px;`}
                    ${props.theme.device.mobile && `width: 100%;`}
                `;
        }
    }}

    ${(props) => {
        switch (props.variant) {
            case 'outlined':
                switch (props.color) {
                    case 'purple':
                        return css`
                            color: ${props.theme.color.purple200};
                            background-color: ${props.theme.color.white};
                            border: 1px solid ${props.theme.color.purple200};

                            &:hover {
                                color: ${props.theme.color.purple300};
                                background-color: ${props.theme.color.purple100};
                                border: 1px solid ${props.theme.color.purple300};
                            }
                        `;

                    case 'darkGray':
                        return css`
                            color: ${props.theme.color.darkGray100};
                            background-color: ${props.theme.color.white};
                            border: 1px solid ${props.theme.color.gray600};

                            &:hover {
                                color: ${props.theme.color.darkGray100};
                                border: 1px solid ${props.theme.color.darkGray100};
                            }
                        `;
                }
                break;

            case 'contained':
                switch (props.color) {
                    case 'purple':
                        return css`
                            color: ${props.theme.color.white};
                            background-color: ${props.theme.color.purple200};

                            &:hover {
                                background-color: ${props.theme.color.purple300};
                            }
                        `;

                    case 'darkGray':
                        return css`
                            color: ${props.theme.color.white};
                            background-color: ${props.theme.color.darkGray100};

                            &:hover {
                                background-color: ${props.theme.color.black};
                            }
                        `;

                    case 'cyan':
                        return css`
                            color: ${props.theme.color.white};
                            background-color: ${props.theme.color.cyan100};

                            &:hover {
                                background-color: ${props.theme.color.cyan200};
                            }
                        `;

                    case 'brown':
                        return css`
                            color: ${props.theme.color.white};
                            background-color: ${props.theme.color.brown100};

                            &:hover {
                                background-color: ${props.theme.color.brown200};
                            }
                        `;

                    case 'vivid':
                        return css`
                            color: ${props.theme.color.darkGray100};
                            background-color: ${props.theme.color.vivid100};
                            border: 1px solid ${props.theme.color.vivid200};
                        `;
                }
                break;
        }
    }}

    ${(props) => {
        if (props.disabled) {
            return css`
                color: ${props.theme.color.gray400};
                background-color: ${props.theme.color.gray100};
                border: 1px solid ${props.theme.color.gray300};

                &:hover {
                    color: ${props.theme.color.gray400};
                    background-color: ${props.theme.color.gray100};
                    border: 1px solid ${props.theme.color.gray300};
                }
            `;
        } else {
            return css`
                cursor: pointer;
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
        switch (typeof props.maxWidth) {
            case 'number':
                return css`
                    max-width: ${props.maxWidth}px;
                `;

            case 'string':
                return css`
                    max-width: ${props.maxWidth};
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
                    margin: ${props.margin};
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

export default Button;
