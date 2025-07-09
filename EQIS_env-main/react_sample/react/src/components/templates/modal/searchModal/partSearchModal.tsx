import * as React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import * as yup from 'yup';

import { _axios } from '@/apis/axios';

import Text from '@/components/atoms/text';
import Grid from '@/components/molecules/grid';
import SearchModalFormControl from '@/components/molecules/modal/searchModalFormControl';
import TextField from '@/components/molecules/textField';
import SearchModal, { IsearchModalButton } from '@/components/organisms/modal/searchModal';

import { IrepnPartModalGrid } from '@/interfaces/part/repnPartModalGrid';
import { IrepnPartModalSearch } from '@/interfaces/part/repnPartModalSearch';

import { _recoilLang } from '@/modules/recoil/lang';

import theme from '@/styles/theme';

export interface Iprops {
    visible: boolean;
    single?: boolean;
    onSelect: (data: IrepnPartModalGrid[]) => void;
    onClose: () => void;
}

export const PartSearchModal = (props: Iprops) => {
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
    const [selectedRowDatas, setSelectedRowDatas] = React.useState<IrepnPartModalGrid[]>([]);
    const [repnPartModalGridList, setRepnPartModalGridList] = React.useState<IrepnPartModalGrid[]>([]);

    /**
     * Validation
     */
    const schema = yup.object().shape(
        {
            repnPno: yup.string().when('repnPartNm', {
                is: '',
                then: yup.string().required('qwe'),
            }),

            repnPartNm: yup.string().when('repnPartNm', {
                is: '',
                then: yup.string().required('qwe'),
            }),
        },
        [['repnPno', 'repnPartNm']],
    );

    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm<IrepnPartModalSearch>({
        resolver: yupResolver(schema),
    });

    /**
     * Grid
     */
    const widths = [200, 200, 200];
    const headerNames = ['', '', ''];
    const fields = ['repnPno', 'repnPartKoNm', 'repnPartEnNm'];
    const cellStyleSelector = () => {
        return {
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'left',
            backgroundColor: theme.color.white,
        };
    };
    const getRowHeightSelector = () => 36;
    const rowGroupHeaderName = '구분';

    /**
     * Event handler
     */
    const handle = {
        clickSearch: async (data: IrepnPartModalSearch) => {
            data.repnPnoList = data.repnPno.toUpperCase().split(',');
            data.repnPartNmList = data.repnPartNm.toUpperCase().split(',');
            data.langCd = recoilLang.langCd;

            const res = await axios.get('/part/modalList_search.do', {
                params: {
                    ...data,
                },
            });

            if (res.data) {
                const repnPartModalGridList: IrepnPartModalGrid[] = res.data.data;
                setRepnPartModalGridList(repnPartModalGridList);
            }
        },

        pressSearchContainer: (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter') {
                handle.clickSearch(watch());
            }
        },

        clickSelect: () => {
            props.onSelect(selectedRowDatas);
        },

        selectRowData: (rowdata: any) => {
            setSelectedRowDatas(rowdata);
        },
    };

    /**
     * search modal button
     */
    const buttonList: IsearchModalButton[] = [
        // 조회
        {
            label: '조회',
            onClick: handleSubmit(handle.clickSearch),
            variant: 'contained',
        },
        // 선택
        { label: '선택', onClick: handle.clickSelect, variant: 'outlined' },
    ];

    return (
        <SearchModal visible={props.visible} title="부품 검색" buttonList={buttonList} onClose={props.onClose}>
            <Wrapper>
                <Text>※복수 검색시 컴마(,)로 구분해서 검색 하세요.</Text>

                <SearchFieldContainer onKeyUp={handle.pressSearchContainer}>
                    <SearchModalFormControl label="부품번호">
                        <TextField
                            type="text"
                            color={errors.repnPno && 'error'}
                            width="100%"
                            register={register('repnPno')}
                            errorLabel={errors.repnPno && errors.repnPno.message}
                        />
                    </SearchModalFormControl>

                    <SearchModalFormControl label="부품명">
                        <TextField
                            type="text"
                            color={errors.repnPartNm && 'error'}
                            width="100%"
                            register={register('repnPartNm')}
                            errorLabel={errors.repnPartNm && errors.repnPartNm.message}
                        />
                    </SearchModalFormControl>
                </SearchFieldContainer>

                <GridField>
                    <Grid
                        height={424}
                        rowData={repnPartModalGridList}
                        fields={fields}
                        headerNames={headerNames}
                        widths={widths}
                        headerHeight={36}
                        selections={[true, false, false, false]}
                        getRowHeightSelector={getRowHeightSelector}
                        cellStyleSelector={cellStyleSelector}
                        getSelectedRowData={handle.selectRowData}
                        single={props.single}
                    />
                </GridField>

                <Text>※ 500건까지만 조회 가능합니다.</Text>
            </Wrapper>
        </SearchModal>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const SearchFieldContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    padding: 12px;

    ${(props) => css`
        border: 1px solid ${props.theme.color.gray500};
        background-color: ${props.theme.color.white};
    `}
`;

const GridField = styled.div``;
