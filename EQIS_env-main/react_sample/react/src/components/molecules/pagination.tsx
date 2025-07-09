/**
 * Pagination Field Style
 */
import * as React from 'react';

import styled, { css } from 'styled-components';

import Button from '@/components/atoms/button';
import Icon from '@/components/atoms/icon';
import Text from '@/components/atoms/text';
import SelectBox from '@/components/molecules/selectBox';
import SelectItem from '@/components/molecules/selectItem';

import { getImage } from '@/utils/image';
import { thousands } from '@/utils/numberformat';

export interface PaginationChageEvent {
    page: number;
    limitCount: number;
}

export interface Iprops {
    itemCount: number; // 아이템 개수
    onChange?: (data: PaginationChageEvent) => void;
}

export const Pagination = (props: Iprops) => {
    const showCount = 5; // 화면에 보이는 페이지 번호 개수
    const limitCountList = [100, 300, 500, 1000]; // 화면에 보이는 페이지 제한 개수 리스트

    /**
     * useState
     */
    const [page, setPage] = React.useState<number>(1); //현재 페이지
    const [totalPageCount, setTotalPageCount] = React.useState<number>(0); // 전체 페이지 수
    const [pageList, setPageList] = React.useState<number[]>([]); // 페이지 리스트
    const [limitCountIndex, setLimitCountIndex] = React.useState<number>(0); // 화면에 보이는 페이지 제한 개수 인덱스
    const [arrowIconOpen, setArrowIconOpen] = React.useState<boolean[]>([false, false, false, false]); // prevAll, prev, next, nextAll

    /**
     * useEffect
     */
    React.useEffect(() => {
        //page 변경될때마다 pageList 리셋
        const startPage = (Math.ceil(page / showCount) - 1) * showCount + 1;
        const endPage = Math.ceil(page / showCount) * showCount;

        const pageList: number[] = [];
        for (let i = startPage; i <= endPage; i++) {
            pageList.push(i);
        }

        setPageList(pageList);
    }, [page]);

    React.useEffect(() => {
        //limitCount 변경될때마다 전체 페이지 수 리셋
        setTotalPageCount(Math.ceil(props.itemCount / limitCountList[limitCountIndex]));
        setPage(1);
    }, [props.itemCount, limitCountIndex]);

    React.useEffect(() => {
        //page, limitCount 변경될때마다 onChange 함수 동작
        props.onChange &&
            props.onChange({
                page,
                limitCount: limitCountList[limitCountIndex],
            });
    }, [page, limitCountIndex]);

    React.useEffect(() => {
        // page, totalPageCount 변경될때마다 ArrowIcon Open여부 설정
        const arrowIconOpen = [false, false, false, false];
        arrowIconOpen[0] = page > showCount;
        arrowIconOpen[1] = page > 1;
        arrowIconOpen[2] = page < totalPageCount;
        arrowIconOpen[3] = Math.ceil(page / showCount) * showCount < totalPageCount;

        setArrowIconOpen(arrowIconOpen);
    }, [page, totalPageCount]);

    /**
     * 이벤트 핸들러
     */
    const handle = {
        clickPage: (page: number) => {
            setPage(page);
        },

        changeLimitCount: (selected: string) => {
            setLimitCountIndex(Number(selected));
        },

        clickPrevAll: () => {
            arrowIconOpen[0] && setPage((Math.ceil(page / showCount) - 1) * showCount);
        },

        clickPrev: () => {
            arrowIconOpen[1] && setPage(page - 1);
        },

        clickNext: () => {
            arrowIconOpen[2] && setPage(page + 1);
        },

        clickNextAll: () => {
            arrowIconOpen[3] && setPage(Math.ceil(page / showCount) * showCount + 1);
        },
    };

    return (
        <Wrapper>
            <ArrowIcon
                src={getImage('PREV-ALL-OFF')}
                disabled={!arrowIconOpen[0]}
                pointer={arrowIconOpen[0]}
                onMouseOver={(e) => arrowIconOpen[0] && (e.currentTarget.src = getImage('PREV-ALL-ON'))}
                onMouseOut={(e) => arrowIconOpen[0] && (e.currentTarget.src = getImage('PREV-ALL-OFF'))}
                onClick={handle.clickPrevAll}
            />

            <ArrowIcon
                src={getImage('PREV-BTN-OFF')}
                disabled={!arrowIconOpen[1]}
                pointer={arrowIconOpen[1]}
                onMouseOver={(e) => arrowIconOpen[1] && (e.currentTarget.src = getImage('PREV-BTN-ON'))}
                onMouseOut={(e) => arrowIconOpen[1] && (e.currentTarget.src = getImage('PREV-BTN-OFF'))}
                onClick={handle.clickPrevAll}
            />

            {pageList.map((indicatorPage) =>
                page === indicatorPage ? (
                    <IndicatorButton currentPage key={indicatorPage}>
                        {indicatorPage}
                    </IndicatorButton>
                ) : (
                    indicatorPage <= totalPageCount && (
                        <IndicatorButton key={indicatorPage} onClick={() => handle.clickPage(indicatorPage)}>
                            {indicatorPage}
                        </IndicatorButton>
                    )
                ),
            )}

            <ArrowIcon
                src={getImage('NEXT-BTN-OFF')}
                disabled={!arrowIconOpen[2]}
                pointer={arrowIconOpen[2]}
                onMouseOver={(e) => arrowIconOpen[2] && (e.currentTarget.src = getImage('NEXT-BTN-ON'))}
                onMouseOut={(e) => arrowIconOpen[2] && (e.currentTarget.src = getImage('NEXT-BTN-OFF'))}
                onClick={handle.clickPrevAll}
            />

            <ArrowIcon
                src={getImage('NEXT-ALL-OFF')}
                disabled={!arrowIconOpen[3]}
                pointer={arrowIconOpen[3]}
                onMouseOver={(e) => arrowIconOpen[3] && (e.currentTarget.src = getImage('NEXT-ALL-ON'))}
                onMouseOut={(e) => arrowIconOpen[3] && (e.currentTarget.src = getImage('NEXT-ALL-OFF'))}
                onClick={handle.clickPrevAll}
            />

            <SelectBox width={105} value={limitCountIndex} onChange={handle.changeLimitCount}>
                {limitCountList.map((limitCount, index) => (
                    <SelectItem key={index} value={index}>
                        {limitCount}
                    </SelectItem>
                ))}
            </SelectBox>

            <Text color="darkGray100" size="xsmall" weight="bold">
                / {thousands(props.itemCount)}
            </Text>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
`;

const ArrowIcon = styled(Icon)<{ disabled: boolean }>`
    ${(props) => {
        if (props.disabled) {
            return css`
                opacity: 0.4;
            `;
        }
    }}
`;

const IndicatorButton = styled(Button)<{ currentPage?: boolean }>`
    width: 32px;
    height: 32px;

    display: flex;
    justify-content: center;
    align-items: center;

    ${(props) => css`
        font-size: ${props.theme.font.size.xsmall};

        &:hover {
            font-weight: ${props.theme.font.weight.medium};
            color: ${props.theme.color.white};
            background-color: ${props.theme.color.brown200};
        }
    `}

    ${(props) => {
        if (props.currentPage) {
            return css`
                font-weight: ${props.theme.font.weight.medium};
                color: ${props.theme.color.white};
                background-color: ${props.theme.color.brown200};
            `;
        }
    }}
`;
