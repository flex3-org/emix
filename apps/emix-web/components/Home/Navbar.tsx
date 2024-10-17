import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { IconCaretRightFilled } from "@tabler/icons-react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between p-6">
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold">MJML AI Generator</span>
      </div>
      <nav className="flex items-center space-x-4">
        <Link href="#features" className="text-sm font-medium hover:underline">
          Features
        </Link>
        <Link href="#pricing" className="text-sm font-medium hover:underline">
          Pricing
        </Link>
        <SignedOut>
          <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
            <button className="bg-[#27C08D] hover:bg-[#27C08D]/90 text-white py-2 px-3 rounded-md">
              Log in
            </button>
          </SignInButton>
        </SignedOut>
        <div
          className="
        mt-1"
        >
          <div className="flex gap-2">
            <SignedIn>
              {/* <UserButton /> */}
              <Link
                href="/dashboard"
                className="flex bg-[#27C08D] hover:bg-[#27C08D]/90 text-white py-2 px-3 rounded-md"
              >
                Dashboard <IconCaretRightFilled />
              </Link>
            </SignedIn>
          </div>
        </div>
      </nav>
    </header>
  );
}
