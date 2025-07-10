import * as React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import reset from 'styled-reset';
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
import NoticeRegisterModal from '@/components/standard/notice/noticeRegisterModal';

import { noticeListGridInit, InoticeListGrid } from '@/interfaces/notice/noticeListGrid';
import { noticeListSearchInit, InoticeListSearch } from '@/interfaces/notice/noticeListSearch';

import _useModal from '@/modules/customHook/useModal';
import { _recoilCommonCode } from '@/modules/recoil/commonCode';
import { _recoilLang } from '@/modules/recoil/lang';
import { _recoilMenu } from '@/modules/recoil/menu';

import theme from '@/styles/theme';

import { toYYYYMMDD } from '@/utils/dateformat';

const List = () => {
    /**
     * axios
     */
    const axios = _axios();

    /**
     * recoil
     */
    const recoilLang = _recoilLang();
    const recoilCommonCode = _recoilCommonCode();
    const recoilMenu = _recoilMenu();

    /**
     * customHook
     */
    const useModal = _useModal();

    /**
     * Validation
     */
    const schema = yup.object().shape({});
    const { register, setValue, watch, control, getValues } = useForm<InoticeListSearch>({
        resolver: yupResolver(schema),
    });

    /**
     * useState
     */
    const [noticeListGridList, setNoticeListGridList] = React.useState<InoticeListGrid[]>([]);
    const [totalCount, setTotalCount] = React.useState<number>(0);
    const [selectedPwiImtrNo, setselectedPwiImtrNo] = React.useState<number>(0);

    /**
     * event handler
     */
    const handle = {
        clickSearch: async () => {
            const res = await axios.get('/notice/listGrid_search.do', {
                params: {
                    ...getValues(),
                },
            });

            if (res.data) {
                const noticeListGridList: InoticeListGrid[] = res.data.data.data;
                noticeListGridList.forEach((noticeListGrid) => {
                    noticeListGrid.popuStrDtm = toYYYYMMDD(noticeListGrid.popuStrDtm);
                    noticeListGrid.popuStrDtm = toYYYYMMDD(noticeListGrid.popuFnhDtm);
                });

                setNoticeListGridList(noticeListGridList);
                setTotalCount(res.data.data.totalCount);
            }
        },

        clickExcel: async () => {
            try {
                // axios 요청 시 responseType을 blob으로 설정하여 파일을 다운로드 받을 수 있도록 설정
                const response = await axios.post(
                    '/notice/notice_excel_down.do',
                    {
                        params: {
                            ...getValues(),
                        },
                    },
                    {
                        responseType: 'blob', // 서버에서 바이너리 데이터를 받을 때 사용
                    },
                );

                // 파일 다운로드 처리
                const blob = response.data;
                const fileName = response.headers['content-disposition'].split('filename=')[1].replace(/"/g, ''); // 파일 이름을 Content-Disposition 헤더에서 가져옵니다.

                // 브라우저에서 파일 다운로드
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob); // Blob을 URL로 변환
                link.download = fileName; // 다운로드할 파일 이름 설정
                link.click(); // 링크 클릭으로 다운로드 시작
            } catch (error) {
                console.error('파일 다운로드 실패:', error);
            }
        },

        pressFieldEnter: async (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter') {
                handle.clickSearch();
            }
        },

        clickAdd: () => {
            setselectedPwiImtrNo(0);
            handle.toggleNoticeRegisterModal();
        },

        clickGroupCode: (rowdata: InoticeListGrid) => {
            setselectedPwiImtrNo(rowdata.pwiImtrNo);
            handle.toggleNoticeRegisterModal();
        },

        chagnePagination: (data: PaginationChageEvent) => {
            setValue('page', data.page);
            setValue('limit', data.limitCount);
        },

        toggleNoticeRegisterModal: () => {
            useModal.toggle('toggleNoticeRegisterModal');
        },
    };

    /**
     * useEffect
     */
    React.useEffect(() => {
        // 다국어
        const langCodeList: string[] = [];
        recoilLang.langInit(langCodeList);

        // 공통 코드
        const commonCodeList: string[] = ['USE_YN'];
        recoilCommonCode.commonCodeInit(commonCodeList);
    }, []);

    React.useEffect(() => {
        if (getValues('page') && getValues('limit')) {
            handle.clickSearch();
        }
    }, [watch('page'), watch('limit')]);

    /**
     * Grid
     */
    const headerNames = ['공지사항 번호', '제목', '내용', '공지', '상위 고정', '팝업', '팝업 시작', '팝업 종료'];

    const fields = ['pwiImtrNo', 'titlNm', 'pwiImtrSbc', 'pwiNm', 'supiFxgNm', 'popuNm', 'popuStrDtm', 'popuFnhDtm'];

    const widths = [120, 200, 400, 120, 120, 120, 120, 120];

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
                    <Button variant="contained" color="vivid" size="small" onClick={handle.clickExcel}>
                        엑셀
                    </Button>
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
                {/* 제목 */}
                <ListFormControl label="제목" labelWidth={136}>
                    <TextField type="text" width="100%" register={register('titlNm')} />
                </ListFormControl>

                {/* 내용 */}
                <ListFormControl label="내용" labelWidth={136}>
                    <TextField type="text" width="100%" register={register('pwiImtrSbc')} />
                </ListFormControl>

                {/* 공지 */}
                <ListFormControl label="공지" labelWidth={136}>
                    {React.useMemo(() => {
                        return (
                            <Controller
                                name="pwiYn"
                                control={control}
                                render={({ field }) => (
                                    <SelectBox width="100%" all {...field}>
                                        {recoilCommonCode.conversionList('USE_YN')?.map((langComCdP) => (
                                            <SelectItem key={langComCdP.comCd} value={langComCdP.comCd}>
                                                {langComCdP.langComCdNm}
                                            </SelectItem>
                                        ))}
                                    </SelectBox>
                                )}
                            />
                        );
                    }, [recoilCommonCode.conversionList('USE_YN')])}
                </ListFormControl>

                {/* 상위 고정 */}
                <ListFormControl label="상위 고정" labelWidth={136}>
                    {React.useMemo(() => {
                        return (
                            <Controller
                                name="supiFxgYn"
                                control={control}
                                render={({ field }) => (
                                    <SelectBox width="100%" all {...field}>
                                        {recoilCommonCode.conversionList('USE_YN')?.map((langComCdP) => (
                                            <SelectItem key={langComCdP.comCd} value={langComCdP.comCd}>
                                                {langComCdP.langComCdNm}
                                            </SelectItem>
                                        ))}
                                    </SelectBox>
                                )}
                            />
                        );
                    }, [recoilCommonCode.conversionList('USE_YN')])}
                </ListFormControl>

                {/* 팝업 */}
                <ListFormControl label="팝업" labelWidth={136}>
                    {React.useMemo(() => {
                        return (
                            <Controller
                                name="popuYn"
                                control={control}
                                render={({ field }) => (
                                    <SelectBox width="100%" all {...field}>
                                        {recoilCommonCode.conversionList('USE_YN')?.map((langComCdP) => (
                                            <SelectItem key={langComCdP.comCd} value={langComCdP.comCd}>
                                                {langComCdP.langComCdNm}
                                            </SelectItem>
                                        ))}
                                    </SelectBox>
                                )}
                            />
                        );
                    }, [recoilCommonCode.conversionList('USE_YN')])}
                </ListFormControl>
            </SearchField>

            <GridField>
                <Grid
                    width="100%"
                    height={480}
                    rowData={noticeListGridList}
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

            {/* 공지사항 등록모달 */}
            <NoticeRegisterModal
                visible={useModal.isShown['toggleNoticeRegisterModal']}
                selectedPwiImtrNo={selectedPwiImtrNo}
                toggle={useModal.toggle}
                isShown={useModal.isShown}
                onSuccess={handle.clickSearch}
                onClose={handle.toggleNoticeRegisterModal}
            />
        </BasicList>
    );
};

export default List;
