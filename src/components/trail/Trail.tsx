import { useRef, useEffect } from "react";

export function Trail({ isLast }: { isLast: boolean }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const context = ref.current.getContext("2d");

    context?.moveTo(12, 0);
    isLast ? context?.lineTo(12, 17) : context?.lineTo(12, 34);
    context?.moveTo(12, 17);
    context?.lineTo(24, 17);
    if (context?.strokeStyle) context.strokeStyle = "#B8BED1";
    context?.stroke();
  }, [ref.current, isLast]);

  return <canvas ref={ref} id="trailCanvas" width="24" height="34" />;
}
