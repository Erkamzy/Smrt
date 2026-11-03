"use client";

import { useActionState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { sendContact, type ContactState } from "@/app/actions";

export default function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, {});
  const v = state.values ?? {};

  if (state.ok) {
    return (
      <div className="sc-card flex h-full flex-col items-center justify-center p-10 text-center">
        <span className="sc-icon"><CheckCircle2 className="h-6 w-6" /></span>
        <h3 className="mt-4 text-xl font-bold">Баярлалаа!</h3>
        <p className="u-soft mt-2">Таны хүсэлтийг хүлээн авлаа. Бид удахгүй холбогдох болно.</p>
      </div>
    );
  }

  return (
    <form action={action} className="sc-card grid gap-4 p-7 text-left sm:grid-cols-2">
      {/* Ботод зориулсан нууц талбар */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div>
        <label htmlFor="c-name" className="sc-label">Нэр *</label>
        <input id="c-name" name="name" required minLength={2} defaultValue={v.name} className="sc-input" />
      </div>
      <div>
        <label htmlFor="c-email" className="sc-label">Имэйл *</label>
        <input id="c-email" name="email" type="email" required defaultValue={v.email} className="sc-input" />
      </div>
      <div>
        <label htmlFor="c-phone" className="sc-label">Утас</label>
        <input id="c-phone" name="phone" type="tel" defaultValue={v.phone} className="sc-input" />
      </div>
      <div>
        <label htmlFor="c-company" className="sc-label">Байгууллага</label>
        <input id="c-company" name="company" defaultValue={v.company} className="sc-input" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-message" className="sc-label">Мессеж *</label>
        <textarea
          id="c-message"
          name="message"
          required
          minLength={10}
          rows={5}
          defaultValue={v.message}
          placeholder="Ямар шийдлийн талаар мэдээлэл авахыг хүсэж байна вэ?"
          className="sc-input resize-y"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={pending} className="sc-btn sc-btn-primary">
          {pending ? "Илгээж байна..." : <>Илгээх <Send className="h-4 w-4" /></>}
        </button>
        {state.error && (
          <p role="alert" className="text-sm font-medium text-red-500">{state.error}</p>
        )}
      </div>
    </form>
  );
}
