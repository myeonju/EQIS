import * as React from 'react';

import styled, { css } from 'styled-components';

import Icon from '@/components/atoms/icon';
import Text from '@/components/atoms/text';

import { _recoilSnackBar } from '@/modules/recoil/snackBar';
import { Itype } from '@/modules/recoil/snackBar/atom';

import { getImage } from '@/utils/image';

const SnackBar = () => {
    const duration = 3000;

    /**
     * recoil
     */
    const recoilSnackBar = _recoilSnackBar();

    /**
     * useState
     */
    const [open, setOpen] = React.useState<boolean>(false);

    /**
     * useRef
     */
    const timeoutRef = React.useRef<NodeJS.Timeout>();

    /**
     * useEffect
     */
    React.useEffect(() => {
        setOpen(true);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setOpen(false);
        }, duration);
    }, [recoilSnackBar.toggle]);

    /**
     * iconImage
     */
    const iconImage = () => {
        switch (recoilSnackBar.type) {
            case 'SUCCESS':
                return getImage('CHECK-CIRCLE-FILL');

            case 'FAIL':
                return getImage('EXCLAMATION-CIRCLE-FILL');

            default:
                return '';
        }
    };

    return (
        <Wrapper open={open}>
            <Container type={recoilSnackBar.type}>
                <Icon src={iconImage()} />
                <Text color="white" size="small" overflow="ellipsis" padding="0 24px 0 0 ">
                    {recoilSnackBar.message}
                </Text>
            </Container>
        </Wrapper>
    );
};

export default SnackBar;

const Wrapper = styled.div<{ open: boolean }>`
    position: fixed;
    bottom: 0;
    left: 50%;

    transform: translate(-50%, 0);

    display: flex;
    justify-content: flex-end;

    width: 100%;
    height: 48px;

    transition: 0.8s ease-out;

    z-index: 1000;

    ${(props) => css`
        max-width: ${props.theme.maxWidth};
    `}

    ${(props) => {
        if (!props.open) {
            return css`
                transform: translate(-50%, 48px);
            `;
        }
    }}
`;

const Container = styled.div<{ type: Itype }>`
    display: flex;
    align-items: center;
    gap: 12px;

    padding: 8px 12px;

    width: 100%;
    height: 100%;

    ${(props) => {
        if (props.theme.device.deskTop) {
            return css`
                max-width: 360px; ;
            `;
        }
    }}

    ${(props) => {
        switch (props.type) {
            case 'SUCCESS':
                return css`
                    background-color: ${props.theme.color.skyblue300};
                `;

            case 'FAIL':
                return css`
                    background-color: ${props.theme.color.vivid200};
                `;
        }
    }}
`;
