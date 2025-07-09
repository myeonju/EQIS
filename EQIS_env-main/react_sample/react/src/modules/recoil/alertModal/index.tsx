import * as React from 'react';

import { useRecoilState } from 'recoil';

import { IisOpen, _isOpen } from './atom';

type IopenId = 'lastLogin';

export const _recoilAlertModal = () => {
    /**
     * useRecoilState
     */
    const [isOpen, setIsOpen] = useRecoilState<IisOpen>(_isOpen);

    /**
     * useEffect
     */
    React.useEffect(() => {
        let openYn = false;

        Object.keys(isOpen).map((key) => {
            if (isOpen[key]) {
                openYn = true;
                return;
            }
        });

        if (openYn) {
            document.body.style.cssText = `
                overflow: hidden;
            `;
        } else {
            document.body.style.cssText = `
                overflow: '';
            `;
        }
    }, [isOpen]);

    return {
        open: (openId: IopenId) => {
            return !!isOpen[openId];
        },

        toggle: (openId: IopenId) => {
            setIsOpen({
                ...isOpen,
                [openId]: !isOpen[openId],
            });
        },
    };
};
