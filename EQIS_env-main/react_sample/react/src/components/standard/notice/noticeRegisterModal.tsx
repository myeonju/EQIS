import * as React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { _axios } from '@/apis/axios';

import Datepicker from '@/components/molecules/datepicker';
import RegisterModalFormControl from '@/components/molecules/modal/registerModalFormControl';
import SelectBox from '@/components/molecules/selectBox';
import SelectItem from '@/components/molecules/selectItem';
import TextareaField from '@/components/molecules/textAreaField';
import TextField from '@/components/molecules/textField';
import ConfirmModal from '@/components/organisms/modal/confirmModal';
import RegisterModal from '@/components/organisms/modal/registerModal';

import { IpwiImtrB, pwiImtrBInit } from '@/interfaces/notice/pwiImtrB';

import { IisShown } from '@/modules/customHook/useModal';
import { _recoilCommonCode } from '@/modules/recoil/commonCode';
import { _recoilLang } from '@/modules/recoil/lang';

export interface Iprops {
    visible: boolean;
    selectedPwiImtrNo: number;
    toggle: (name: string) => void;
    isShown: IisShown;
    onSuccess: () => void;
    onClose: () => void;
}

const NoticeRegisterModal = (props: Iprops) => {
    /**
     * axios
     */
    const axios = _axios();

    /**
     * recoil
     */
    const recoilLang = _recoilLang();
    const recoilCommonCode = _recoilCommonCode();

    /**
     * Validation
     */
    const schema = yup.object().shape({
        titlNm: yup.string().nullable().required('필요하다'),
        pwiImtrSbc: yup.string().nullable().required('필요하다'),
        pwiYn: yup.string().nullable().required('필요하다'),
        supiFxgYn: yup.string().nullable().required('필요하다'),
        popuYn: yup.string().nullable().required('필요하다'),
        popuStrDtm: yup
            .string()
            .nullable()
            .when('popuYn', (popuYn, schema) => (popuYn === 'Y' ? schema.required('필요하다') : schema)),
        popuFnhDtm: yup
            .string()
            .nullable()
            .when('popuYn', (popuYn, schema) => (popuYn === 'Y' ? schema.required('필요하다') : schema)),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
        reset,
        watch,
        control,
    } = useForm<IpwiImtrB>({
        resolver: yupResolver(schema),
    });

    /**
     * api
     */
    const api = {
        detailSearch: async () => {
            const res = await axios.get('/notice/detail_search.do', {
                params: {
                    pwiImtrNo: props.selectedPwiImtrNo,
                },
            });

            if (res.data) {
                reset(res.data.data);
            }
        },
    };

    /**
     * event handler
     */
    const handle = {
        toggleRegisterConfirmModal: () => {
            props.toggle('toggleRegisterConfirmModal');
        },

        toggleUpdateConfirmModal: () => {
            props.toggle('toggleUpdateConfirmModal');
        },

        toggleDeleteConfirmModal: () => {
            props.toggle('toggleDeleteConfirmModal');
        },

        clickRegister: async () => {
            try {
                const res = await axios.post('/notice/register.do', getValues());
                if (res.data) {
                    handle.toggleRegisterConfirmModal();
                    props.onClose();
                    props.onSuccess();
                }
            } catch (errpr) {
                handle.toggleRegisterConfirmModal();
            }
        },

        clickUpdate: async () => {
            try {
                const res = await axios.post('/notice/update.do', getValues());
                if (res.data) {
                    handle.toggleUpdateConfirmModal();
                    props.onClose();
                    props.onSuccess();
                }
            } catch (errpr) {
                handle.toggleUpdateConfirmModal();
            }
        },

        clickDelete: async () => {
            const res = await axios.post('/notice/delete.do', getValues());
            if (res.data) {
                handle.toggleDeleteConfirmModal();
                props.onSuccess();
                props.onClose();
            }
        },
    };

    /**
     * useEffect
     */
    React.useEffect(() => {
        if (props.visible && props.selectedPwiImtrNo) {
            api.detailSearch();
        } else {
            reset(pwiImtrBInit());
        }
    }, [props.visible, props.selectedPwiImtrNo]);

    return (
        <>
            <RegisterModal
                visible={props.visible}
                register={!props.selectedPwiImtrNo}
                title="제목"
                onRegister={handleSubmit(
                    () => {
                        console.log('유효성 통과 → 등록 모달 열기');
                        handle.toggleRegisterConfirmModal();
                    },
                    (errors) => {
                        console.log('유효성 실패:', errors); // 여기서 오류 로그 확인 가능
                    },
                )}
                onUpdate={handleSubmit(handle.toggleUpdateConfirmModal)}
                onDelete={handle.toggleDeleteConfirmModal}
                onClose={props.onClose}
            >
                {/* 공지사항번호 */}
                <RegisterModalFormControl label="공지사항번호">
                    <TextField
                        type="text"
                        width="100%"
                        value={getValues('pwiImtrNo') === 0 ? '' : getValues('pwiImtrNo')}
                        readOnly
                    />
                </RegisterModalFormControl>

                {/* 제목 */}
                <RegisterModalFormControl label="제목">
                    <TextField
                        type="text"
                        width="100%"
                        color={errors.titlNm && 'error'}
                        errorLabel={errors.titlNm && errors.titlNm.message}
                        register={register('titlNm')}
                    />
                </RegisterModalFormControl>

                {/* 내용 */}
                <RegisterModalFormControl label="내용">
                    <TextareaField
                        width="100%"
                        height={320}
                        color={errors.pwiImtrSbc && 'error'}
                        errorLabel={errors.pwiImtrSbc && errors.pwiImtrSbc.message}
                        register={register('pwiImtrSbc')}
                    ></TextareaField>
                </RegisterModalFormControl>

                {/* 공지 */}
                <RegisterModalFormControl label="공지">
                    <Controller
                        name="pwiYn"
                        control={control}
                        render={({ field }) => (
                            <SelectBox
                                width="100%"
                                color={errors.pwiYn && 'error'}
                                errorLabel={errors.pwiYn && errors.pwiYn.message}
                                select
                                {...field}
                            >
                                {recoilCommonCode.conversionList('USE_YN')?.map((langComCdP) => (
                                    <SelectItem key={langComCdP.comCd} value={langComCdP.comCd}>
                                        {langComCdP.langComCdNm}
                                    </SelectItem>
                                ))}
                            </SelectBox>
                        )}
                    />
                </RegisterModalFormControl>

                {/* 상위 고정 */}
                <RegisterModalFormControl label="상위 고정">
                    <Controller
                        name="supiFxgYn"
                        control={control}
                        render={({ field }) => (
                            <SelectBox
                                width="100%"
                                color={errors.supiFxgYn && 'error'}
                                errorLabel={errors.supiFxgYn && errors.supiFxgYn.message}
                                select
                                {...field}
                            >
                                {recoilCommonCode.conversionList('USE_YN')?.map((langComCdP) => (
                                    <SelectItem key={langComCdP.comCd} value={langComCdP.comCd}>
                                        {langComCdP.langComCdNm}
                                    </SelectItem>
                                ))}
                            </SelectBox>
                        )}
                    />
                </RegisterModalFormControl>

                {/* 팝업 */}
                <RegisterModalFormControl label="팝업">
                    <Controller
                        name="popuYn"
                        control={control}
                        render={({ field }) => (
                            <SelectBox
                                width="100%"
                                color={errors.popuYn && 'error'}
                                errorLabel={errors.popuYn && errors.popuYn.message}
                                select
                                {...field}
                            >
                                {recoilCommonCode.conversionList('USE_YN')?.map((langComCdP) => (
                                    <SelectItem key={langComCdP.comCd} value={langComCdP.comCd}>
                                        {langComCdP.langComCdNm}
                                    </SelectItem>
                                ))}
                            </SelectBox>
                        )}
                    />
                </RegisterModalFormControl>

                {/* 팝업시작 */}
                <RegisterModalFormControl label="팝업시작">
                    <Controller
                        name="popuStrDtm"
                        control={control}
                        render={({ field }) => (
                            <Datepicker
                                width="100%"
                                color={errors.popuStrDtm && 'error'}
                                errorLabel={errors.popuStrDtm && errors.popuStrDtm.message}
                                disabled={watch('popuYn') !== 'Y'}
                                {...field}
                            ></Datepicker>
                        )}
                    />
                </RegisterModalFormControl>

                {/* 팝업종료 */}
                <RegisterModalFormControl label="팝업종료">
                    <Controller
                        name="popuFnhDtm"
                        control={control}
                        render={({ field }) => (
                            <Datepicker
                                width="100%"
                                color={errors.popuFnhDtm && 'error'}
                                errorLabel={errors.popuFnhDtm && errors.popuFnhDtm.message}
                                disabled={watch('popuYn') !== 'Y'}
                                {...field}
                            ></Datepicker>
                        )}
                    />
                </RegisterModalFormControl>
            </RegisterModal>

            {/* 등록확인모달 */}
            <ConfirmModal
                visible={props.isShown['toggleRegisterConfirmModal']}
                title="등록하시겠습니까?"
                onConfirm={handle.clickRegister}
                onClose={handle.toggleRegisterConfirmModal}
            />

            {/* 수정확인모달 */}
            <ConfirmModal
                visible={props.isShown['toggleUpdateconfirmModal']}
                title="수정하시겠습니까?"
                onConfirm={handle.clickUpdate}
                onClose={handle.toggleUpdateConfirmModal}
            />

            {/* 삭제확인모달 */}
            <ConfirmModal
                visible={props.isShown['toggleDeleteConfirmModal']}
                title="삭제하시겠습니까?"
                onConfirm={handle.clickDelete}
                onClose={handle.toggleDeleteConfirmModal}
            />
        </>
    );
};

export default NoticeRegisterModal;
