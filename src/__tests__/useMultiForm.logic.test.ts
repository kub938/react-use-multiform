import { act } from "react";
import { useMultiForm } from "../useMultiForm";
import { renderHook } from "@testing-library/react";

describe("useMultiForm logic test", () => {
  it("다음 버튼을 누르면 다음으로 넘어가야하고 이때 maxStep을 넘지 않아야한다", () => {
    const steps = ["첫번째 기능", "두번째", "세번째 기능"];
    const { result } = renderHook(() => useMultiForm(steps));

    act(() => result.current.handleStep("next"));
    act(() => result.current.handleStep("next"));

    expect(result.current.nowStep).toBe("세번째 기능");
  });

  it("이전 버튼을 누르면 이전으로 넘어가야하고 이때 0보다 작아지면 안된다", () => {
    const steps = ["첫번째 기능", "두번째", "세번째 기능"];
    const { result } = renderHook(() => useMultiForm(steps));

    act(() => result.current.handleStep("next"));
    act(() => result.current.handleStep("next"));
    act(() => result.current.handleStep("before"));
    act(() => result.current.handleStep("before"));
    act(() => result.current.handleStep("before"));

    expect(result.current.nowStep).toBe("첫번째 기능");
  });
});
