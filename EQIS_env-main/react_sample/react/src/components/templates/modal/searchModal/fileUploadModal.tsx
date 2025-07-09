import * as React from 'react';

import styled from 'styled-components';

import { _axios } from '@/apis/axios';

import Input from '@/components/atoms/input';
import FileUploadList from '@/components/molecules/fileUploadList';
import SearchModal, { IsearchModalButton } from '@/components/organisms/modal/searchModal';

import { IattcFilB } from '@/interfaces/file/attcFilB';
import { IattcFileSaveResult } from '@/interfaces/file/attcFileSaveResult';
import { IdeleteFileList } from '@/interfaces/file/deleteFileList';
import { ImixedFile } from '@/interfaces/file/mixedFile';

import { _recoilLang } from '@/modules/recoil/lang';
import { _recoilLoading } from '@/modules/recoil/loading';

interface IaddFile {
    file: File; // 신규 추가한 file data
    key: number; // 파일 구분을 위한 key ( 수정시간)
    useYn: string; // 사용여부 (삭제 대상 여부 확인)
}

type Itype = 'RDCMNT';

export interface Iprops {
    visible: boolean;
    attcFilNo: string;
    encAttcFilNo: string;
    attcFilCount?: number;
    prcNm: string;
    type?: Itype;
    onChange: (attcFilNo: string, encAttcFilNo: string, attcFilBList: IattcFilB[]) => void;
    onClose: () => void;
}

export const FileUploadModal = (props: Iprops) => {
    /**
     * recoil
     */
    const recoilLang = _recoilLang();
    const recoilLoading = _recoilLoading();

    /**
     * axios
     */
    const axios = _axios();

    /**
     * useState
     */
    const [attcFilBList, setAttcFilBList] = React.useState<IattcFilB[]>([]);
    const [addFileList, setAddFileList] = React.useState<IaddFile[]>([]);
    const [mixedFileList, setMixedFileList] = React.useState<ImixedFile[]>([]);
    const [selectedMixedFileList, setSelectedMixedFileList] = React.useState<ImixedFile[]>([]);

    /**
     * useRef
     */
    const fileInput = React.useRef<HTMLInputElement>(null);

    /**
     * useEffect
     */
    React.useEffect(() => {
        // 다국어
        const langCodeList: string[] = [];
        recoilLang.langInit(langCodeList);
    }, []);

    React.useEffect(() => {
        if (props.attcFilNo && props.encAttcFilNo) {
            listSearch(props.attcFilNo, props.encAttcFilNo);
        } else {
            setAttcFilBList([]);
        }
    }, [props.attcFilNo, props.encAttcFilNo]);

    React.useEffect(() => {
        // 임시저장 등을 수행했을 때 파일 이름이 없어지는 상황 해결용도
        if (!props.attcFilCount && props.attcFilNo && props.encAttcFilNo && attcFilBList.length > 0) {
            props.onChange(props.attcFilNo, props.encAttcFilNo, attcFilBList);
        }
    }, [props.attcFilCount]);

    React.useEffect(() => {
        const mixedFileList: ImixedFile[] = [];

        attcFilBList.forEach((attcFilB) => {
            if (attcFilB.useYn === 'Y') {
                mixedFileList.push({
                    type: 'SAVE',
                    key: attcFilB.attcFilSeq,
                    name: attcFilB.attcFilOgcNm,
                    encAttcFilNo: attcFilB.encAttcFilNo,
                    encAttcFilSeq: attcFilB.encAttcFilSeq,
                });
            }
        });

        addFileList.forEach((addFile) => {
            if (addFile.useYn === 'Y') {
                mixedFileList.push({
                    type: 'ADD',
                    key: addFile.key,
                    name: addFile.file.name,
                    file: addFile.file,
                });
            }
        });

        setMixedFileList(mixedFileList);
    }, [attcFilBList, addFileList]);

    /**
     * Event handler
     */
    const handle = {
        clickAdd: () => {
            if (fileInput.current) {
                fileInput.current.click();
            }
        },

        clickDelete: () => {
            if (selectedMixedFileList.length > 0) {
                const sliceAttcFilBList = attcFilBList.slice();
                const sliceAddFileList = addFileList.slice();

                selectedMixedFileList.forEach((selectedMixedFile) => {
                    switch (selectedMixedFile.type) {
                        case 'SAVE': {
                            const findSliceAttcFilB = sliceAttcFilBList.find(
                                (sliceAttcFilB) => sliceAttcFilB.attcFilSeq === selectedMixedFile.key,
                            );
                            if (findSliceAttcFilB) {
                                findSliceAttcFilB.useYn = 'N';
                            }
                            break;
                        }

                        case 'ADD': {
                            const findSliceAddFile = sliceAddFileList.find(
                                (sliceAddFile) =>
                                    sliceAddFile.useYn === 'Y' && sliceAddFile.key === selectedMixedFile.key,
                            );
                            if (findSliceAddFile) {
                                findSliceAddFile.useYn = 'N';
                            }
                            break;
                        }
                    }
                });
                setAttcFilBList(sliceAttcFilBList);
                setAddFileList(sliceAddFileList);
            }
        },

        clickConfirm: async () => {
            const attcFileSaveResult = await fileSave();
            await fileDelete();

            // 신규 저장해서 생성된 파일 번호가 있거나 기존 파일 번호가 있을 경우에만 조회
            if (
                (attcFileSaveResult?.attcFilNo && attcFileSaveResult?.encAttcFilNo) ||
                (props.attcFilNo && props.encAttcFilNo)
            ) {
                const resSearch = await listSearch(
                    attcFileSaveResult?.attcFilNo ?? props.attcFilNo,
                    attcFileSaveResult?.encAttcFilNo ?? props.encAttcFilNo,
                );
                if (resSearch) {
                    props.onClose();
                }
            } else {
                props.onClose();
            }
        },

        clickCancel: () => {
            props.onClose();
        },

        changeFile: (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                // 로딩 모달 시작
                recoilLoading.setLoading(true);

                const fileList = Object.values(e.target.files);
                const addFileList: IaddFile[] = [];

                fileList.map((file) => {
                    const addFile: IaddFile = {
                        file,
                        key: file.lastModified,
                        useYn: 'Y',
                    };

                    addFileList.push(addFile);

                    if (addFileList.length === fileList.length) {
                        setAddFileList((prev) => [...prev, ...addFileList]);
                        e.target.value = ''; // 동일 파일 중복 업로드 가능하도록 설정

                        // 로딩모달 종료
                        recoilLoading.setLoading(false);
                    }
                });
            }
        },

        changeSelectedRowData: (mixedFileList: ImixedFile[]) => {
            setSelectedMixedFileList(mixedFileList);
        },
    };

    /**
     * 첨부파일 조회
     */
    const listSearch = async (attcFilNo: string, encAttcFilNo: string) => {
        const res = await axios.get('/file/list_search.do', {
            params: {
                encAttcFilNo,
            },
        });

        if (res.data) {
            const attcFilBList: IattcFilB[] = res.data.data;
            setAttcFilBList(attcFilBList);

            props.onChange(attcFilNo, encAttcFilNo, attcFilBList);

            return true;
        }
    };

    /**
     * 첨부파일 저장
     */
    const fileSave = async () => {
        // 서버에 전달할 데이터 필터
        const formData = new FormData();

        const fileList = addFileList.filter((addFile) => addFile.useYn === 'Y').map((addFile) => addFile.file);
        if (fileList.length > 0) {
            fileList.forEach((file) => {
                formData.append('multipartFileList', file);
            });
            formData.append('encAttcFilNo', props.encAttcFilNo ?? ''); // attcFilNo가 null 이면 null로 저장되기 때문에 ''로 수정
            formData.append('prcScnCd', props.prcNm);

            // 데이터 전송
            let res;
            switch (props.type) {
                case 'RDCMNT':
                    res = await axios.post('/file/save_rdcmt.do', formData);
                    break;

                default:
                    res = await axios.post('/file/save.do', formData);
                    break;
            }

            if (res.data) {
                const attcFileSaveResult: IattcFileSaveResult = res.data.data;
                setAddFileList([]);

                return attcFileSaveResult;
            }
        }
    };

    /**
     * 첨부파일 삭제
     */
    const fileDelete = async () => {
        // 삭제할 데이터 필터
        const deleteAttcFilBList = attcFilBList.filter((attcFilB) => attcFilB.useYn !== 'Y');

        if (deleteAttcFilBList.length > 0) {
            const deleteFileList: IdeleteFileList = {
                encAttcFilNo: deleteAttcFilBList[0].encAttcFilNo,
                encAttcFilSeqList: deleteAttcFilBList.map((deleteAttcFilB) => deleteAttcFilB.encAttcFilSeq),
            };

            switch (props.type) {
                case 'RDCMNT':
                    await axios.post('/file/delete_rdcmnt.do', deleteFileList);
                    break;

                default:
                    await axios.post('/file/delete/do', deleteFileList);
                    break;
            }
        }
    };

    const buttonList: IsearchModalButton[] = [
        { label: '삭제', onClick: handle.clickDelete, variant: 'outlined' },
        { label: '추가', onClick: handle.clickAdd, variant: 'contained' },
    ];

    return (
        <SearchModal visible={props.visible} title="파일첨부" onClose={props.onClose} buttonList={buttonList}>
            <FileUploadList
                mixedFileList={mixedFileList}
                onConfirm={handle.clickConfirm}
                onCancel={handle.clickCancel}
                onChangeSelectedRowData={handle.changeSelectedRowData}
            />
            <FileInput type="file" ref={fileInput} multiple onChange={handle.changeFile} />
        </SearchModal>
    );
};

const FileInput = styled(Input)`
    display: none;
`;

export const MessageContainer = styled.div`
    margin-bottom: 10px;
    text-align: center;
`;

export const InputFieldContainer = styled.div``;

export const ButtonFieldContainer = styled.div`
    display: flex;
    justify-content: space-around;
    gap: 10px;
`;
