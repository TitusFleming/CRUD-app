'use client';

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          CRUD App
        </Link>
        <nav>
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <button className="bg-white text-blue-900 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
                Sign In
              </button>
            </SignInButton>
          )}
        </nav>
      </div>
    </header>
  );
}
