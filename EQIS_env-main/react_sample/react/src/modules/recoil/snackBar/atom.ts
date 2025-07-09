import { atom } from 'recoil';

export type Itype = '' | 'SUCCESS' | 'FAIL';

export const _type = atom<Itype>({
    key: '_type',
    default: '',
});

export const _toggle = atom<boolean>({
    key: '_translateKO',
    default: false,
});

export const _message = atom<string>({
    key: '_message',
    default: '',
});
