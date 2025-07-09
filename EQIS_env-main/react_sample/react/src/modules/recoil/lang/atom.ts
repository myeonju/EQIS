import { atom } from 'recoil';

import { IlangCd } from '@/interfaces/lang/langCd';

export const _langCd = atom<IlangCd>({
    key: '_langCd',
    default: (localStorage.getItem(process.env.LANG_CD) as IlangCd) ?? 'KO',
});

export const _translationKO = atom<Map<string, string>>({
    key: '_translateKO',
    default: new Map<string, string>(),
});

export const _translationEN = atom<Map<string, string>>({
    key: '_translateEN',
    default: new Map<string, string>(),
});
