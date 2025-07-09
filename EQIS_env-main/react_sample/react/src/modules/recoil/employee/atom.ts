import { atom } from 'recoil';

import { eeBInit, IeeB } from '@/interfaces/employee/eeB';
import { IopsGrpP } from '@/interfaces/ops/opsGrpP';

export const _eeB = atom<IeeB>({
    key: '_eeB',
    default: eeBInit(),
});

export const _opsGrpPList = atom<IopsGrpP[]>({
    key: '_opsGrpPList',
    default: [],
});
