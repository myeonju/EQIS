import * as React from 'react';

import theme from '@/styles/theme';

interface Iprops {
    children: React.ReactNode;
}

const Mobile = (props: Iprops) => {
    return <>{theme.device.mobile && props.children}</>;
};

export default Mobile;
