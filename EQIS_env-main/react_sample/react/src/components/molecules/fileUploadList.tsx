import * as React from 'react';

import styled, { css } from 'styled-components';

import Button from '@/components/atoms/button';

import { ImixedFile } from '@/interfaces/file/mixedFile';

import _useFile from '@/modules/customHook/useFile';
import { _recoilLang } from '@/modules/recoil/lang';

import Desktop from './device/desktop';
import Mobile from './device/mobile';
import Grid, { IdownloadLink } from './grid';

interface Iprops {
    mixedFileList: ImixedFile[];
    onConfirm: () => void;
    onCancel: () => void;
    onChangeSelectedRowData: (data: ImixedFile[]) => void;
}

const FileUploadList = (props: Iprops) => {
    /**
     * recoil
     */
    const recoilLang = _recoilLang();

    /**
     * customHook
     */
    const useFile = _useFile();

    /**
     * useEffect
     */
    React.useEffect(() => {
        const langCodeList: string[] = [];
        recoilLang.langInit(langCodeList);
    });

    /**
     * grid
     */
    const fields = ['checkbox', 'name'];
    const headerNames = ['', recoilLang.translate('') as string];
    const widths = [40, 200];

    const downloadLinkSelector = (field: string, rowdata: ImixedFile) => {
        if (field === 'name') {
            // 서버 저장 데이터 대해서만 적용
            if (rowdata.encAttcFilNo && rowdata.encAttcFilSeq) {
                const downloadLink: IdownloadLink = {
                    link: useFile.fileDownloadLink(rowdata.encAttcFilNo, rowdata.encAttcFilSeq),
                };

                return downloadLink;
            }

            // 신규 파일에 대해서만 적용
            if (rowdata.file) {
                const downloadLink: IdownloadLink = {
                    link: URL.createObjectURL(rowdata.file),
                    name: rowdata.file.name as string,
                };

                return downloadLink;
            }
        }
    };

    return (
        <Wrapper>
            <GridField>
                <>
                    <Desktop>
                        <Grid
                            width="100%"
                            height={288}
                            rowData={props.mixedFileList}
                            fields={fields}
                            headerNames={headerNames}
                            widths={widths}
                            headerHeight={36}
                            selections={[true]}
                            getSelectedRowData={props.onChangeSelectedRowData}
                            downloadLinkSelector={downloadLinkSelector}
                        />
                    </Desktop>

                    <Mobile>
                        <Grid
                            width="100%"
                            height={192}
                            rowData={props.mixedFileList}
                            fields={fields}
                            headerNames={headerNames}
                            widths={widths}
                            headerHeight={36}
                            selections={[true]}
                            getSelectedRowData={props.onChangeSelectedRowData}
                            downloadLinkSelector={downloadLinkSelector}
                        />
                    </Mobile>
                </>
            </GridField>

            <Desktop>
                <ButtonList>
                    {/** 취소 */}
                    <Button variant="outlined" color="darkGray" size="medium" onClick={props.onCancel}>
                        취소
                    </Button>
                    {/** 확인 */}
                    <Button variant="contained" color="darkGray" size="medium" onClick={props.onConfirm}>
                        확인
                    </Button>
                </ButtonList>
            </Desktop>

            <Mobile>
                <ButtonList>
                    {/** 취소 */}
                    <Button variant="outlined" color="darkGray" size="xlarge" onClick={props.onCancel}>
                        취소
                    </Button>
                    {/** 확인 */}
                    <Button variant="contained" color="darkGray" size="xlarge" onClick={props.onConfirm}>
                        확인
                    </Button>
                </ButtonList>
            </Mobile>
        </Wrapper>
    );
};

export default FileUploadList;

const Wrapper = styled.div``;

const GridField = styled.div`
    margin: 16px 0;
`;

const ButtonList = styled.div`
    ${(props) => {
        if (props.theme.device.deskTop) {
            return css`
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 12px;
            `;
        }
    }}

    ${(props) => {
        if (props.theme.device.mobile) {
            return css`
                display: flex;
                justify-content: center;
                gap: 12px;
            `;
        }
    }}
`;
