import { useRecoilState } from 'recoil';

import { Itype, _message, _toggle, _type } from './atom';

export const _recoilSnackBar = () => {
    const [type, setType] = useRecoilState<Itype>(_type);
    const [toggle, setToggle] = useRecoilState<boolean>(_toggle);
    const [message, setMessage] = useRecoilState<string>(_message);

    return {
        type,
        toggle,
        message,
        alert: (type: Itype, message?: string) => {
            setType(type);
            setMessage(message ?? '');
            setToggle(!toggle);
        },
    };
};
