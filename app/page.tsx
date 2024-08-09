import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <h2>آمار</h2>
      <pre style={{ direction: "ltr" }}>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
