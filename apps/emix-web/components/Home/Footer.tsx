import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <Image src={logo} alt="Logo" width={32} height={32} />
          <span className="text-xl font-bold">Emix</span>
        </div>
        <nav className="flex space-x-4">
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:underline"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:underline"
          >
            Privacy Policy
          </Link>
          <Link
            href="mailto:kirtanmchandak5@gmail.com"
            className="text-sm text-muted-foreground hover:underline"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
