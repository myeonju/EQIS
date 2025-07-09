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

import { ImlgMsgB, mlgMsgBInit } from '@/interfaces/lang/mlgMsgB';

import { IisShown } from '@/modules/customHook/useModal';
import { _recoilCommonCode } from '@/modules/recoil/commonCode';
import { _recoilLang } from '@/modules/recoil/lang';

interface Iprops {
    visible: boolean;
    selectedMlgCd: string;
    selectedLangCd: string;
    toggle: (name: string) => void;
    isShown: IisShown;
    onSuccess: () => void;
    onClose: () => void;
}

const LangRegisterModal = (props: Iprops) => {
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
        if (props.visible && props.selectedMlgCd) {
            api.detailSearch();
        } else {
            reset(mlgMsgBInit());
        }
    }, [props.visible, props.selectedMlgCd]);

    /**
     * Validation
     */
    const schema = yup.object().shape({
        mlgCd: yup.string().nullable().required('필요하다'),
        langCd: yup.string().nullable().required('필요하다'),
        mlgSbc: yup.string().nullable().required('필요하다'),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
        reset,
        control,
    } = useForm<ImlgMsgB>({
        resolver: yupResolver(schema),
    });

    /**
     * api
     */
    const api = {
        detailSearch: async () => {
            const res = await axios.get('/lang/detail_search.do', {
                params: {
                    mlgCd: props.selectedMlgCd,
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
                const res = await axios.post('/lang/register.do', getValues());
                if (res.data) {
                    handle.toggleRegisterConfirmModal();
                    props.onClose();
                    props.onSuccess();
                }
            } catch (error) {
                handle.toggleRegisterConfirmModal();
            }
        },

        clickUpdate: async () => {
            try {
                const res = await axios.post('/lang/update.do', getValues());
                if (res.data) {
                    handle.toggleUpdateConfirmModal();
                    props.onClose();
                    props.onSuccess();
                }
            } catch (error) {
                handle.toggleUpdateConfirmModal();
            }
        },

        clickDelete: async () => {
            const res = await axios.post('/lang/delete.do', getValues());
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
                register={!props.selectedMlgCd}
                title="제목"
                onRegister={handleSubmit(handle.toggleRegisterConfirmModal)}
                onUpdate={handleSubmit(handle.toggleUpdateConfirmModal)}
                onDelete={handle.toggleDeleteConfirmModal}
                onClose={props.onClose}
            >
                {/* 다국어코드 */}
                <RegisterModalFormControl label="다국어코드">
                    <TextField
                        type="text"
                        width="100%"
                        color={errors.mlgCd && 'error'}
                        errorLabel={errors.mlgCd && errors.mlgCd.message}
                        readOnly={!!props.selectedMlgCd}
                        register={register('mlgCd')}
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
                                disabled={!!props.selectedMlgCd}
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

                {/* 다국어내용 */}
                <RegisterModalFormControl label="다국언용">
                    <TextareaField
                        width="100%"
                        height={86}
                        color={errors.mlgSbc && 'error'}
                        errorLabel={errors.mlgSbc && errors.mlgSbc.message}
                        register={register('mlgSbc')}
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
                visible={props.isShown['toggleUpdateConfirmModal']}
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

export default LangRegisterModal;
