import * as React from 'react';

import styled, { css } from 'styled-components';

import Icon from '@/components/atoms/icon';
import Line from '@/components/atoms/line';
import Text from '@/components/atoms/text';

import { getImage } from '@/utils/image';

export interface Itab {
    label: string;
    new?: boolean;
}

interface Iprops {
    tabList: Itab[];
    currentIndex?: number;
    new?: boolean;
    onChange: (index: number) => void;
    children: React.ReactNode;
}

const Tab = (props: Iprops) => {
    /**
     * useState
     */
    const [currentIndex, setcurrentIndex] = React.useState<number>(props.currentIndex ?? 0);

    /**
     * handle
     */
    const handle = {
        clickTabItem: (index: number) => {
            setcurrentIndex(index);
            props.onChange(index);
        },
    };

    return (
        <Wrapper>
            <Header>
                <TabList>
                    {props.tabList.map((tab, index) => (
                        <TabItem
                            key={index}
                            currentItem={index === currentIndex}
                            onClick={() => handle.clickTabItem(index)}
                        >
                            {tab.new && <Icon src={getImage('TOOLTIP')} title="new" />}
                            <Text size="small" weight="bold">
                                {tab.label}
                            </Text>
                        </TabItem>
                    ))}
                </TabList>
            </Header>
            <Body>{props.children}</Body>
        </Wrapper>
    );
};

export default Tab;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const Header = styled.header`
    padding: 24px 0;

    overflow-x: auto;

    ${(props) => css`
        border-bottom: 1px solid ${props.theme.color.gray400};
    `}
`;

const TabList = styled.ul`
    display: flex;
    align-items: center;

    width: max-content;
`;

const TabItem = styled.li<{ currentItem: boolean }>`
    width: 146px;
    height: 32px;

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;

    padding: 6px 8px;

    ${(props) => {
        if (props.currentItem) {
            return css`
                background-color: ${props.theme.color.brown100};

                &:hover {
                    background-color: ${props.theme.color.brown200};
                }

                & > span {
                    color: ${props.theme.color.white};
                }
            `;
        } else {
            return css`
                background-color: ${props.theme.color.white};
                border: 1px solid ${props.theme.color.gray600};

                &:hover {
                    border: 1px solid ${props.theme.color.darkGray100};
                }

                & > span {
                    color: ${props.theme.color.darkGray100};
                }
            `;
        }
    }}
`;

const Body = styled.article``;
