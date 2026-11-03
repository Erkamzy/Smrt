import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Lock } from "lucide-react";
import LoginForm from "@/components/admin/LoginForm";
import { isAdmin, isAdminConfigured } from "@/lib/auth";

async function Login() {
  if (await isAdmin()) redirect("/admin");

  if (!isAdminConfigured()) {
    return (
      <p className="u-soft mt-6 text-sm">
        Админ нууц үг тохируулагдаагүй байна. <code>.env.local</code> файлд{" "}
        <code>ADMIN_PASSWORD</code> (8+ тэмдэгт) нэмнэ үү.
      </p>
    );
  }
  return <LoginForm />;
}

export default function LoginPage() {
  return (
    <section className="sc-card mx-auto max-w-md p-8">
      <span className="sc-icon"><Lock className="h-6 w-6" /></span>
      <h1 className="mt-5 text-2xl font-extrabold tracking-tight">Админ нэвтрэх</h1>
      <p className="u-soft mt-1 text-sm">Мэдээ болон хүсэлтүүдийг удирдах хэсэг</p>
      <Suspense fallback={null}>
        <Login />
      </Suspense>
    </section>
  );
}
