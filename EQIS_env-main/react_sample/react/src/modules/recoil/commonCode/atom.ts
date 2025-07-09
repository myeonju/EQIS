import { atom } from 'recoil';

import { IlangComCdP } from '@/interfaces/commonCode/langComCdP';

export const _conversionKO = atom<Map<string, IlangComCdP[]>>({
    key: '_conversionKO',
    default: new Map<string, IlangComCdP[]>(),
});

export const _conversionEN = atom<Map<string, IlangComCdP[]>>({
    key: '_conversionEN',
    default: new Map<string, IlangComCdP[]>(),
});
