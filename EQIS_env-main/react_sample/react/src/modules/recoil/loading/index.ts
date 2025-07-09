import { useRecoilState } from 'recoil';

import { _open } from './atom';

export const _recoilLoading = () => {
    const [open, setOpen] = useRecoilState<boolean>(_open);

    return {
        open,
        setLoading: (open: boolean) => {
            setOpen(open);
        },
    };
};
