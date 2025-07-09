import * as React from 'react';

import styled, { css } from 'styled-components';

import Icon from '@/components/atoms/icon';
import Title from '@/components/atoms/title';

import { getImage } from '@/utils/image';

export interface Iprops {
    currentView?: boolean;
    title?: string;
    children?: React.ReactNode;
}

const Accordion = (props: Iprops) => {
    /**
     * useRef
     */
    const containerRef = React.useRef<HTMLDivElement>(null);

    /**
     * useState
     */
    const [open, setOpen] = React.useState(false);
    const [bodyHeight, setBodyHeight] = React.useState<number>(0);

    /**
     * useEffect
     */
    React.useEffect(() => {
        if (containerRef.current) {
            setBodyHeight(containerRef.current.offsetHeight);
        }
    }, [props.children]);

    React.useEffect(() => {
        if (props.currentView) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [props.currentView]);

    /**
     * event handler
     */
    const handle = {
        toggle: () => {
            setOpen((prev) => !prev);
        },
    };

    return (
        <Wrapper open={open}>
            <Header onClick={handle.toggle}>
                <Title color="black" size="medium" weight="medium">
                    {props.title}
                </Title>
                <Icon src={open ? getImage('ARROW-UP') : getImage('ARROW-DOWN')} />
            </Header>

            <Body open={open} height={bodyHeight}>
                <Container ref={containerRef}>{props.children}</Container>
            </Body>
        </Wrapper>
    );
};

export default Accordion;

const Wrapper = styled.div<{ open: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;

    transition: 0.3s ease-out;

    ${(props) => {
        if (props.open) {
            return css`
                border-bottom: 1px solid ${props.theme.color.gray600};
                padding: 16px 16px 32px;
                gap: 16px;
            `;
        } else {
            return css`
                border-bottom: 1px solid ${props.theme.color.gray300};
                padding: 16px;
                gap: 0;
            `;
        }
    }}
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    cursor: pointer;
`;

const Body = styled.div<{ open: boolean; height: number }>`
    overflow: hidden;

    transition: 0.3s ease-out;

    ${(props) => {
        if (props.open) {
            return css`
                height: ${props.height}px;
                opacity: 1;
            `;
        } else {
            return css`
                height: 0;
                opacity: 0.4;
            `;
        }
    }}
`;

const Container = styled.div``;
