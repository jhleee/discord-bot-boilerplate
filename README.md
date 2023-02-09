# 디스코드봇 빠른 개발

`discord-js`로 구현된 간단한 봇서버 입니다.

`.env` 파일에 봇 토큰 (`BOT_TOKEN`)과  어플리케이션 아이디 (`APPLICATION_ID`)를 설정해주세요.


## Quick Guide

```bash
> git clone https://github.com/jhleee/discord-bot-boilerplate.git
> cd discord-bot-boilerplate
> npm i
> npm start
```

## Slash Command
`/src/slashCommand/interface.ts`를 상속받아서 구현하세요.
명령어의 추가는 `index.ts`의 예제를 따라하세요.
