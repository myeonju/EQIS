import { cloneDeep } from 'lodash';

export interface ItopNavMenu {
    scrnNm: string;
    supiScrnNm: string;
    pathId: string;
    adminYn: string;
}

export const topNavMenuInit = () => {
    const topNavMenu: ItopNavMenu = {
        scrnNm: '',
        supiScrnNm: '',
        pathId: '',
        adminYn: '',
    };

    return cloneDeep(topNavMenu);
};
