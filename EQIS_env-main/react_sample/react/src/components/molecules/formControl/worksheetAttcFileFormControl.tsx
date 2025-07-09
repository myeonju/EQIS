import * as React from 'react';

import styled, { css } from 'styled-components';

import Icon from '@/components/atoms/icon';
import Text from '@/components/atoms/text';

import { IattcFilB } from '@/interfaces/file/attcFilB';

import _useFile from '@/modules/customHook/useFile';

import { getImage } from '@/utils/image';

interface IWrapper {
    height?: number | string;
}

interface Iprops extends IWrapper {
    attcFilBList: IattcFilB[];
    children: React.ReactNode;
}

const WorksheetAttcFileFormControl = (props: Iprops) => {
    /**
     * customHook
     */
    const useFile = _useFile();

    return (
        <Wrapper height={props.height}>
            <ContentSection>{props.children}</ContentSection>

            <AttcFileSection>
                {props.attcFilBList.map((attcFilB, index) => (
                    <Link key={index} href={useFile.fileDownloadLink(attcFilB.encAttcFilNo, attcFilB.encAttcFilSeq)}>
                        <LinkTest color="darkGray100" size="xsmall" pointer>
                            {attcFilB.attcFilOgcNm}
                        </LinkTest>
                    </Link>
                ))}
            </AttcFileSection>
        </Wrapper>
    );
};

export default WorksheetAttcFileFormControl;

const Wrapper = styled.div<IWrapper>`
    display: flex;

    ${(props) => {
        switch (typeof props.height) {
            case 'number':
                return css`
                    height: ${props.height}px;
                `;
            case 'string':
                return css`
                    height: ${props.height};
                `;
        }
    }}
`;

const ContentSection = styled.section`
    width: 100%;
`;

const AttcFileSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 6px;

    padding: 12px 16px;

    margin-top: -1px;
    margin-left: -1px;

    width: 502px;

    overflow: auto;

    ${(props) => css`
        border: 1px solid ${props.theme.color.gray400};
    `}
`;

const Link = styled.a``;

const LinkTest = styled(Text)`
    ${(props) => css`
        &:hover {
            color: ${props.theme.color.cyan200};
            text-decoration: underline;
        }
    `}
`;
