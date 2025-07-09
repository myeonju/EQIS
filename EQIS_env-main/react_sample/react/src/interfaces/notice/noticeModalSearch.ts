import { cloneDeep } from 'lodash';

export interface InoticeModalSearch {
    page: number;
    limit: number;
}

export const noticeModalSearchInit = () => {
    const noticeModalSearch: InoticeModalSearch = {
        page: 0,
        limit: 0,
    };

    return cloneDeep(noticeModalSearch);
};
