import { auth } from "@/auth";
import AuthButton from "./AuthButton.server";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <AuthButton />
      <h2>آمار</h2>
      <pre style={{ direction: "ltr" }}>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
