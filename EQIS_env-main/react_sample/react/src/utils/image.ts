// icon
import sqimLogo from '@/assets/images/icon/SQIM_logo.png';
import sqimSlogan from '@/assets/images/icon/SQIM_slogan.png';
import arrowCornerRight from '@/assets/images/icon/arrow_corner_right.png';
import arrowDown from '@/assets/images/icon/arrow_down.png';
import arrowRight from '@/assets/images/icon/arrow_right.png';
import arrowTriangleBk from '@/assets/images/icon/arrow_triangle_bk.png';
import arrowTriangleWt from '@/assets/images/icon/arrow_triangle_wt.png';
import arrowUp from '@/assets/images/icon/arrow_up.png';
import btnMoreOn from '@/assets/images/icon/btn_more_on.png';
import calendar from '@/assets/images/icon/calendar.png';
import checkBoxOff from '@/assets/images/icon/check-box-off.png';
import checkBoxOn from '@/assets/images/icon/check-box-on.png';
import checkCircleFill from '@/assets/images/icon/check-circle-fill.png';
import close from '@/assets/images/icon/close.png';
import eng from '@/assets/images/icon/eng.png';
import exclamationCircleFill from '@/assets/images/icon/exclamation-circle-fill.png';
import minusCircle from '@/assets/images/icon/icon_minus_circle.png';
import inboxOn from '@/assets/images/icon/inbox_off.png';
import inboxOff from '@/assets/images/icon/inbox_on.png';
import kor from '@/assets/images/icon/kor.png';
import login from '@/assets/images/icon/login_on.png';
import logout from '@/assets/images/icon/logout_on.png';
import mailOff from '@/assets/images/icon/mail-off.png';
import mailOn from '@/assets/images/icon/mail-on.png';
import nextAllOff from '@/assets/images/icon/next_all_off.png';
import nextAllOn from '@/assets/images/icon/next_all_on.png';
import nextBtnOff from '@/assets/images/icon/next_btn_off.png';
import nextBtnOn from '@/assets/images/icon/next_btn_on.png';
import prevAllOff from '@/assets/images/icon/prev_all_off.png';
import prevAllOn from '@/assets/images/icon/prev_all_on.png';
import prevBtnOff from '@/assets/images/icon/prev_btn_off.png';
import prevBtnOn from '@/assets/images/icon/prev_btn_on.png';
import radioButtonOff from '@/assets/images/icon/radioButton_off.png';
import radioButtonOn from '@/assets/images/icon/radioButton_on.png';
import tooltip from '@/assets/images/icon/tooltip.png';
import loading from '@/assets/images/loading/loading.gif';

export const imageList = [
    // icon
    'ARROW-DOWN',
    'ARROW-UP',
    'ARROW-CORNER-RIGHT',
    'ARROW-RIGHT',
    'ARROW-TRIANGLE-BK',
    'ARROW-TRIANGLE-WT',
    'BTN-MORE-ON',
    'CALENDAR',
    'ENG',
    'MINUS-CIRCLE',
    'KOR',
    'NEXT-ALL-OFF',
    'NEXT-ALL-ON',
    'NEXT-BTN-OFF',
    'NEXT-BTN-ON',
    'PREV-ALL-OFF',
    'PREV-ALL-ON',
    'PREV-BTN-OFF',
    'PREV-BTN-ON',
    'RADIO-BUTTON-OFF',
    'RADIO-BUTTON-ON',
    'INBOX-ON',
    'INBOX-OFF',
    'SQIM-SLOGAN',
    'SQIM-LOGO',
    'LOGIN',
    'LOGOUT',
    'CLOSE',
    'TOOLTIP',
    'CHECK-BOX-ON',
    'CHECK-BOX-OFF',
    'CHECK-CIRCLE-FILL',
    'EXCLAMATION-CIRCLE-FILL',
    'LOADING',
    'MAIL-ON',
    'MAIL-OFF',
] as const;

export const getImage = (image: typeof imageList[number]) => {
    switch (image) {
        // icon
        case 'ARROW-DOWN':
            return arrowDown;

        case 'ARROW-UP':
            return arrowUp;

        case 'ARROW-CORNER-RIGHT':
            return arrowCornerRight;

        case 'ARROW-RIGHT':
            return arrowRight;

        case 'ARROW-TRIANGLE-BK':
            return arrowTriangleBk;

        case 'ARROW-TRIANGLE-WT':
            return arrowTriangleWt;

        case 'BTN-MORE-ON':
            return btnMoreOn;

        case 'CALENDAR':
            return calendar;

        case 'ENG':
            return eng;

        case 'MINUS-CIRCLE':
            return minusCircle;

        case 'KOR':
            return kor;

        case 'NEXT-ALL-OFF':
            return nextAllOff;

        case 'NEXT-ALL-ON':
            return nextAllOn;

        case 'NEXT-BTN-OFF':
            return nextBtnOff;

        case 'NEXT-BTN-ON':
            return nextBtnOn;

        case 'PREV-ALL-OFF':
            return prevAllOff;

        case 'PREV-ALL-ON':
            return prevAllOn;

        case 'PREV-BTN-OFF':
            return prevBtnOff;

        case 'PREV-BTN-ON':
            return prevBtnOn;

        case 'RADIO-BUTTON-OFF':
            return radioButtonOff;

        case 'RADIO-BUTTON-ON':
            return radioButtonOn;

        case 'INBOX-OFF':
            return inboxOff;

        case 'INBOX-ON':
            return inboxOn;

        case 'SQIM-SLOGAN':
            return sqimSlogan;

        case 'SQIM-LOGO':
            return sqimLogo;

        case 'LOGIN':
            return login;

        case 'LOGOUT':
            return logout;

        case 'CLOSE':
            return close;

        case 'TOOLTIP':
            return tooltip;

        case 'CHECK-BOX-ON':
            return checkBoxOn;

        case 'CHECK-BOX-OFF':
            return checkBoxOff;

        case 'CHECK-CIRCLE-FILL':
            return checkCircleFill;

        case 'EXCLAMATION-CIRCLE-FILL':
            return exclamationCircleFill;

        case 'LOADING':
            return loading;

        case 'MAIL-ON':
            return mailOn;

        case 'MAIL-OFF':
            return mailOff;
    }
};
