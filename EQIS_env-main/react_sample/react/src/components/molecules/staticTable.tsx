/**
 * Vertical table Style
 */
import * as React from 'react';
import styled, { css } from 'styled-components';
import Text from '@/components/atoms/text';

interface ITableStyle {
    direction?: 'vertical' | 'horizontal';
    required?: boolean;
}

type TColumns = {
    field: string;
    headerName: string;
};

type THorizentalField = {
    [key: string]: React.ReactNode;
};

export interface IHorizentalTableProps {
    columns: TColumns[];
    fields: THorizentalField[];
}

type TVerticalField = {
    field: React.ReactNode | null;
    headerName: string;
    required?: boolean;
};

export interface IVerticalTableProps {
    fields: TVerticalField[];
}

export const HorizentalTable = (props: IHorizentalTableProps) => {
    const { columns, fields } = props;

    return (
        <TableContainer>
            <TableHead direction="horizontal">
                <TableHeadRow>
                    {columns.map((item, index) => (
                        <TableHeadCell key={index}>{item.headerName}</TableHeadCell>
                    ))}
                </TableHeadRow>
            </TableHead>
            <TableBody direction="horizontal">
                {fields.map((item, index) => (
                    <TableRow key={index}>
                        {columns.map(({ field }, idx) => (
                            <TableCell key={idx}>
                                <Text>{item[field]}</Text>
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </TableContainer>
    );
};

export const VerticalTable = (props: IVerticalTableProps) => {
    const { fields } = props;

    return (
        <TableContainer>
            <TableHead direction="vertical">
                {fields.map((item, index) => (
                    <TableHeadRow key={index}>
                        <TableHeadCell required={item.required}>{item.headerName}</TableHeadCell>
                    </TableHeadRow>
                ))}
            </TableHead>
            <TableBody direction="vertical">
                {fields.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{item.field}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </TableContainer>
    );
};

const TableContainer = styled.table`
    width: 100%;
    padding: 0;
    border-spacing: 0;
    border-collapse: collapse;
    display: inline-block;
`;

const TableHead = styled.thead<ITableStyle>`
    ${(props) =>
        props.direction === 'vertical' &&
        css`
            display: inline-block;
        `}
`;

const TableBody = styled.thead<ITableStyle>`
    ${(props) =>
        props.direction === 'vertical' &&
        css`
            display: inline-block;
        `}
`;

const TableHeadRow = styled.tr`
    text-align: right;
    border-left: 1px solid black;
    border-top: 1px solid black;
    height: 45px;
`;

const TableRow = styled.tr`
    background-color: #ffffff;
    border-top: 1px solid black;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
`;

const TableHeadCell = styled.th<ITableStyle>`
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    padding: 5px;
    ${(props) =>
        props.required &&
        css`
            font-weight: 700;
        `}
`;

const TableCell = styled.td`
    text-align: left;
    border-right: 1px solid black;
    padding: 5px;
    height: 27px;
`;
