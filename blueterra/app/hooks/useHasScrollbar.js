import { useLayoutEffect, useRef, useState } from "react";

export function useHasScrollbar(deps = []) {
  const containerRef = useRef(null);
  const [hasScrollbar, setHasScrollbar] = useState(false);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const checkOverflow = () => {
      const el = containerRef.current;
      setHasScrollbar(el.scrollHeight > el.clientHeight);
    };

    checkOverflow(); // run initially

    // Watch for size/content changes
    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, deps);

  return { containerRef, hasScrollbar };
}
