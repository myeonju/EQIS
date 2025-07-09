import { atom } from 'recoil';

export interface IisOpen {
    [key: string]: boolean;
}

export const _isOpen = atom<IisOpen>({
    key: '_isOpen',
    default: {},
});
