import { cleanup, render } from "@testing-library/react";
import { MutableStore } from "@ts-monad/observable";
import { useMutableStore, useObservable } from "..";

describe("useObservable & useMutable", () => {
  let mut: MutableStore<number>;

  const Counter = () => {
    mut = useMutableStore(0);
    const value = useObservable(mut);
    return (
      <div>
        <span title="count">{value}</span>&nbsp;
        <button onClick={() => mut.set(mut.get() + 1)}>Inc</button>
      </div>
    );
  };

  it("should keep track of the observable", () => {
    const r = render(<Counter />);

    expect(r.queryByTitle("count")?.textContent).toBe("0");

    r.queryByText("Inc")?.click();
    expect(r.queryByTitle("count")?.textContent).toBe("1");

    cleanup();
    expect(mut.isObserved()).toBeFalsy();
  });
});
