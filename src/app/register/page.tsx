import RegisterForm from "~/components/register/RegisterForm";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);
  if (session?.user) return redirect("/dashboard");
  return (
    <main className=" flex min-h-screen flex-col items-center justify-center gap-8 p-4">
      <Card className="flex flex-col items-center gap-2 shadow-xl">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </main>
  );
}
