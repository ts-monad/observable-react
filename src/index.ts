import { mutable, Observable } from "@ts-monad/observable";
import { useEffect, useMemo, useState } from "react";

export const useObservable = <T>(ob: Observable<T>) => {
  const { value, unobserve } = useMemo(
    () => ob.observe(v => setState(v)),
    [ob]
  );
  const [state, setState] = useState(value);
  useEffect(() => unobserve, [unobserve]);
  return state;
};

export const useMutableStore = <T>(value: T) =>
  useMemo(() => mutable(value), []);
