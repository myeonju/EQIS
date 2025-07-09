import * as React from 'react';

export interface IisShown {
    [key: string]: boolean;
}

const _useModal = () => {
    /**
     * useState
     */
    const [isShown, setIsShown] = React.useState<IisShown>({});

    /**
     * useEffect
     */
    React.useEffect(() => {
        let open = false;

        Object.keys(isShown).forEach((key) => {
            if (isShown[key]) {
                open = true;
                return;
            }
        });

        if (open) {
            document.body.style.cssText = `
                overflow: hidden;
            `;
        } else {
            document.body.style.cssText = `
                overflow: none;
            `;
        }
    }, [isShown]);

    // toggle
    const toggle = (name: string) => {
        setIsShown((prev) => {
            return {
                ...prev,
                [name]: !prev[name],
            };
        });
    };

    // 모달 전체 닫기
    const closeAll = () => {
        setIsShown({});
    };

    return {
        isShown,
        toggle,
        closeAll,
    };
};

export default _useModal;
