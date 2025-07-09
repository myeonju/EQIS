import * as React from 'react';

import styled, { css } from 'styled-components';

import Text from '@/components/atoms/text';

import { getImage } from '@/utils/image';

import Icon from '../atoms/icon';

interface Iprops {
    header: string[];
    rowData: string[];
}

const TableList = (props: Iprops) => {
    return (
        <Wrapper>
            <TextSection>
                <Icon src={getImage('ARROW-TRIANGLE-BK')} />
                <Text color="black" size="small" weight="bold">
                    title
                </Text>
            </TextSection>

            <ListSection>
                <Table>
                    <thead>
                        <tr>
                            {props.header.map((headerList) => (
                                <th>
                                    <Text color="darkGray100" size="xsmall" weight="bold">
                                        {headerList}
                                    </Text>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {props.rowData.map((qwe, index) => (
                            <tr key={index}>
                                <td>
                                    <Text color="darkGray100" size="xsmall"></Text>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </ListSection>
        </Wrapper>
    );
};

export default TableList;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const TextSection = styled.section`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const ListSection = styled.section``;

const Table = styled.table`
    table-layout: fixed;
    text-align: center;

    & tr {
        padding: 6px;
    }
    & th,
    & td {
        vertical-align: middle;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        padding: 6px;
    }

    ${(props) => css`
        & > thead > tr > th {
            background-color: ${props.theme.color.gray100};
        }

        & th,
        & td {
            border: 1px solid ${props.theme.color.gray400};
        }
    `}
`;
