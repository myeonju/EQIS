import { useRecoilState } from 'recoil';

import { _processIdList } from './atom';

export const _recoilAuth = () => {
    const [processIdList, setProcessIdList] = useRecoilState<string[]>(_processIdList);

    return {
        processIdList,

        save: (processIdList: string[]) => {
            setProcessIdList(processIdList);
        },

        isAuth: (processId: string) => {
            return processIdList.includes(processId);
        },
    };
};
