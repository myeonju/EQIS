import * as React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { _axios } from '@/apis/axios';

import Button from '@/components/atoms/button';
import Title from '@/components/atoms/title';
import BasicList, {
    ButtonList,
    ButtonSection,
    GridField,
    SearchField,
    PaginationField,
} from '@/components/molecules/basicList';
import ListFormControl from '@/components/molecules/formControl/listFormControler';
import Grid from '@/components/molecules/grid';
import { Pagination, PaginationChageEvent } from '@/components/molecules/pagination';
import SelectBox from '@/components/molecules/selectBox';
import SelectItem from '@/components/molecules/selectItem';
import TextField from '@/components/molecules/textField';
import LangModal from '@/components/standard/lang/langRegisterModal';

import { IlangListGrid } from '@/interfaces/lang/langListGrid';
import { IlangListSearch } from '@/interfaces/lang/langListSearch';

import _useModal from '@/modules/customHook/useModal';
import { _recoilCommonCode } from '@/modules/recoil/commonCode';
import { _recoilLang } from '@/modules/recoil/lang';
import { _recoilMenu } from '@/modules/recoil/menu';

import theme from '@/styles/theme';

const Lang = () => {
    /**
     * axios
     */
    const axios = _axios();

    /**
     * Validation
     */
    const schema = yup.object().shape({});

    const { register, setValue, watch, control, getValues } = useForm<IlangListSearch>({
        resolver: yupResolver(schema),
    });

    /**
     * recoil
     */
    const recoilLang = _recoilLang();
    const recoilCommonCode = _recoilCommonCode();
    const recoilMenu = _recoilMenu();

    /**
     * useState
     */
    const [mlgMsgListGridList, setMlgMsgListGridList] = React.useState<IlangListGrid[]>([]);
    const [totalCount, setTotalCount] = React.useState<number>(0);
    const [selectedMlgCd, setSelectedMlgCd] = React.useState<string>('');
    const [selectedLangCd, setSelectedLangCd] = React.useState<string>('');

    /**
     * customHook
     */
    const useModal = _useModal();

    /**
     * useEffect
     */
    React.useEffect(() => {
        // 다국어
        const langCodeList: string[] = ['1'];
        recoilLang.langInit(langCodeList);

        // 공통 코드
        const commonCodeList: string[] = ['LANG'];
        recoilCommonCode.commonCodeInit(commonCodeList);
    }, []);

    React.useEffect(() => {
        if (getValues('page') && getValues('limit')) {
            handle.clickSearch();
        }
    }, [watch('page'), watch('limit')]);

    /**
     * event handler
     */
    const handle = {
        clickSearch: async () => {
            const res = await axios.get('/lang/listGrid_search.do', {
                params: {
                    ...getValues(),
                },
            });

            if (res.data) {
                setMlgMsgListGridList(res.data.data.data);
                setTotalCount(res.data.data.totalCount);
            }
        },

        clickAdd: () => {
            setSelectedMlgCd('');
            setSelectedLangCd('');
            handle.toggleLangRegisterModal();
        },

        fieldEnter: async (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter') {
                handle.clickSearch();
            }
        },

        chagnePagination: (data: PaginationChageEvent) => {
            setValue('page', data.page);
            setValue('limit', data.limitCount);
        },

        clickMlgCd: (rowdata: IlangListGrid) => {
            setSelectedMlgCd(rowdata.mlgCd);
            setSelectedLangCd(rowdata.langCd);
            handle.toggleLangRegisterModal();
        },

        toggleLangRegisterModal: () => {
            useModal.toggle('toggleLangRegisterModal');
        },
    };

    /**
     * Grid
     */
    const fields = ['mlgCd', 'langCd', 'mlgSbc'];

    const headerNames = ['다국어코드', '언어코드', '다국어내용'];

    const widths = [320, 320, 320];

    const cellStyleSelector = () => {
        return {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.color.white,
        };
    };

    const getRowHeightSelector = () => {
        return 48;
    };

    return (
        <BasicList>
            <ButtonSection>
                <Title color="darkGray100" size="large" weight="bold">
                    {recoilMenu.getScrnNm(location.pathname)}
                </Title>

                <ButtonList>
                    {/* 추가 */}
                    <Button variant="contained" color="cyan" size="small" onClick={handle.clickAdd}>
                        추가
                    </Button>
                    <Button variant="outlined" color="darkGray" size="small" onClick={handle.clickSearch}>
                        조회
                    </Button>
                </ButtonList>
            </ButtonSection>

            <SearchField onKeyUp={handle.fieldEnter}>
                {/* 다국어코드 */}
                <ListFormControl label={recoilLang.translate('1')} labelWidth={104}>
                    <TextField type="text" width="100%" register={register('mlgCd')} />
                </ListFormControl>

                {/* 언어코드 */}
                <ListFormControl label="언어코드" labelWidth={104}>
                    {React.useMemo(() => {
                        return (
                            <Controller
                                name="langCd"
                                control={control}
                                render={({ field }) => (
                                    <SelectBox width="100%" all {...field}>
                                        {recoilCommonCode.conversionList('LANG')?.map((langComCdP) => (
                                            <SelectItem key={langComCdP.comCd} value={langComCdP.comCd}>
                                                {langComCdP.langComCdNm}
                                            </SelectItem>
                                        ))}
                                    </SelectBox>
                                )}
                            />
                        );
                    }, [recoilCommonCode.conversionList('LANG')])}
                </ListFormControl>

                {/* 다국어 내용 */}
                <ListFormControl label="다국어 내용" labelWidth={104}>
                    <TextField type="text" width="100%" register={register('mlgSbc')} />
                </ListFormControl>
            </SearchField>

            <GridField>
                <Grid
                    width="100%"
                    height={480}
                    rowData={mlgMsgListGridList}
                    fields={fields}
                    headerNames={headerNames}
                    widths={widths}
                    headerHeight={24}
                    getRowHeightSelector={getRowHeightSelector}
                    cellStyleSelector={cellStyleSelector}
                    buttons={[{ clickEvent: handle.clickMlgCd }, {}, {}]}
                />
            </GridField>

            <PaginationField>
                <Pagination itemCount={totalCount} onChange={handle.chagnePagination} />
            </PaginationField>

            {/* 다국어등록모달 */}
            <LangModal
                visible={useModal.isShown['toggleLangRegisterModal']}
                selectedMlgCd={selectedMlgCd}
                selectedLangCd={selectedLangCd}
                toggle={useModal.toggle}
                isShown={useModal.isShown}
                onSuccess={handle.clickSearch}
                onClose={handle.toggleLangRegisterModal}
            />
        </BasicList>
    );
};

export default Lang;
