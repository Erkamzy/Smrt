"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Хуудасны агуулга зурагдаж дуустал бага зэрэг хүлээнэ
    const t = setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);

    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}