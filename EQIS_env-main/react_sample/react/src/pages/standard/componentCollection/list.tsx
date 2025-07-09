import * as React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import * as yup from 'yup';

import Button from '@/components/atoms/button';
import Line from '@/components/atoms/line';
import Title from '@/components/atoms/title';
import Checkbox from '@/components/molecules/checkbox';
import DatePicker from '@/components/molecules/datepicker';
import Radio from '@/components/molecules/radio';
import SelectBox from '@/components/molecules/selectBox';
import SelectItem from '@/components/molecules/selectItem';
import ConfirmModal from '@/components/organisms/modal/confirmModal';
import RegisterModal from '@/components/organisms/modal/registerModal';
import RadioField from '@/components/organisms/radioField';

import { IComponentTest, componentTestInit } from '@/interfaces/componentCollection/noticeListSearch';

import _useModal from '@/modules/customHook/useModal';
import { _recoilCommonCode } from '@/modules/recoil/commonCode';
import { _recoilLang } from '@/modules/recoil/lang';

const List = () => {
    /**
     * recoil
     */
    const recoilLang = _recoilLang();
    const recoilCommonCode = _recoilCommonCode();

    /**
     * customHook
     */
    const useModal = _useModal();

    /**
     * Validation
     */
    const schema = yup.object().shape({});
    const { register, setValue, watch, control, getValues } = useForm<IComponentTest>({
        resolver: yupResolver(schema),
    });

    /**
     * event handler
     */
    const handle = {
        toggleRegisterConfirmModal: () => {
            useModal.toggle('toggleRegisterConfirmModal');
        },

        toggleUpdateConfirmModal: () => {
            useModal.toggle('toggleUpdateConfirmModal');
        },

        toggleDeleteConfirmModal: () => {
            useModal.toggle('toggleDeleteConfirmModal');
        },

        clickRegister: async () => {
            handle.toggleRegisterConfirmModal();
        },

        clickUpdate: async () => {
            handle.toggleUpdateConfirmModal();
        },

        clickDelete: async () => {
            handle.toggleDeleteConfirmModal();
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

    return (
        <Wrapper>
            <ButtonList>
                Modal Button
                <Button variant="outlined" color="darkGray" size="small" onClick={handle.clickRegister}>
                    등록
                </Button>
                <Button variant="outlined" color="darkGray" size="small" onClick={handle.clickUpdate}>
                    수정
                </Button>
                <Button variant="outlined" color="darkGray" size="small" onClick={handle.clickDelete}>
                    삭제
                </Button>
            </ButtonList>

            <ButtonList>
                outlined
                <Button variant="outlined" color="darkGray" size="small">
                    darkGray line
                </Button>
                <Button variant="outlined" color="purple" size="small">
                    purple line
                </Button>
            </ButtonList>

            <ButtonList>
                contained
                <Button variant="contained" color="darkGray" size="small">
                    darkGray
                </Button>
                <Button variant="contained" color="purple" size="small">
                    purple
                </Button>
                <Button variant="contained" color="brown" size="small">
                    brown
                </Button>
                <Button variant="contained" color="cyan" size="small">
                    cyan
                </Button>
                <Button variant="contained" color="vivid" size="small">
                    vivid
                </Button>
            </ButtonList>

            <ButtonList>
                size
                <Button variant="outlined" color="darkGray" size="2xsmall">
                    2xS
                </Button>
                <Button variant="outlined" color="darkGray" size="xsmall">
                    xS
                </Button>
                <Button variant="outlined" color="darkGray" size="small">
                    S
                </Button>
                <Button variant="outlined" color="darkGray" size="medium">
                    M
                </Button>
                <Button variant="outlined" color="darkGray" size="large">
                    L
                </Button>
                <Button variant="outlined" color="darkGray" size="xlarge">
                    xL
                </Button>
                <Button variant="outlined" color="darkGray" size="2xlarge">
                    2xL
                </Button>
                <Button variant="outlined" color="darkGray" size="3xlarge">
                    3xL
                </Button>
            </ButtonList>

            <ButtonList>
                etc
                <Button variant="outlined" color="darkGray" size="small" disabled>
                    disabled
                </Button>
            </ButtonList>

            <Line width="100%" height="1px" color="black" />

            <SelectList>
                SelectBox
                <SelectBox width={184} all>
                    {recoilCommonCode.conversionList('USE_YN')?.map((langComCdP) => (
                        <SelectItem key={langComCdP.comCd} value={langComCdP.comCd}>
                            {langComCdP.langComCdNm}
                        </SelectItem>
                    ))}
                </SelectBox>
                <SelectBox width={184} select></SelectBox>
                <SelectBox width={184} all disabled></SelectBox>
                <SelectBox width={184} all color="error"></SelectBox>
                <SelectBox width={184} all multiple>
                    {recoilCommonCode.conversionList('USE_YN')?.map((langComCdP) => (
                        <SelectItem key={langComCdP.comCd} value={langComCdP.comCd}>
                            {langComCdP.langComCdNm}
                        </SelectItem>
                    ))}
                </SelectBox>
            </SelectList>

            <Line width="100%" height="1px" color="black" />

            <CheckboxList>
                CheckBox
                <Checkbox></Checkbox>
                <Checkbox disabled></Checkbox>
                <Checkbox checked></Checkbox>
            </CheckboxList>

            <Line width="100%" height="1px" color="black" />

            <DatePickerList>
                DatePicker
                <Controller
                    name="strDt"
                    control={control}
                    render={({ field }) => <DatePicker width={184} {...field}></DatePicker>}
                />
                <Controller
                    name="testDt"
                    control={control}
                    render={({ field }) => <DatePicker width={184} {...field} disabled></DatePicker>}
                />
                <Controller
                    name="endDt"
                    control={control}
                    render={({ field }) => <DatePicker width={184} {...field} color="error"></DatePicker>}
                />
            </DatePickerList>

            <Line />

            <RadioList>
                <RadioField>
                    Radio Button
                    <Radio name="radioTest" value="Y" />
                    <Radio name="radioTest" value="N" />
                </RadioField>
            </RadioList>

            {/* 등록확인모달 */}
            <ConfirmModal
                visible={useModal.isShown['toggleRegisterConfirmModal']}
                title="등록하시겠습니까?"
                onConfirm={handle.clickRegister}
                onClose={handle.toggleRegisterConfirmModal}
            />

            {/* 수정확인모달 */}
            <ConfirmModal
                visible={useModal.isShown['toggleUpdateConfirmModal']}
                title="수정하시겠습니까?"
                onConfirm={handle.clickRegister}
                onClose={handle.toggleUpdateConfirmModal}
            />

            {/* 삭제확인모달 */}
            <ConfirmModal
                visible={useModal.isShown['toggleDeleteConfirmModal']}
                title="삭제하시겠습니까?"
                onConfirm={handle.clickDelete}
                onClose={handle.toggleDeleteConfirmModal}
            />
        </Wrapper>
    );
};

export default List;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    margin: 0 auto;
    padding: 20px;

    ${(props) => css`
        min-width: ${props.theme.minWidth};
        max-width: ${props.theme.maxWidth};
    `}
`;

const ButtonList = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const SelectList = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const CheckboxList = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const DatePickerList = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const RadioList = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;
