# rmsoft assignment

## 실행 방법

- node를 설치합니다. (사용한 node -v 20.10.0)

```
npm install
npm run start
```

## 사용한 기술 및 라이브러리

![code](https://github.com/khw970421/rmsoft/assets/59253551/2cc0f70c-bea6-4d93-87da-5117db265ee7)

## Deployment

> https://rmsoft-gilt.vercel.app/

## 기능 구현 사항

### 1. NOTEBOOKS

- [x] 최초의 화면에서 NOTEBOOKS는 하나도 없는 상태이어야 합니다.
- [x] 백엔드를 구현하지 않습니다. 모두 프론트 단에서만 처리될수 있어야 합니다. (그러므로 데이터는 LocalStorage에 저장하여 구현합니다.)
- [x] NOTEBOOKS의 목록을 확인 할 수 있어야합니다.
- [x] NOTEBOOKS를 추가하거나 삭제 할 수 있어야 합니다.
- [x] NOTEBOOKS 안에 NOTEBOOKS를 추가 할 수 없습니다.
- [x] NOTEBOOKS를 선택하여 해당 NOTEBOOKS에 있는 메모 목록을 확인 할 수 있어야 합니다.

## 2. Memos

- [x] NOTEBOOKS에 메모를 추가하거나 삭제 할 수 있어야 합니다.
- [x] 메모 목록에서 메모를 선택하여 메모 내용을 확인하고 수정 할 수 있어야 합니다.
- [x] 메모 목록에서 메모 내용의 첫번째 줄이 메모의 제목으로 표시 되어야 합니다.
- [x] 메모의 제목이 메모 목록의 가로 길이를 넘어가는 경우, 말줄임표(...) 처리되어야 합니다.

## 3. Editor

- [x] 텍스트 편집기는 ‘lexical text editor’를 이용하여 구현되어야 합니다.
- [x] 텍스트 편집 영역의 위, 아래 버튼은 구현하지 않습니다.
- [x] 텍스트 입력 후 즉시 혹은 일정 시간 후에 입력 사항이 저장 되어야 합니다.
