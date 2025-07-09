import { atom } from 'recoil';

import { ItopNavMenu } from '@/interfaces/menu/topNavMenu';

export const _topNavMenuList = atom<ItopNavMenu[]>({
    key: '_topNavMenuList',
    default: [],
});
