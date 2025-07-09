* 설정 방법
<ol>
    <li><a href='https://nodejs.org/ko/download'>NodeJS 설치</a></li>
    <li><a href='https://code.visualstudio.com/download'>VSCode 설치</a></li>
    <li>VSCode Extension 설치 (필수) -> ESLint, Prettier - Code formatter</li>
    <li>VSCode Extension 설치 (선택) -> Auto Rename Tag, Bracket Pair Colorizer, ES7+ React/Redux/React-Native snippets, Live Server</li>
    <li>VSCode Setting 수정 -> (ctrl + ,)누른 후 우측 상단의 Open Settings (JSON) 클릭, 설정 내용 입력 (아래 참고)</li>
</ol>

<br />
<br />

* VSCode Setting에 입력할 내용
```
{
  "[typescript]": {
    "editor.formatOnSave": true
  },

  "[typescriptreact]": {
    "editor.formatOnSave": true
  },

  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },

  "terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\cmd.exe",
}
```

<br />
<br />

* 코드 실행 (<a href='http://localhost'>http://localhost</a> 접속)
```
npm run dev
```

<br />
<br />

* 코드 테스트
```
npm run text
```

<br />
<br />

* 코드 빌드
```
npm run build
```