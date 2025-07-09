import * as React from 'react';

import { ResponsivePie } from '@nivo/pie';
import styled, { css } from 'styled-components';

interface IWrapper {
    width?: number | string | false;
    height?: number | string | false;
}

export interface Iprops extends IWrapper {
    data: object[]; // pie에 보여질 데이터
    innterRadius?: number; // 파이 중간 빈공간 반지름 크기
    padAngle?: number; // pad별 간격
    cornerRadius: number; // pad 간격이 존재할 시 pad에 radius 설정
    color?: string[]; // pad 색상
    arcLinkLabelsTextColor?: string; // link 글씨 색상
    labelFontSize?: number; // pad label 크기
    labelTextColor?: string; // pad label 색상
    legendItemSpacing?: number; //legend별 간격
    legendSymbolSize?: number; // legend symbol 크기
    legendFontSize?: number; // legend 글씨 크기
    legendTextColor?: string; // legend 글씨 색상
    pieClickEvent?: (data?: any) => void; // pie 클릭 이벤트
    legendClickEvent?: (data?: any) => void; // legend 클릭 이벤트
}

const Piechart = (props: Iprops) => {
    return (
        <Wrapper width={props.width} height={props.height}>
            <ResponsivePie
                data={props.data}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={props.innterRadius}
                padAngle={props.padAngle}
                cornerRadius={props.cornerRadius}
                colors={props.color}
                borderWidth={2}
                arcLinkLabelsSkipAngle={0}
                arcLinkLabelsTextColor={props.arcLinkLabelsTextColor}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                onClick={(e) => props.pieClickEvent && props.pieClickEvent(e.data)}
                theme={{
                    labels: {
                        text: {
                            fontSize: props.labelFontSize,
                            fill: props.labelTextColor,
                        },
                    },
                    legends: {
                        text: {
                            fontSize: props.labelFontSize,
                            fill: props.labelTextColor,
                        },
                    },
                }}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: props.legendItemSpacing,
                        itemWidth: 100,
                        itemHeight: 30,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.7,
                        symbolSize: props.legendSymbolSize,
                        symbolShape: 'circle',
                        onClick: (e: any) => props.legendClickEvent && props.legendClickEvent(e.data),
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

export default Piechart;

const Wrapper = styled.div<IWrapper>`
    ${(props) => {
        switch (props.width) {
            case 'small':
                return css`
                    width: 320px;
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
                    height: 360;
                `;

            case 'full':
                return css`
                    height: 100%;
                `;
        }
    }}
`;
