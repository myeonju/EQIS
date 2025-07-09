import { atom } from 'recoil';

export const _processIdList = atom<string[]>({
    key: '_processIdList',
    default: [],
});
