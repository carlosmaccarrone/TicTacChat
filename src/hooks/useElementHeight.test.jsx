import { useElementHeight } from "@/hooks/useElementHeight.jsx";
import { renderHook, act } from "@testing-library/react";

class ResizeObserverMock {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

test("devuelve ref y altura inicial de un elemento", () => {
  const { result } = renderHook(() => useElementHeight());

  const [ref, height] = result.current;

  expect(ref).toHaveProperty("current", null);
  expect(height).toBe(0);

  const div = document.createElement("div");
  div.getBoundingClientRect = () => ({ height: 150 });
  ref.current = div;

  act(() => {
    window.dispatchEvent(new Event("resize"));
  });

  const [, updatedHeight] = renderHook(() => useElementHeight()).result.current;
  expect(updatedHeight).toBe(0);
});

test("actualiza altura al medir el elemento", () => {
  const div = document.createElement("div");
  div.getBoundingClientRect = () => ({ height: 200 });

  const { result } = renderHook(() => useElementHeight());
  result.current[0].current = div;

  act(() => {
    window.dispatchEvent(new Event("resize"));
  });

  const [, height] = result.current;
  expect(height).toBe(200);
});
