import * as React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

import Button from '@/components/atoms/button';
import Icon from '@/components/atoms/icon';
import Line from '@/components/atoms/line';
import Text from '@/components/atoms/text';
import Accordion from '@/components/molecules/accordion';
import BasicWorksheet, { Header, Body, NoBox, ButtonList } from '@/components/molecules/basicWorksheet';

const Worksheet = () => {
    return (
        <BasicWorksheet>
            <Header shadow>
                <ButtonList>
                    <NoBox>
                        <Text color="darkGray100" size="small" weight="medium">
                            N-001-0001
                        </Text>
                    </NoBox>
                </ButtonList>
                <ButtonList></ButtonList>
            </Header>

            <Line width="100%" height={1} color="gray300" />

            <Body>{}</Body>
        </BasicWorksheet>
    );
};

export default Worksheet;
