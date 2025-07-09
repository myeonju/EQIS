import * as React from 'react';

import styled, { css } from 'styled-components';

import Icon from '@/components/atoms/icon';
import BasicModal from '@/components/molecules/modal/basicModal';

import { getImage } from '@/utils/image';

interface Iprops {
    visible: boolean;
}

const LoadingModal = (props: Iprops) => {
    return (
        <LoadingBasicModal visible={props.visible}>
            <Icon src={getImage('LOADING')} width={160} height={160} />
        </LoadingBasicModal>
    );
};

export default LoadingModal;

const LoadingBasicModal = styled(BasicModal)`
    z-index: 2000;

    ${(props) => css`
        & > div {
            background-color: ${props.theme.color.none};
        }
    `}
`;
