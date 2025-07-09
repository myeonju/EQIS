import * as React from 'react';

import { UseFormRegisterReturn } from 'react-hook-form';
import styled, { css } from 'styled-components';

import Icon from '@/components/atoms/icon';
import Input from '@/components/atoms/input';
import Text from '@/components/atoms/text';
import SelectItem from '@/components/molecules/selectItem';

import { _recoilLang } from '@/modules/recoil/lang';

import theme from '@/styles/theme';

import { getImage } from '@/utils/image';

export const SelectBoxProps = {
    color: ['default', 'error'] as const,
    size: [] as const,
};

interface Iselected {
    value: number | string;
    name: string;
}

interface IWrapper {
    width?: number | string;
    margin?: number | string;
    padding?: number | string;
    className?: string;
    style?: React.CSSProperties;
}

interface IContainer {
    color?: typeof SelectBoxProps.color[number];
    size?: typeof SelectBoxProps.size[number];
    height?: number | string;
    disabled?: boolean;
}

interface IItemList {
    openItemList: boolean;
    itemListTop: number;
    itemListOverflow: boolean;
}

export interface Iprops extends IWrapper, IContainer {
    value?: number | string;
    children?: React.ReactNode;
    multiple?: boolean;
    errorLabel?: string;
    register?: UseFormRegisterReturn;
    all?: boolean;
    select?: boolean;
    onChange?: (selected: string) => void;
}

const SelectBox = React.forwardRef((props: Iprops, ref) => {
    /**
     * ListItem 선택시 사용될 Style
     */
    const listItemCss = `
        background-color: ${theme.color.gray200};
    `;

    /**
     * value 구분자
     */
    const seperator = ',';

    /**
     * recoil
     */
    const recoilLang = _recoilLang();

    /**
     * useSate
     */
    const [selectedList, setSelectedList] = React.useState<Iselected[]>([]);
    const [openItemList, setOpenItemList] = React.useState<boolean>(false);
    const [itemListTop, setItemListTop] = React.useState<number>(0);
    const [itemListOverflow, setItemListOverflow] = React.useState<boolean>(false);

    /**
     * useRef
     */
    const container = React.useRef<HTMLDivElement>(null);
    const itemList = React.useRef<HTMLUListElement>(null);
    const wrapper = React.useRef<HTMLDivElement>(null);

    /**
     * useEffect
     */
    React.useEffect(() => {
        // list top 설정
        itemListTopConfig();

        // 다국어
        const langCodeList: string[] = [''];
        recoilLang.langInit(langCodeList);

        // click wondow 설정
        window.addEventListener('click', handle.clickWindow);

        return () => {
            window.removeEventListener('click', handle.clickWindow);
        };
    }, []);

    React.useEffect(() => {
        checkItemList();
    }, [props.value, recoilLang.translate('')]);

    React.useEffect(() => {
        if (itemList.current) {
            if (itemList.current.getBoundingClientRect().bottom > window.innerHeight) {
                setItemListOverflow(true);
            } else {
                setItemListOverflow(false);
            }
        }
    }, [openItemList]);

    // multiple이 true에서 false로 바뀌면 첫 번째 인덱스 제외하고 다 제거하기
    React.useEffect(() => {
        if (!props.multiple && selectedList.length > 1 && itemList.current) {
            const childNodes = itemList.current.childNodes;
            childNodes.forEach((childNode) => {
                const target = childNode as HTMLLIElement;
                const targetValue = target.getAttribute('value') as string;

                if (targetValue != selectedList[0].value) {
                    target.style.cssText = ``;
                }
            });

            const sliceSelectedList = selectedList.slice();
            sliceSelectedList.splice(1);

            setSelectedList(sliceSelectedList);
            props.onChange && props.onChange(getSelectedListValueString(sliceSelectedList));
        }
    }, [props.multiple]);

    /**
     * ItemList Top 구하기
     */
    const itemListTopConfig = () => {
        if (container.current) {
            setItemListTop(container.current.offsetHeight);
        }
    };

    /**
     * props로 넘어온 value들 중 ItemList 있는 데이터들 확인
     */
    const checkItemList = () => {
        if (itemList.current) {
            const childNodes = itemList.current.childNodes;
            const selectedList: Iselected[] = [];
            const value = props.value ?? '';

            if (props.multiple) {
                childNodes.forEach((childNode) => {
                    const target = (childNode as HTMLLIElement).childNodes[0] as HTMLLIElement;
                    const targetValue = target.getAttribute('value') as string;
                    const name = target.textContent as string;

                    if (String(value).split(seperator).includes(targetValue)) {
                        const selected: Iselected = {
                            value: targetValue,
                            name,
                        };

                        selectedList.push(selected);
                        target.style.cssText = listItemCss;
                    } else {
                        target.style.cssText = '';
                    }
                });
            } else {
                childNodes.forEach((childNode) => {
                    const target = (childNode as HTMLLIElement).childNodes[0] as HTMLLIElement;
                    const targetValue = target.getAttribute('value') as string;
                    const name = target.textContent as string;

                    if (value == targetValue) {
                        const selected: Iselected = {
                            value: targetValue,
                            name,
                        };

                        if (selectedList.length !== 0) {
                            selectedList[0] = selected;
                        } else {
                            selectedList.push(selected);
                        }

                        target.style.cssText = listItemCss;
                    } else {
                        target.style.cssText = '';
                    }
                });
            }

            setSelectedList(selectedList);
        }
    };

    /**
     * selectedList value 조인 문자열
     */
    const getSelectedListValueString = (selectedList: Iselected[]) => {
        const valueList: (number | string)[] = [];
        selectedList.forEach((selected) => valueList.push(selected.value));

        return valueList.join(seperator);
    };

    /**
     * selectedList name 조인 문자열
     */
    const getSelectedListNameString = () => {
        const nameList: string[] = [];
        selectedList.forEach((selected) => nameList.push(selected.name));

        return nameList.join(seperator);
    };

    /**
     * event handler
     */
    const handle = {
        // 아이템 선택
        selectItem: (e: React.MouseEvent<HTMLUListElement>) => {
            e.stopPropagation();

            const target = e.target as HTMLLIElement;
            const targetValue = target.getAttribute('value') as string;
            const name = target.innerText;
            let sliceSelectedList = selectedList.slice();

            if (targetValue != null) {
                if (props.multiple) {
                    // 선택된 데이터를 선택한 경우
                    if (sliceSelectedList.find((sliceSelected) => sliceSelected.value == targetValue)) {
                        // all, select 등의 빈 문자열 값이 아닌 경우
                        if (targetValue) {
                            sliceSelectedList = sliceSelectedList.filter(
                                (sliceSelected) => sliceSelected.value !== targetValue,
                            );
                            target.style.cssText = '';

                            // 선택된 값이 비워지게 된 경우
                            if (sliceSelectedList.length <= 0) {
                                // all, select 등의 빈 문자열이 사용되고 있을 경우 데이터 적재
                                if (itemList.current) {
                                    const childNodes = itemList.current.childNodes;
                                    const target = (childNodes[0] as HTMLDivElement).childNodes[0] as HTMLLIElement;
                                    const targetValue = target.getAttribute('value') as string;
                                    const name = target.textContent as string;

                                    if (!targetValue) {
                                        const selected: Iselected = {
                                            value: targetValue,
                                            name,
                                        };

                                        sliceSelectedList.push(selected);
                                        target.style.cssText = listItemCss;
                                    }
                                }
                            }
                        }
                    }

                    // 선택되지 않은 데이터를 선택한 경우
                    else {
                        // all, select 등의 빈 문자열 값이 아닌 경우
                        if (targetValue) {
                            // all, select 등의 빈 문자열 제거하기
                            if (itemList.current) {
                                const childNodes = itemList.current.childNodes;
                                childNodes.forEach((childNode) => {
                                    const target = (childNode as HTMLDivElement).childNodes[0] as HTMLLIElement;
                                    const targetValue = target.getAttribute('value') as string;

                                    if (!targetValue) {
                                        target.style.cssText = ``;
                                    }
                                });

                                sliceSelectedList = sliceSelectedList.filter((sliceSelected) => !!sliceSelected.value);
                            }
                        }

                        // all, select 등의 빈 문자열인 경우
                        else {
                            // 저장되어 있던 모든 데이터 제거하기
                            if (itemList.current) {
                                const childNodes = itemList.current.childNodes;
                                childNodes.forEach((childNode) => {
                                    const target = (childNode as HTMLDivElement).childNodes[0] as HTMLLIElement;
                                    target.style.cssText = ``;
                                });
                            }

                            sliceSelectedList = [];
                        }

                        // 데이터 적재
                        const selected: Iselected = {
                            value: targetValue,
                            name,
                        };

                        sliceSelectedList.push(selected);
                        target.style.cssText = listItemCss;
                    }
                } else {
                    if (itemList.current) {
                        const childNodes = itemList.current.childNodes;
                        childNodes.forEach((childNode) => {
                            const target = (childNode as HTMLDivElement).childNodes[0] as HTMLLIElement;
                            target.style.cssText = ``;
                        });

                        const selected: Iselected = {
                            value: targetValue,
                            name,
                        };

                        if (sliceSelectedList.length !== 0) {
                            sliceSelectedList[0] = selected;
                        } else {
                            sliceSelectedList.push(selected);
                        }

                        target.style.cssText = listItemCss;

                        setOpenItemList(false);
                    }
                }

                setSelectedList(sliceSelectedList);
                props.onChange && props.onChange(getSelectedListValueString(sliceSelectedList));
            }
        },

        // 셀렉트박스 클릭
        clickContainer: () => {
            if (!props.disabled) {
                // 다른 셀렉트박스 영향 고려하여 window 이벤트 실행 후 실행될 수 있도록 설정 (더 좋은 코드 고려 필요)
                setTimeout(() => {
                    setOpenItemList(!openItemList);
                }, 0);
            }
        },

        // 셀렉트박스 외부 클릭
        clickWindow: () => {
            setOpenItemList(false);
        },
    };

    return (
        <Wrapper
            ref={wrapper}
            width={props.width}
            margin={props.margin}
            padding={props.padding}
            className={props.className}
            style={props.style}
        >
            <Container
                ref={container}
                color={props.color}
                size={props.size}
                height={props.height}
                disabled={props.disabled}
                onClick={handle.clickContainer}
            >
                <TextInput
                    type="text"
                    width="100%"
                    value={getSelectedListNameString()}
                    readOnly
                    ref={ref as React.RefObject<HTMLInputElement>}
                />

                <Icon src={getImage('ARROW-DOWN')} />
            </Container>

            {props.errorLabel && (
                <Text color="vivid200" style={{ fontSize: '11px' }}>
                    {props.errorLabel}
                </Text>
            )}

            <ItemList
                ref={itemList}
                openItemList={openItemList}
                itemListTop={itemListTop}
                itemListOverflow={itemListOverflow}
                onClick={handle.selectItem}
            >
                {props.all && <SelectItem value="">전체</SelectItem>}
                {props.select && <SelectItem value="">선택</SelectItem>}
                {props.children}
            </ItemList>
        </Wrapper>
    );
});

export default SelectBox;

const Wrapper = styled.div<IWrapper>`
    position: relative;

    ${(props) => {
        if (props.theme.device.deskTop) {
            return css`
                width: 388px;
            `;
        }
    }}

    ${(props) => {
        if (props.theme.device.mobile) {
            return css`
                width: 100%;
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

const Container = styled.div<IContainer>`
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 12px;

    ${(props) => {
        switch (props.color) {
            case 'error':
                return css`
                    background-color: ${props.theme.color.vivid100};
                    border: 1px solid ${props.theme.color.vivid200};

                    & > input {
                        color: ${props.theme.color.darkGray100};
                    }
                `;

            default:
                return css`
                    background-color: ${props.theme.color.white};
                    border: 1px solid ${props.theme.color.gray500};

                    &:hover {
                        border: 1px solid ${props.theme.color.black};
                    }

                    & > input {
                        color: ${props.theme.color.darkGray100};
                    }
                `;
        }
    }}

    ${(props) => {
        switch (props.size) {
            default: {
                if (props.theme.device.deskTop) {
                    return css`
                        height: 32px;

                        & > input {
                            font-size: ${props.theme.font.size.xsmall};
                        }

                        & > img {
                            width: 16px;
                            height: 16px;
                        }
                    `;
                }

                if (props.theme.device.mobile) {
                    return css`
                        height: 44px;

                        & > input {
                            font-size: ${props.theme.font.size.xsmall};
                        }

                        & > img {
                            width: 16px;
                            height: 16px;
                        }
                    `;
                }
            }
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
        if (props.disabled) {
            return css`
                border: 1px solid ${props.theme.color.gray500};
                color: ${props.theme.color.gray500};
                background-color: ${props.theme.color.gray300};

                &:hover {
                    border: 1px solid ${props.theme.color.gray500};
                }

                & > input {
                    cursor: auto;
                }
            `;
        } else {
            return css`
                cursor: pointer;

                & > input {
                    cursor: pointer;
                }

                & + ul {
                    cursor: pointer;
                }
            `;
        }
    }}
`;

const ItemList = styled.ul<IItemList>`
    position: absolute;
    width: 100%;

    border-radius: 6px;

    z-index: 500;

    overflow: auto;

    display: block;

    ${(props) => css`
        border: 1px solid ${props.theme.color.gray800};
        box-shadow: 0 0 3px 1px ${props.theme.color.gray800};
        background-color: ${props.theme.color.white};
        max-height: 240px;
    `}

    ${(props) => {
        if (props.openItemList) {
            return css`
                visibility: visible;
            `;
        } else {
            return css`
                visibility: hidden;
            `;
        }
    }}

    ${(props) => {
        if (props.itemListOverflow) {
            return css`
                bottom: 0;
            `;
        } else {
            return css`
                top: ${props.itemListTop}px;
            `;
        }
    }}
`;

const TextInput = styled(Input)`
    border: none;

    ${(props) => css`
        background-color: ${props.theme.color.none};
    `}
`;
