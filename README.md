# use-multi-form

useMultiForm은 복잡한 멀티 스텝 폼(Multi-step Form)의 흐름 제어 로직을 UI와 완전히 분리하여, 선언적이고 타입을 안전하게 관리할 수 있도록 돕는 커스텀 훅입니다.

---

## 왜 만들었나요?

다단계 UI를 구현하다 보면 다음과 같은 문제가 자주 발생합니다.

- 스텝 순서 변경 시 인덱스 기반 상태가 깨짐
- 네비게이션 로직과 실제 렌더링되는 스텝이 불일치
- 동적/조건부 스텝에서 타입 안정성이 무너짐
- 코드 복잡도 상승

`useMultiForm`는 이런 문제를 해결하기 위해:

- 숫자 인덱스 대신 **의미 있는 이름 기반 스텝** 사용
- TypeScript 제너릭을 통한 **강한 타입 보장**
- 조건부 스텝을 안전하게 지원
- React 런타임과 batching 모델을 자연스럽게 활용

하도록 설계되었습니다.

---

## Installation

```bash
npm install use-multi-form
# 또는
yarn add use-multi-form
```

## Quick Start

```tsx
import { useMultiForm } from "use-multi-form";

type StepName = "first" | "second" | "review";

function Example() {
  const { MultiForm, Step, handleStep } = useMultiForm<StepName>([
    "first",
    "second",
    "review",
  ]);

  return (
    <>
      <MultiForm>
        <Step name="first">
          <FirstStep />
        </Step>
        <Step name="second">
          <SecondStep />
        </Step>
        <Step name="review">
          <Review />
        </Step>
      </MultiForm>

      <button onClick={() => handleStep("before")}>이전</button>
      <button onClick={() => handleStep("next")}>다음</button>
    </>
  );
}
```

## 핵심 개념

### 스텝 순서

스텝의 순서는 `MultiForm`의 인자로 넘긴 배열의 인덱스를 기준으로 순서를 매깁니다

```tsx
useMultiForm<StepName>(["login", "profile", "confirm"]);
//login = first
//profile = second
//confirm = third
```

---

### 제너릭을 활용한 타입 안정성

`useMultiForm`는 제너릭을 사용하여 스텝 이름을 강하게 제한합니다.

```ts
type StepName = "login" | "profile" | "confirm";

useMultiForm<StepName>(["login", "profile", "confirm"]);
```

이로 인해:

- 존재하지 않는 스텝 이름 사용 시 컴파일 에러
- 문자열 오타로 인한 런타임 버그 방지
- 네비게이션과 렌더링 간 명확한 계약 유지

를 보장합니다

---

## API 설명

### `useMultiForm`

```ts
const { nowStep, handleStep, Step, MultiForm } = useMultiForm<T>(names);
```

| 이름         | 설명                                   |
| ------------ | -------------------------------------- |
| `nowStep`    | 현재 활성화된 스텝 이름                |
| `handleStep` | 스텝 이동 함수 (`"next"` / `"before"`) |
| `Step`       | 개별 스텝을 나타내는 컴포넌트          |
| `MultiForm`  | 스텝을 감싸는 컨테이너 컴포넌트        |

---

### `Step`

```tsx
<Step name={T}>{children}</Step>
```

| Props  | 설명                             |
| ------ | -------------------------------- |
| `name` | 스텝 식별자 (`T` 중 하나여야 함) |

## 설계 의도

- **Compound Component 패턴**  
  JSX 구조 자체가 스텝 정의가 되도록 설계했습니다.

- **이름 기반 네비게이션**  
  인덱스 기반 로직의 취약함을 제거했습니다.

- **DX 최적화**  
  isValidElement와 props.name 매칭을 통해 런타임에 발생할 수 있는 매핑 오류를 방지하고, 잘못된 스텝 접근 시 즉각적인 피드백(console.warn)을 제공하여 디버깅 시간을 단축합니다.
