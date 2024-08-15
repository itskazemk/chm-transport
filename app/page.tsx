import { verifySession } from "@/utils/session";

export default async function Home() {
  const session = await verifySession();

  return (
    <div>
      <h2>111{session?.userId}</h2>
      <h2>222{session?.isAuth}</h2>
      <h2>آمار</h2>
    </div>
  );
}
