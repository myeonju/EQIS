import * as React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { _axios } from '@/apis/axios';

import RegisterModalFormControl from '@/components/molecules/modal/registerModalFormControl';
import SelectBox from '@/components/molecules/selectBox';
import SelectItem from '@/components/molecules/selectItem';
import TextareaField from '@/components/molecules/textAreaField';
import TextField from '@/components/molecules/textField';
import ConfirmModal from '@/components/organisms/modal/confirmModal';
import RegisterModal from '@/components/organisms/modal/registerModal';

import { IlangComCdP, langComCdPInit } from '@/interfaces/commonCode/langComCdP';

import { IisShown } from '@/modules/customHook/useModal';
import { _recoilCommonCode } from '@/modules/recoil/commonCode';
import { _recoilLang } from '@/modules/recoil/lang';

export interface Iprops {
    visible: boolean;
    selectedComCdGrpCd: string;
    selectedComCd: string;
    selectedLangCd: string;
    toggle: (name: string) => void;
    isShown: IisShown;
    onSuccess: () => void;
    onClose: () => void;
}

const CommonCodeRegisterModal = (props: Iprops) => {
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
     * useEffect
     */
    React.useEffect(() => {
        if (props.visible && props.selectedComCdGrpCd) {
            api.detailSearch();
        } else {
            reset(langComCdPInit());
        }
    }, [props.visible, props.selectedComCdGrpCd]);

    /**
     * Validation
     */
    const schema = yup.object().shape({
        comCdGrpCd: yup.string().nullable().required('필요하다'),
        comCd: yup.string().nullable().required('필요하다'),
        langCd: yup.string().nullable().required('필요하다'),
        langComCdNm: yup.string().nullable().required('필요하다'),
        sortSqn: yup.number().nullable().required('필요하다').typeError('옳바른타입이 아니다'),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
        reset,
        control,
    } = useForm<IlangComCdP>({
        resolver: yupResolver(schema),
    });

    /**
     * api
     */
    const api = {
        detailSearch: async () => {
            const res = await axios.get('/commonCode/detail_search.do', {
                params: {
                    comCdGrpCd: props.selectedComCdGrpCd,
                    comCd: props.selectedComCd,
                    langCd: props.selectedLangCd,
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
                const res = await axios.post('/commonCode/register.do', getValues());
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
                const res = await axios.post('/commonCode/update.do', getValues());
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
            const res = await axios.post('/lancommonCodeg/delete.do', getValues());
            if (res.data) {
                handle.toggleDeleteConfirmModal();
                props.onSuccess();
                props.onClose();
            }
        },
    };

    return (
        <>
            <RegisterModal
                visible={props.visible}
                register={!props.selectedComCdGrpCd}
                title="제목"
                onRegister={handleSubmit(handle.toggleRegisterConfirmModal)}
                onUpdate={handleSubmit(handle.toggleUpdateConfirmModal)}
                onDelete={handle.toggleDeleteConfirmModal}
                onClose={props.onClose}
            >
                {/* 그룹코드 */}
                <RegisterModalFormControl label="그룹코드">
                    <TextField
                        type="text"
                        width="100%"
                        color={errors.comCdGrpCd && 'error'}
                        errorLabel={errors.comCdGrpCd && errors.comCdGrpCd.message}
                        readOnly={!!props.selectedComCdGrpCd}
                        register={register('comCdGrpCd')}
                    />
                </RegisterModalFormControl>

                {/* 공통코드 */}
                <RegisterModalFormControl label="공통코드">
                    <TextField
                        type="text"
                        width="100%"
                        color={errors.comCd && 'error'}
                        errorLabel={errors.comCd && errors.comCd.message}
                        readOnly={!!props.selectedComCdGrpCd}
                        register={register('comCd')}
                    />
                </RegisterModalFormControl>

                {/* 언어코드 */}
                <RegisterModalFormControl label="언어코드">
                    <Controller
                        name="langCd"
                        control={control}
                        render={({ field }) => (
                            <SelectBox
                                width="100%"
                                color={errors.langCd && 'error'}
                                errorLabel={errors.langCd && errors.langCd.message}
                                disabled={!!props.selectedComCdGrpCd}
                                select
                                {...field}
                            >
                                {recoilCommonCode.conversionList('LANG')?.map((langComCdP) => (
                                    <SelectItem key={langComCdP.comCd} value={langComCdP.comCd}>
                                        {langComCdP.langComCdNm}
                                    </SelectItem>
                                ))}
                            </SelectBox>
                        )}
                    />
                </RegisterModalFormControl>

                {/* 코드명 */}
                <RegisterModalFormControl label="코드명">
                    <TextField
                        type="text"
                        width="100%"
                        color={errors.langComCdNm && 'error'}
                        errorLabel={errors.langComCdNm && errors.langComCdNm.message}
                        register={register('langComCdNm')}
                    />
                </RegisterModalFormControl>

                {/* 순서 */}
                <RegisterModalFormControl label="순서">
                    <TextField
                        type="text"
                        width="100%"
                        color={errors.sortSqn && 'error'}
                        errorLabel={errors.sortSqn && errors.sortSqn.message}
                        register={register('sortSqn')}
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

export default CommonCodeRegisterModal;
