import * as React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import reset from 'styled-reset';
import * as yup from 'yup';

import { _axios } from '@/apis/axios';

import Button from '@/components/atoms/button';
import Text from '@/components/atoms/text';
import Desktop from '@/components/molecules/device/desktop';
import Mobile from '@/components/molecules/device/mobile';
import Grid from '@/components/molecules/grid';
import SearchModalFormControl from '@/components/molecules/modal/searchModalFormControl';
import TextField from '@/components/molecules/textField';
import SearchModal, { IsearchModalButton } from '@/components/organisms/modal/searchModal';

import { IvehlModalSearch, vehlModalSearchInit } from '@/interfaces/vehicle/vehlModalSearch';
import { IvehlSearchModalGrid } from '@/interfaces/vehicle/vehlSearchModalGrid';

import { _recoilLang } from '@/modules/recoil/lang';

import theme from '@/styles/theme';

export interface Iprops {
    visible: boolean;
    saleBrndCd?: string;
    naRegnYn?: boolean;
    coScnChangeYn?: boolean;
    single?: boolean;
    onSelect: (data: IvehlSearchModalGrid[]) => void;
    onClose: () => void;
}

export const VehlSearchModal = (props: Iprops) => {
    /**
     * axios
     */
    const axios = _axios();

    /**
     * recoil
     */
    const recoilLang = _recoilLang();

    /**
     * useState
     */
    const [selectedRowDatas, setSelectedRowDatas] = React.useState<IvehlSearchModalGrid[]>([]);
    const [vehlSearchModalGridList, setVehlSearchModalGridList] = React.useState<IvehlSearchModalGrid[]>([]);

    // 북미워크시트 브랜드값 수정 될 시 초기화
    React.useEffect(() => {
        if (props.visible) {
            reset(vehlModalSearchInit());
            setVehlSearchModalGridList([]);
            setSelectedRowDatas([]);
        }
    }, [props.visible]);

    /**
     * Validation
     */
    const schema = yup.object().shape({});
    const { register, reset, getValues } = useForm<IvehlModalSearch>({
        resolver: yupResolver(schema),
    });

    const handle = {
        clickSearch: async () => {
            // 데이터 적재
            const vehlModalSearch: IvehlModalSearch = {
                ...getValues(),
                prjVehlCdList: getValues('prjVehlCd').split(','),
                vehlNmList: getValues('vehlNm').split(','),
                saleBrndCd: props.saleBrndCd ?? '',
                naRegnYn: props.naRegnYn ? 'Y' : '',
                coScnChangeYn: props.coScnChangeYn ? 'Y' : '',
            };

            const res = await axios.get('/vehicle/searchModalGrid_search.do', {
                params: {
                    ...vehlModalSearch,
                },
            });

            if (res.data) {
                const vehlSearchModalGridList: IvehlSearchModalGrid[] = res.data.data;
                setVehlSearchModalGridList(vehlSearchModalGridList);
            }
        },

        pressSearchContainer: (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter') {
                handle.clickSearch();
            }
        },

        clickSelect: () => {
            props.onSelect(selectedRowDatas);
        },

        selectRowData: (rowdata: IvehlSearchModalGrid[]) => {
            setSelectedRowDatas(rowdata);
        },
    };

    /**
     * Grid
     */
    const deskTopGrid = {
        widths: [0, 0, 0, 100],
        rowGroupWidth: 220,
        headerNames: ['브랜드', '생산법인', '품질차량유형', '차종명'],
        fields: ['saleBrndNm', 'prdnCorpAbbNm', 'qltyvhclTypeNm', 'vehlNm'],
        cellStyleSelector: () => {
            return {
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'left',
                backgroundColor: theme.color.white,
            };
        },
        getRowHeightSelector: () => 48,
        rowGroupHeaderName: '구분',
    };

    const mobileGrid = {
        widths: [100],
        headerNames: ['차종명'],
        fields: ['vehlNm'],
        cellStyleSelector: () => {
            return {
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'left',
                backgroundColor: theme.color.white,
            };
        },
        getRowHeightSelector: () => 48,
    };

    /**
     * search modal button
     */
    const buttonList: IsearchModalButton[] = [
        // 조회
        {
            label: '조회',
            onClick: handle.clickSearch,
            variant: 'contained',
        },
        // 선택
        { label: '선택', onClick: handle.clickSelect, variant: 'outlined' },
    ];

    return (
        <SearchModal
            visible={props.visible}
            title="차종검색"
            buttonList={theme.device.deskTop ? buttonList : []}
            onClose={props.onClose}
        >
            <Wrapper>
                <>
                    <Desktop>
                        {/* ※복수 검색시 컴마(,)로 구분해서 검색 하세요. */}
                        <Text color="darkGray100" size="small">
                            ※복수 검색시 컴마(,)로 구분해서 검색 하세요.
                        </Text>
                    </Desktop>

                    <Mobile>
                        {/* ※복수 검색시 컴마(,)로 구분해서 검색 하세요. */}
                        <Text color="darkGray100" size="xsmall">
                            ※복수 검색시 컴마(,)로 구분해서 검색 하세요.
                        </Text>
                    </Mobile>
                </>

                <SearchFieldContainer onKeyUp={handle.pressSearchContainer}>
                    {/* 차종코드 */}
                    <SearchModalFormControl label="차종코드">
                        <TextField type="text" width="100%" register={register('prjVehlCd')} />
                    </SearchModalFormControl>

                    {/* 차종명 */}
                    <SearchModalFormControl label="차종명">
                        <TextField type="text" width="100%" register={register('vehlNm')} />
                    </SearchModalFormControl>
                </SearchFieldContainer>

                <>
                    <Mobile>
                        <ButtonList>
                            {buttonList.map((button, index) => (
                                <Button
                                    key={index}
                                    variant={button.variant}
                                    color="purple"
                                    size="xlarge"
                                    onClick={button.onClick}
                                >
                                    {button.label}
                                </Button>
                            ))}
                        </ButtonList>
                    </Mobile>
                </>

                <GridField>
                    <>
                        <Desktop>
                            <Grid
                                height={424}
                                rowData={vehlSearchModalGridList}
                                fields={deskTopGrid.fields}
                                headerNames={deskTopGrid.headerNames}
                                widths={deskTopGrid.widths}
                                rowGroups={[true, true, true, false]}
                                rowGroupSelection={!props.single && true}
                                rowGroupWidth={deskTopGrid.rowGroupWidth}
                                hides={[true, true, true, false]}
                                selections={[false, false, false, true]}
                                getRowHeightSelector={deskTopGrid.getRowHeightSelector}
                                cellStyleSelector={deskTopGrid.cellStyleSelector}
                                getSelectedRowData={handle.selectRowData}
                                rowGroupHeaderName={deskTopGrid.rowGroupHeaderName}
                                single={props.single}
                            />
                        </Desktop>

                        <Mobile>
                            <Grid
                                height={288}
                                rowData={vehlSearchModalGridList}
                                fields={mobileGrid.fields}
                                headerNames={mobileGrid.headerNames}
                                widths={mobileGrid.widths}
                                selections={[true]}
                                getRowHeightSelector={mobileGrid.getRowHeightSelector}
                                cellStyleSelector={mobileGrid.cellStyleSelector}
                                getSelectedRowData={handle.selectRowData}
                                single={props.single}
                            />
                        </Mobile>
                    </>
                </GridField>

                <>
                    <Desktop>
                        {/* ※ 500건까지만 조회 가능합니다. */}
                        <Text color="darkGray100" size="small">
                            ※ 500건까지만 조회 가능합니다.
                        </Text>
                    </Desktop>

                    <Mobile>
                        {/* ※ 500건까지만 조회 가능합니다. */}
                        <Text color="darkGray100" size="xsmall">
                            ※ 500건까지만 조회 가능합니다.
                        </Text>
                    </Mobile>
                </>
            </Wrapper>
        </SearchModal>
    );
};

const Wrapper = styled.div`
    ${(props) => {
        if (props.theme.device.deskTop) {
            return css`
                display: flex;
                flex-direction: column;
                gap: 16px;
            `;
        }
    }}

    ${(props) => {
        if (props.theme.device.mobile) {
            return css`
                display: flex;
                flex-direction: column;
                gap: 16px;
            `;
        }
    }}
`;

const ButtonList = styled.div`
    ${(props) => {
        if (props.theme.device.mobile) {
            return css`
                display: flex;
                flex-direction: column;
                gap: 8px;

                padding-top: 12px;
            `;
        }
    }}
`;

const SearchFieldContainer = styled.div`
    ${(props) => {
        if (props.theme.device.deskTop) {
            return css`
                display: flex;
                flex-direction: column;
                gap: 12px;

                padding: 16px;

                border: 1px solid ${props.theme.color.gray500};
                background-color: ${props.theme.color.white};
            `;
        }
    }}

    ${(props) => {
        if (props.theme.device.mobile) {
            return css`
                display: flex;
                flex-direction: column;
                gap: 12px;

                padding: 16px;

                border: 1px solid ${props.theme.color.gray500};
                background-color: ${props.theme.color.white};
            `;
        }
    }}
`;

const GridField = styled.div``;
