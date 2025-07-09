import * as React from 'react';

import styled, { css } from 'styled-components';

import Icon from '@/components/atoms/icon';
import Text from '@/components/atoms/text';

interface Iprops {
    hoverOnIcon: string;
    hoverOffIcon: string;
    text?: string;
    count: number;
    onClickWrapper: () => void;
}

const TodoBox = (props: Iprops) => {
    /**
     * useState
     */
    const [isHover, setIsHover] = React.useState<boolean>(false);

    /**
     * event handler
     */
    const handle = {
        wrapperMouseEnter: () => {
            setIsHover(true);
        },

        wrapperMouseLeave: () => {
            setIsHover(false);
        },
    };
    return (
        <Wrapper
            onClick={props.onClickWrapper}
            onMouseEnter={handle.wrapperMouseEnter}
            onMouseLeave={handle.wrapperMouseLeave}
        >
            <Header>
                <Icon src={isHover ? props.hoverOnIcon : props.hoverOffIcon} />
                <HeaderText size="small" weight="medium" color="darkGray100">
                    {props.text}
                </HeaderText>
            </Header>

            <Footer>
                <Text size="2xlarge" weight="bold" color="black">
                    {props.count}
                </Text>
            </Footer>
        </Wrapper>
    );
};

export default TodoBox;

const Wrapper = styled.div`
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 13px;

    padding: 24px;

    cursor: pointer;

    height: 172px;

    ${(props) => css`
        border: 1px solid ${props.theme.color.gray400};

        &:hover {
            background-color: ${props.theme.color.gray200};
        }
    `}
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
`;

const HeaderText = styled(Text)`
    white-space: nowrap;
`;

const Footer = styled.div``;
