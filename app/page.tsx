import { auth, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          {/* <PowerIcon className="w-6" /> */}
          <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
      <h2>آمار</h2>
      <pre style={{ direction: "ltr" }}>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
