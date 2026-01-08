// import { render, renderHook } from "@testing-library/react";
// import { useMultiForm } from "../useMultiForm";

// describe("useMultiForm render test", () => {
//   it("컴포넌트가 정상적으로 렌더링 되어야 한다", () => {
//     //
//     const { result } = renderHook(useMultiForm);
//     const MultiForm = result.current.MultiForm;
//     render(<MultiForm>

//         </result.current.MultiForm>);
//   });

//   it("현재 name에 맞는 컴포넌트가 렌더링 되어야 한다", () => {
//     //
//   });

//   it("nowStep이하면 경고문구가 뜨고 nowStep이정되어야 한다", () => {
//     //
//   });
// });

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useMultiForm } from "../useMultiForm";
import { useState } from "react";

export type nameType = "첫번째 기능" | "두번째" | "세번째 기능" | "modal";
// 테스트용 임시 컴포넌트
const TestComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const names: nameType[] = ["첫번째 기능", "두번째", "세번째 기능", "modal"];
  const { MultiForm, Step, handleStep, nowStep } =
    useMultiForm<nameType>(names);

  const handleModal = () => {
    handleStep("next");
    setIsOpen(true);
  };
  return (
    <div>
      <MultiForm>
        <Step name={"첫번째 기능"}>
          <div>첫번째</div>
        </Step>

        <Step name={"두번째"}>
          <div>두번째</div>
        </Step>
        <Step name={"세번째 기능"}>
          <div>세번째</div>
        </Step>

        {isOpen && (
          <Step name={"modal"}>
            <div>모달</div>
          </Step>
        )}
      </MultiForm>

      <button onClick={() => handleModal()}>열기</button>
      <button onClick={() => handleStep("before")}>이전</button>
      <button onClick={() => handleStep("next")}>다음</button>
    </div>
  );
};

describe("MultiForm 컴포넌트 통합 테스트", () => {
  it("처음에는 0번 스텝의 내용만 보여야 한다", () => {
    const name = ["첫번째 기능", "두번째", "세번째 기능", "4"];

    render(<TestComponent />);

    expect(screen.getByText("첫번째")).toBeDefined();
    expect(screen.queryByText("두번째")).toBeNull();
  });

  it("다음 버튼을 누르면 다음 스텝의 내용이 렌더링되어야 한다", async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    const nextButton = screen.getByText("다음");

    await user.click(nextButton);

    expect(screen.getByText("두번째")).toBeDefined();
    expect(screen.queryByText("첫번째")).toBeNull();
  });

  it("다음 버튼을 누르면 다음 스텝의 내용이 렌더링되어야 한다", async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    const nextButton = screen.getByText("다음");

    // 클릭 이벤트 발생
    await user.click(nextButton);

    expect(screen.getByText("두번째")).toBeDefined();
    expect(screen.queryByText("첫번째")).toBeNull();
  });

  it("name의 인자 name에는 0 부터 시작하고 중복 없이 숫자를 배정해야 한다.", async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    // userEvent.click("next")
  });

  it("모달이 열리고 해당 스텝에 해당되면 렌더링 되야한다 ", async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    const openButton = screen.getByText("열기");
    const nextButton = screen.getByText("다음");

    await user.click(nextButton);
    await user.click(nextButton);
    await user.click(nextButton);
    await user.click(openButton);

    expect(screen.getByText("모달")).toBeDefined();
  });
});
