import { baseInit, Ibase } from '@/interfaces/common/base';

export interface IComponentTest extends Ibase {
    check: string;
    strDt: string;
    endDt: string;
    testDt: string;
}

export const componentTestInit = () => {
    const componentTest: IComponentTest = {
        check: '',
        strDt: '',
        endDt: '',
        testDt: '',

        ...baseInit(),
    };

    return componentTest;
};
