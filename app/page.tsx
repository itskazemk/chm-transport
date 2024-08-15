import { verifySession } from "@/utils/session";

export default async function Home() {
  const session = await verifySession();
  return (
    <div>
      <h2>111{session?.userId}</h2>
      <h2>222{session?.name}</h2>
      <h2>333{session?.username}</h2>
      <h2>444{session?.role}</h2>
      <h2>555{session?.isAuth}</h2>
      <h2>آمار</h2>
    </div>
  );
}
