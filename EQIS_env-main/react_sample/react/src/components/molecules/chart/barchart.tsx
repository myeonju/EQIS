import * as React from 'react';

import { BarDatum, ResponsiveBar } from '@nivo/bar';
import styled, { css } from 'styled-components';

export const BarchartType = {
    colorByType: ['id', 'indexValue'] as const,
};

interface IWrapper {
    width?: number | string | false;
    height?: number | string | false;
}

export interface Iprops extends IWrapper {
    data: BarDatum[]; // bar에 보여질 데이터
    keys: string[]; // bar에 보여질 데이터 키값
    indexBy: string; // bar가 그려지는 index 키값
    bottomLegendText: string; // 하단 legend 글씨
    leftLegendText: string; // 좌측 legend 글씨
    padding?: number; // bar간 간격
    colors?: string[]; // bar 색상
    colorBy?: typeof BarchartType.colorByType[number]; // bar 색상 적용 기준, 'id' || 'indexValue'
    labelFontSize?: number; // label 크기
    labelTextColor?: string; // label 색상
    legendFontSize?: number; // legend 글씨 크기
    legendTextColor?: string; // legend 글씨 색상
    legendSymbolSize?: number; // legend symbol 크기
    legendItemSpacing?: number; // legend별 간격
    axisLegendFontSize?: number; // axis legend 글씨 크기
    axisLegendTextColor?: string; // axis legend 글씨 색상
    axisTicksFontSize?: number; // axis tick 글씨 크기
    axisTicksFontColor?: string; // axis tick 글씨 색상
    barClickEvent?: (data?: any) => void; //bar 클릭 이벤트
    legendClickEvent?: (data?: any) => void; // legend 클릭 이벤트
}

const Barchart = (props: Iprops) => {
    return (
        <Wrapper width={props.width} height={props.height}>
            <ResponsiveBar
                data={props.data}
                keys={props.keys}
                indexBy={props.indexBy}
                margin={{ top: 50, right: 130, bottom: 60, left: 80 }}
                padding={props.padding}
                colors={props.colors}
                colorBy={props.colorBy}
                onClick={props.barClickEvent}
                theme={{
                    labels: {
                        text: {
                            fontSize: props.labelFontSize,
                            fill: props.labelTextColor,
                        },
                    },
                    legends: {
                        text: {
                            fontSize: props.legendTextColor,
                            fill: props.legendTextColor,
                        },
                    },
                    axis: {
                        legend: {
                            text: {
                                fontSize: props.axisLegendFontSize,
                                fill: props.axisLegendTextColor,
                            },
                        },

                        ticks: {
                            text: {
                                fontSize: props.axisTicksFontSize,
                                fill: props.axisTicksFontColor,
                            },
                        },
                    },
                }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 0,
                    tickRotation: 0,
                    legend: props.bottomLegendText,
                    legendPosition: 'middle',
                    legendOffset: 42,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 0,
                    tickRotation: 0,
                    legend: props.leftLegendText,
                    legendPosition: 'middle',
                    legendOffset: -60,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: props.legendItemSpacing,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: props.legendSymbolSize,
                        onClick: props.legendClickEvent,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
            />
        </Wrapper>
    );
};

export default Barchart;

const Wrapper = styled.div<IWrapper>`
    ${(props) => {
        switch (props.width) {
            case 'small':
                return css`
                    width: 360px;
                `;

            case 'full':
                return css`
                    width: 100%;
                `;
        }
    }}

    ${(props) => {
        switch (props.height) {
            case 'small':
                return css`
                    height: 360px;
                `;

            case 'full':
                return css`
                    height: 100%;
                `;
        }
    }}
`;
