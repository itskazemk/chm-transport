"use client";
import { useSession } from "next-auth/react";

import { signIn, signOut } from "@/auth/helpers";

export default function AuthButton() {
  const session = useSession();

  return session?.data?.user ? (
    <button
      className="btn btn-primary"
      onClick={async () => {
        await signOut();
        await signIn();
      }}
    >
      {session.data?.user?.name} : Sign Out
    </button>
  ) : (
    <button className="btn btn-primary" onClick={async () => await signIn()}>
      Sign In
    </button>
  );
}
