"use client";

import { useTransition } from "react";

// Server action-ийг товчоор дуудна; устгах мэт үйлдэлд баталгаажуулалт асууна
export default function ActionButton({
  action,
  confirm: question,
  className = "",
  children,
}: {
  action: () => Promise<void>;
  confirm?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [pending, start] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (question && !window.confirm(question)) return;
        start(() => action());
      }}
      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50 ${className}`}
    >
      {pending ? "..." : children}
    </button>
  );
}
