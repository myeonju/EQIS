import { useRecoilState } from 'recoil';

import { ItopNavMenu } from '@/interfaces/menu/topNavMenu';

import { _topNavMenuList } from './atom';

export const _recoilMenu = () => {
    const [topNavMenuList, setTopNavMenuList] = useRecoilState<ItopNavMenu[]>(_topNavMenuList);

    return {
        topNavMenuList,

        saveTopNavMenuList: (topNavMenuList: ItopNavMenu[]) => {
            setTopNavMenuList(topNavMenuList);
        },

        getScrnNm: (pathId: string) => {
            const topNavMenu = topNavMenuList.find((topNavMenu) => topNavMenu.pathId === pathId);
            if (topNavMenu) {
                return topNavMenu.scrnNm;
            }
        },
    };
};
