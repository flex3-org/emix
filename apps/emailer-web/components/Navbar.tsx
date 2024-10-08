import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between p-6">
      <div className="flex items-center space-x-2">
        {/* <Image src="/logo.svg" alt="Logo" width={32} height={32} /> */}
        <span className="text-xl font-bold">MJML AI Generator</span>
      </div>
      <nav className="space-x-4">
        <Link href="#features" className="text-sm font-medium hover:underline">
          Features
        </Link>
        <Link href="#pricing" className="text-sm font-medium hover:underline">
          Pricing
        </Link>
        <button>Log in</button>
        <button className="bg-[#27C08D] hover:bg-[#27C08D]/90 text-white">
          Sign up
        </button>
      </nav>
    </header>
  );
}
