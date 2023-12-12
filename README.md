# rmsoft assignment

## 실행 방법

- node를 설치합니다. (사용한 node -v 20.10.0)

```
npm install
npm run dev
```

## 사용한 기술 및 라이브러리

![code](https://github.com/khw970421/rmsoft/assets/59253551/2cc0f70c-bea6-4d93-87da-5117db265ee7)

## Deployment

> https://rmsoft-gilt.vercel.app/

## 고민 했던 부분

### 1. 메모 목록에서 메모 내용의 첫번째 줄이 메모의 제목으로 표시 기능의 타입스크립트 any 수정하기
[PR Link](https://github.com/khw970421/rmsoft/pull/9)

- 기존의 기능 구현을 위해서 타입 에러를 막기 위해 any를 사용했었다.

![code](https://github.com/khw970421/rmsoft/assets/59253551/47e66bc1-6733-4e3f-ba9e-2992e12df55d)

- `EditorState`에 `toJSON`을 처리하면 `SerializedEditorState`로 바뀌게 된다.

* `SerializedEditorState` 타입의 root로 접근하게 되면 `SerializedRootNode<T>` 타입을 얻는다.
* `SerializedRootNode<T>` 타입은 type과 version을 갖고 있다고 적혀있다.  
  하지만 실제 결과 값은 기능구현을 위한 다른 프로퍼티도 포함되어 있다.
* any 타입을 사용하는 것을 고치기 위해 `as unknown as type` 처리를 하여 any 타입의 사용을 지양했다.

![new](https://github.com/khw970421/rmsoft/assets/59253551/6813d67b-ac17-42b5-8576-11ff725f6cd3)

### 2. 로컬스토리지 try catch 처리

- 로컬스토리지에서 값을 가져올 때 의도치 않게 로컬스토리지 값이 변질된다면 실행시 에러가 발생할 수 있어 이를 막기 위해 `try catch`로 해당 부분을 묶고 만약 문제가 발생했다면 해당 로컬스토리지 내용을 삭제하는 방식을 구현

![q](https://github.com/khw970421/rmsoft/assets/59253551/6467404b-e84d-409d-9ab9-ec42cdafc7c3)

### 3. 텍스트 입력 후 일정 시간 후에 입력 사항이 저장

- 즉시 입력사항이 저장되는 것은 값이 변경되는 것으로 인한 리렌더링이 불필요하게 많이 발생한다고 생각하여 이를 막기 위해서는 텍스트 입력 시 **디바운스**처리가 필요하다고 생각하여 디바운스 방식을 구현

![debounce](https://github.com/khw970421/rmsoft/assets/59253551/0de93cbf-bdae-4415-951d-8b49eb901ffa)
![123](https://github.com/khw970421/rmsoft/assets/59253551/a6b31533-61ec-4825-bf4b-8ca047a7ee0b)

## 기능 구현 사항

- [x] 최소 가로 길이는 '1400px' 이고, 최대 가로 길이는 '1920px' 입니다.

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
