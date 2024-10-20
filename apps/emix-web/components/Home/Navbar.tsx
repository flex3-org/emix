import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { IconCaretRightFilled } from "@tabler/icons-react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between py-6 md:px-32 px-6">
      <div className="flex items-center gap-2">
        <Image src={logo} height={30} width={30} alt="logo" />
        <span className="md:text-2xl text-xl font-bold">Emix</span>
      </div>
      <nav className="flex items-center space-x-4">
        <div className="flex gap-4 mt-1">
          <Link
            href="#features"
            className="hidden md:block text-base font-medium hover:underline"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-base font-medium hover:underline"
          >
            Pricing
          </Link>
        </div>
        <SignedOut>
          <SignInButton
            mode="modal"
            fallbackRedirectUrl="/dashboard"
            signUpFallbackRedirectUrl="/dashboard"
          >
            <button className="bg-[#312C51] text-white py-2 px-3 rounded-md">
              Log in
            </button>
          </SignInButton>
        </SignedOut>
        <div className="mt-1">
          <div className="flex gap-2">
            <SignedIn>
              <Link
                href="/dashboard"
                className="flex bg-[#312C51] text-white py-2 px-3 rounded-md"
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
