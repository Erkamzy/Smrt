"use client";

import { useRef } from "react";

// Хулганы байрлалаар 3D-ээр хазайж, гэрэл туссан мэт харагдана.
// Хөдөлгөөн багасгахыг хүссэн хэрэглэгчид CSS-ээр унтарна (.sc-tilt-inner).
export default function TiltCard({
  children,
  className = "",
  max = 12,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(x - 0.5) * max * 2}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * max * 2}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
    el.dataset.active = "";
  };

  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    delete el.dataset.active;
  };

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={`sc-tilt ${className}`}>
      <div className="sc-tilt-inner h-full w-full">{children}</div>
    </div>
  );
}
