import * as React from 'react';

import theme from '@/styles/theme';

interface Iprops {
    children: React.ReactNode;
}

const Desktop = (props: Iprops) => {
    return <>{theme.device.deskTop && props.children}</>;
};

export default Desktop;
