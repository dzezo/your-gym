import { useRef, useEffect } from "react";

export default function useUpdateEffect(
  callback: Function,
  dependencies: unknown[]
) {
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    return callback();
  }, dependencies);
}
