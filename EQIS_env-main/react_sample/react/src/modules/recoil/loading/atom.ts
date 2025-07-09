import { atom } from 'recoil';

export const _open = atom<boolean>({
    key: '_open',
    default: false,
});
