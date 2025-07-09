import * as React from 'react';

import { Link } from 'react-router-dom';

import { _recoilLang } from '@/modules/recoil/lang';

const LangTest1 = () => {
    const recoilLang = _recoilLang();

    const [codeList] = React.useState<string[]>(['1', '2', '3', '4']);

    React.useEffect(() => {
        recoilLang.langInit(codeList); // 화면에 사용될 언어 코드들을 초기화 시킨다.
    }, []);

    return (
        <div>
            <h2>Language Test 2</h2>
            {/* 언어 코드값 번역된 값을 가져와 사용한다. */}
            <p>{recoilLang.translate('1')}</p>
            <p>{recoilLang.translate('2')}</p>
            <p>{recoilLang.translate('3')}</p>
            <p>{recoilLang.translate('4')}</p>
            <button onClick={() => recoilLang.changeLangCd('KO')}>언어 (ko)</button> {/* 언어를 ko로 변경한다 */}
            <button onClick={() => recoilLang.changeLangCd('EN')}>언어 (en)</button> {/* 언어를 ko로 변경한다 */}
            <br />
            <Link to="/template/langTest2">langTest1</Link>
        </div>
    );
};

export default LangTest1;
