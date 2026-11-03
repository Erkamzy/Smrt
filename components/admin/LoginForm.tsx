"use client";

import { useActionState } from "react";
import { login, type FormState } from "@/app/admin/actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(login, {});

  return (
    <form action={action} className="mt-6 space-y-4">
      <div>
        <label htmlFor="password" className="sc-label">Нууц үг</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="sc-input"
        />
      </div>
      {state.error && <p role="alert" className="text-sm font-medium text-red-500">{state.error}</p>}
      <button type="submit" disabled={pending} className="sc-btn sc-btn-primary w-full">
        {pending ? "Шалгаж байна..." : "Нэвтрэх"}
      </button>
    </form>
  );
}
