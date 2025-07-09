import * as React from 'react';

import { CellStyle, GetDataPath } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Button from '@/components/atoms/button';
import Text from '@/components/atoms/text';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

export interface IdownloadLink {
    link: string;
    name?: string;
}

interface IWrapper {
    width?: number | string;
    height?: number | string;
    className?: string;
    style?: React.CSSProperties;
}

export interface Iprops extends IWrapper {
    rowData: object[]; // grid에 보여질 rowData
    fields: string[]; // rowData에 사용되는 field
    headerNames: string[]; // field의 header 이름
    widths: (number | undefined)[]; // field 너비
    headerHeight?: number; // header 높이
    groupHeaderHeight?: number; // colGroup header 높이
    selections?: boolean[]; // field별  checkbox 사용 여부
    rowGroups?: boolean[]; // row 그룹화 대상 여부
    rowGroupSelection?: boolean; // row 그룹 checkbox 사용 여부
    rowGroupHeaderName?: string; // row 그룹 header 이름
    rowGroupWidth?: number; // row 그룹 width
    hides?: boolean[]; // row 그룹화 대상 데이터 숨김 여부
    pinneds?: string[]; // 컬럼 고정 여부 (left or right)
    buttons?: {
        label?: string; // 버튼에 사용될 라벨
        clickEvent?: (rowdata: any) => void; // 버튼 클릭 이벤트
    }[];
    colGroups?: {
        headerName: string; // col 그룹화 header 이름
        children: string[]; // col 그룹화될 대상 field
    }[];
    single?: boolean; // 그리드 row 단일 멀티 선택 여부 (single or multiple)
    treeData?: boolean;
    newTab?: boolean;
    getDataPath?: GetDataPath;
    getRowHeightSelector?: (rowdata: any) => number;
    cellStyleSelector?: (field: string, rowdata: any) => CellStyle | null;
    linkSelector?: (field: string, rowdata: any) => string; // field별 사용될 link
    downloadLinkSelector?: (field: string, rowdata: any) => IdownloadLink | undefined; // field별 사용될 link
    getSelectedRowData?: (rowdata: any) => void;
    getClickRowData?: (rowdata: any) => void;
}

interface IcolumnDef {
    field: string;
    headerName: string;
    width?: number;
    flex?: number;
    checkboxSelection?: boolean;
    headerCheckboxSelection?: boolean;
    pinned?: string;
    rowGroup?: boolean;
    hide?: boolean;
    cellStyle?: (params: any) => CellStyle | null;
    cellRenderer?: (params: any) => void;
}

interface IgroupColumnDef {
    headerName: string;
    children: IcolumnDef[];
}

const Grid = (props: Iprops) => {
    /**
     * useState
     */
    const [columnWidthDefs, setColumnWidthDefs] = React.useState<(IcolumnDef | IgroupColumnDef)[]>([]);
    const [columnFlexDefs, setColumnFlexDefs] = React.useState<(IcolumnDef | IgroupColumnDef)[]>([]);

    /**
     * useRef
     */
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const agGridReactRef = React.useRef<AgGridReact>(null);

    /**
     * useEffect
     */
    React.useEffect(() => {
        columnDefConfig();
        window.addEventListener('resize', columnDefConfig);

        return () => {
            window.removeEventListener('resize', columnDefConfig);
        };
    }, [props.rowData, props.headerNames]);

    /**
     * columnDefConfig
     */
    const columnDefConfig = () => {
        if (wrapperRef.current) {
            const wrapperWidth = wrapperRef.current.offsetWidth;
            let sumColumnWidth = 0;

            // width인지 flex인지 구분하기 위해 전체 width 계산
            props.fields.forEach((field, index) => {
                // rowGroup이 있는 경우
                if (props.rowGroups) {
                    if (!props.rowGroups[index]) {
                        if (props.widths && props.widths[index]) {
                            sumColumnWidth += props.widths[index] as number;
                        } else {
                            sumColumnWidth += 200;
                        }
                    }
                }

                // rowGroup이 없는 경우
                else {
                    if (props.widths && props.widths[index]) {
                        sumColumnWidth += props.widths[index] as number;
                    } else {
                        sumColumnWidth += 200;
                    }
                }
            });

            // rowGroup이 있는 경우 마지막에 rowGroupWidth 더해주기
            if (props.rowGroups) {
                if (props.rowGroupWidth) {
                    sumColumnWidth += props.rowGroupWidth;
                } else {
                    sumColumnWidth += 200;
                }
            }

            // columnDef 설정
            let columnDefs: IcolumnDef[] = props.fields.map((field, index) => {
                const columnDef: IcolumnDef = {
                    field,
                    headerName: props.headerNames[index],
                    width: sumColumnWidth >= wrapperWidth ? props.widths[index] : undefined,
                    flex: sumColumnWidth < wrapperWidth ? props.widths[index] : undefined,
                    checkboxSelection: props.selections && props.selections[index],
                    pinned: props.pinneds && props.pinneds[index],
                    headerCheckboxSelection: !props.single && props.selections && props.selections[index],
                    rowGroup: props.rowGroups && props.rowGroups[index],
                    hide: props.hides && props.hides[index],
                    cellStyle: (params) =>
                        props.cellStyleSelector ? props.cellStyleSelector(field, params.data) : null,
                    cellRenderer: (params) =>
                        renderer(
                            params,
                            props.buttons && props.buttons[index]?.label,
                            props.buttons && props.buttons[index]?.clickEvent,
                            props.linkSelector && props.linkSelector(field, params.data),
                            props.downloadLinkSelector && props.downloadLinkSelector(field, params.data),
                        ),
                };

                return columnDef;
            });

            // colGroup 설정
            if (props.colGroups) {
                const mixedColumnDefs: (IcolumnDef | IgroupColumnDef)[] = [];
                const groupColumnDefs: IgroupColumnDef[] = props.colGroups.map((colGroup) => {
                    const groupColumnDef: IgroupColumnDef = {
                        headerName: colGroup.headerName,
                        children: [],
                    };

                    columnDefs.forEach((columnDef) => {
                        if (colGroup.children.includes(columnDef.field)) {
                            groupColumnDef.children.push(columnDef);
                        }
                    });

                    columnDefs = columnDefs.filter(
                        (columnDef) => !groupColumnDef.children.find((child) => child.field === columnDef.field),
                    );

                    return groupColumnDef;
                });

                columnDefs.forEach((columnDef) => {
                    mixedColumnDefs.push(columnDef);
                });

                groupColumnDefs.forEach((groupColumnDefs) => {
                    mixedColumnDefs.push(groupColumnDefs);
                });

                // flex가 한번 적용되면 width로 되돌아오지 않기 때문에 width, flex columnDefs를 따로 관리
                if (sumColumnWidth >= wrapperWidth) {
                    setColumnWidthDefs(mixedColumnDefs);
                    setColumnFlexDefs([]);
                } else {
                    setColumnWidthDefs([]);
                    setColumnFlexDefs(mixedColumnDefs);
                }
            } else {
                // flex가 한번 적용되면 width로 되돌아오지 않기 때문에 width, flex columnDefs를 따로 관리
                if (sumColumnWidth >= wrapperWidth) {
                    setColumnWidthDefs(columnDefs);
                    setColumnFlexDefs([]);
                } else {
                    setColumnWidthDefs([]);
                    setColumnFlexDefs(columnDefs);
                }
            }
        }
    };

    /**
     * 필드별 공통 설정
     */
    const defaultColDef = React.useMemo(() => {
        return {
            sortable: true,
            filter: true,
            resizable: true,
        };
    }, []);

    /**
     * 그룹화 공통 설정
     */
    const autoGroupColumnDef = React.useMemo(() => {
        return {
            resizable: true,
            headerName: props.rowGroupHeaderName ? props.rowGroupHeaderName : 'Group',
            width: props.rowGroupWidth,
            cellRenderParams: {
                checkbox: props.rowGroupSelection,
            },
        };
    }, [props.rowGroupHeaderName]);

    /**
     * renderer 설정 (버튼, 이미지 등)
     */
    const renderer = (
        params: any,
        buttonLabel?: string,
        buttonClickEvent?: (rowdata: any) => void,
        link?: string,
        downloadLink?: IdownloadLink,
    ) => {
        return (
            <Renderer.Container>
                {buttonLabel && buttonClickEvent && !params.node.group && (
                    <LinkText pointer onClick={() => buttonClickEvent(params.data)}>
                        {params.value}
                    </LinkText>
                )}

                {/** 버튼등록 케이스 */}
                {buttonLabel && buttonClickEvent && !params.node.group && (
                    <Button height={20} padding="2px 6px" onClick={() => buttonClickEvent(params.data)}>
                        {buttonLabel}
                    </Button>
                )}

                {/** 링크등록 케이스 */}
                {!buttonLabel && !buttonClickEvent && link && (
                    <Link to={link} target={props.newTab ? '_blank' : ''}>
                        <LinkText pointer color="black">
                            {params.value}
                        </LinkText>
                    </Link>
                )}

                {/** 다운로드 링크등록 케이스 */}
                {!buttonLabel && !buttonClickEvent && downloadLink && (
                    <DownloadLink href={downloadLink.link} download={downloadLink.name}>
                        <LinkText pointer color="black">
                            {params.value}
                        </LinkText>
                    </DownloadLink>
                )}

                {/** default */}
                {!buttonLabel && !buttonClickEvent && !link && !downloadLink && params.value}
            </Renderer.Container>
        );
    };

    /**
     * evnet handler
     */
    const handle = {
        onRowSelected: () => {
            if (agGridReactRef.current && props.getSelectedRowData) {
                const selectedNodes = agGridReactRef.current.api.getSelectedNodes();
                const selectedRowData = selectedNodes.map((node) => node.data);

                props.getSelectedRowData(selectedRowData);
            }
        },

        onRowClicked: (rowData: any) => {
            if (agGridReactRef.current && props.getClickRowData) {
                props.getClickRowData(rowData.data);
            }
        },
    };

    return (
        <Wrapper
            ref={wrapperRef}
            className="ag-theme-alpine"
            width={props.width}
            height={props.height}
            style={props.style}
        >
            {columnWidthDefs.length > 0 && (
                <GridReact
                    ref={agGridReactRef}
                    rowData={props.rowData}
                    columnDefs={columnWidthDefs}
                    defaultColDef={defaultColDef}
                    autoGroupColumnDef={autoGroupColumnDef}
                    headerHeight={props.headerHeight}
                    groupHeaderHeight={props.groupHeaderHeight}
                    getRowHeight={(params) => props.getRowHeightSelector && props.getRowHeightSelector(params.data)}
                    animateRows={true}
                    groupSelectsChildren={true}
                    groupDefaultExpanded={-1} // 자동 펼치기
                    suppressRowClickSelection={true}
                    rowSelection={props.single ? 'single' : 'multiple'}
                    onRowSelected={handle.onRowSelected}
                    overlayNoRowsTemplate={'<span>no rows to show</span>'}
                    className={props.className}
                    treeData={props.treeData}
                    getDataPath={props.getDataPath}
                    onRowClicked={handle.onRowClicked}
                />
            )}

            {columnFlexDefs.length > 0 && (
                <GridReact
                    ref={agGridReactRef}
                    rowData={props.rowData}
                    columnDefs={columnFlexDefs}
                    defaultColDef={defaultColDef}
                    autoGroupColumnDef={autoGroupColumnDef}
                    headerHeight={props.headerHeight}
                    groupHeaderHeight={props.groupHeaderHeight}
                    getRowHeight={(params) => props.getRowHeightSelector && props.getRowHeightSelector(params.data)}
                    animateRows={true}
                    groupSelectsChildren={true}
                    groupDefaultExpanded={-1} // 자동 펼치기
                    suppressRowClickSelection={true}
                    rowSelection={props.single ? 'single' : 'multiple'}
                    onRowSelected={handle.onRowSelected}
                    overlayNoRowsTemplate={'<span>no rows to show</span>'}
                    className={props.className}
                    treeData={props.treeData}
                    getDataPath={props.getDataPath}
                    onRowClicked={handle.onRowClicked}
                />
            )}
        </Wrapper>
    );
};

export default Grid;

const Wrapper = styled.div<IWrapper>`
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
`;

const GridReact = styled(AgGridReact)`
    .ag-header-cell-label {
        justify-content: content; // 헤더 이름 가운데 정렬
    }

    .ag-header-group-cell-label {
        justify-content: center; // 그룹 헤더 이름 가운데 정렬
    }

    .ag-row-group div.ag-cell-wrapper .ag-selection-checkbox {
        display: none !important; // 그룹화 된 cell 요소들은 checkbox 제거
    }

    ${(props) => css`
        .ag-header-row-column {
            background-color: ${props.theme.color.gray300}; // 헤더 색상
        }

        .ag-header-row-column-group {
            background-color: ${props.theme.color.gray300}; // 그룹 헤더 색상
        }
    `}
`;

const Renderer = {
    Container: styled.div`
        display: block;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    `,
};

const LinkText = styled(Text)`
    ${(props) => css`
        &:hover {
            color: ${props.theme.color.cyan200};
            text-decoration: underline;
        }
    `}
`;

const DownloadLink = styled.a``;
