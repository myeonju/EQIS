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
import CommonCodeRegisterModal from '@/components/standard/commonCode/commonCodeRegisterModal';
import LangModal from '@/components/standard/lang/langRegisterModal';

import { IcommonCodeListGrid } from '@/interfaces/commonCode/commonCodeListGrid';
import { IcommonCodeListSearch } from '@/interfaces/commonCode/commonCodeListSearch';

import _useModal from '@/modules/customHook/useModal';
import { _recoilCommonCode } from '@/modules/recoil/commonCode';
import { _recoilLang } from '@/modules/recoil/lang';
import { _recoilMenu } from '@/modules/recoil/menu';

import theme from '@/styles/theme';

const CommonCode = () => {
    /**
     * axios
     */
    const axios = _axios();

    /**
     * Validation
     */
    const schema = yup.object().shape({});
    const { register, setValue, watch, control, getValues } = useForm<IcommonCodeListSearch>({
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
    const [commonCodeListGridList, setCommonCodeListGridList] = React.useState<IcommonCodeListGrid[]>([]);
    const [totalCount, setTotalCount] = React.useState<number>(0);
    const [selectedComCdGrpCd, setSelectedComCdGrpCd] = React.useState<string>('');
    const [selectedComCd, setSelectedComCd] = React.useState<string>('');
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
        const langCodeList: string[] = [];
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
            const res = await axios.get('/commonCode/listGrid_search.do', {
                params: {
                    ...getValues(),
                },
            });

            if (res.data) {
                setCommonCodeListGridList(res.data.data.data);
                setTotalCount(res.data.data.totalCount);
            }
        },

        pressFieldEnter: async (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter') {
                handle.clickSearch();
            }
        },

        clickAdd: () => {
            setSelectedComCdGrpCd('');
            setSelectedComCd('');
            setSelectedLangCd('');
            handle.toggleCommonCodeRegisterModal();
        },

        clickGroupCode: (rowdata: IcommonCodeListGrid) => {
            setSelectedComCdGrpCd(rowdata.comCdGrpCd);
            setSelectedComCd(rowdata.comCd);
            setSelectedLangCd(rowdata.langCd);
            handle.toggleCommonCodeRegisterModal();
        },

        chagnePagination: (data: PaginationChageEvent) => {
            setValue('page', data.page);
            setValue('limit', data.limitCount);
        },

        toggleCommonCodeRegisterModal: () => {
            useModal.toggle('toggleCommonCodeRegisterModal');
        },
    };

    /**
     * Grid
     */
    const fields = ['comCdGrpCd', 'comCd', 'langCd', 'langComCdNm', 'sortSqn'];

    const headerNames = ['그룹코드', '공통코드', '언어코드', '코드명', '순서'];

    const widths = [320, 320, 320, 320, 320];

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

            <SearchField onKeyUp={handle.pressFieldEnter}>
                {/* 그룹코드 */}
                <ListFormControl label="그룹코드" labelWidth={104}>
                    <TextField type="text" width="100%" register={register('comCdGrpCd')} />
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

                {/* 공통코드 */}
                <ListFormControl label="공통코드" labelWidth={104}>
                    <TextField type="text" width="100%" register={register('comCd')} />
                </ListFormControl>

                {/* 코드명 */}
                <ListFormControl label="코드명" labelWidth={104}>
                    <TextField type="text" width="100%" register={register('langComCdNm')} />
                </ListFormControl>
            </SearchField>

            <GridField>
                <Grid
                    width="100%"
                    height={480}
                    rowData={commonCodeListGridList}
                    fields={fields}
                    headerNames={headerNames}
                    widths={widths}
                    headerHeight={24}
                    getRowHeightSelector={getRowHeightSelector}
                    cellStyleSelector={cellStyleSelector}
                    buttons={[{ clickEvent: handle.clickGroupCode }, {}, {}, {}, {}, {}, {}]}
                />
            </GridField>
            <PaginationField>
                <Pagination itemCount={totalCount} onChange={handle.chagnePagination} />
            </PaginationField>

            {/* 공통코드등록모달 */}
            <CommonCodeRegisterModal
                visible={useModal.isShown['toggleCommonCodeRegisterModal']}
                selectedComCdGrpCd={selectedComCdGrpCd}
                selectedComCd={selectedComCd}
                selectedLangCd={selectedLangCd}
                toggle={useModal.toggle}
                isShown={useModal.isShown}
                onSuccess={handle.clickSearch}
                onClose={handle.toggleCommonCodeRegisterModal}
            />
        </BasicList>
    );
};

export default CommonCode;
