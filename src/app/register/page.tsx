import RegisterForm from "~/components/register/RegisterForm";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";

export default function RegisterPage() {
  return (
    <main className=" flex min-h-screen flex-col items-center justify-center gap-8 p-4">
      <Card className="flex flex-col items-center gap-2 shadow-xl">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm/>
        </CardContent>
      </Card>
    </main>
  );
}
