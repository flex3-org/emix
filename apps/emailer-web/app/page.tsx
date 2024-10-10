import { Benefits } from "@/components/Benefits";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="pt-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl text-center font-bold tracking-tight sm:text-6xl">
                Easily Generate <br />
                <span className="text-[#27C08D]">Email MJML Code</span>
              </h1>
              <p className="text-md text-center text-muted-foreground">
                Struggling with email MJML code? Our tool handles it for you.
                Describe what you want, and watch asAI instantly generates the
                MJML. Save time and focus on your content, not the code.
              </p>
              <div className="flex flex-col items-center">
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckIcon className="text-[#27C08D]" />
                    <span>AI generates email HTML code in seconds</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckIcon className="text-[#27C08D]" />
                    <span>No coding experience required</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckIcon className="text-[#27C08D]" />
                    <span>Customize your email with ease</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckIcon className="text-[#27C08D]" />
                    <span>Export your MJML code with one click</span>
                  </li>
                </ul>

                <button className="bg-[#27C08D] hover:bg-[#27C08D]/90 text-white mt-6 text-xl py-3 px-4 rounded-md">
                  Build Easlily Now
                </button>
              </div>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <input
                className="mb-4"
                placeholder="Your email template idea..."
              />
              <button className="w-full bg-[#27C08D] hover:bg-[#27C08D]/90 text-white">
                Generate Template
              </button>
            </div>
          </div>
        </section>

        <Benefits />

        <section id="pricing" className="py-20 px-6">
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="text-3xl font-bold text-center">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow">
                <h3 className="text-2xl font-semibold mb-4">Pay As You Go</h3>
                <p className="text-3xl font-bold mb-4">
                  $0.99{" "}
                  <span className="text-base font-normal text-muted-foreground">
                    / template
                  </span>
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckIcon className="text-[#27C08D]" />
                    <span>Generate MJML templates on demand</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckIcon className="text-[#27C08D]" />
                    <span>Export to HTML or MJML</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckIcon className="text-[#27C08D]" />
                    <span>Basic customization options</span>
                  </li>
                </ul>
                <button className="w-full py-2 rounded-md bg-[#27C08D] hover:bg-[#27C08D]/90 text-white">
                  Get Started
                </button>
              </div>
              <div className="bg-white p-8 rounded-lg shadow border-2 border-[#27C08D]">
                <h3 className="text-2xl font-semibold mb-4">Unlimited</h3>
                <p className="text-3xl font-bold mb-4">
                  $49{" "}
                  <span className="text-base font-normal text-muted-foreground">
                    / month
                  </span>
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckIcon className="text-[#27C08D]" />
                    <span>Unlimited MJML template generation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckIcon className="text-[#27C08D]" />
                    <span>Advanced customization options</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckIcon className="text-[#27C08D]" />
                    <span>Team collaboration features</span>
                  </li>
                </ul>
                <button className="w-full py-2 rounded-md bg-[#27C08D] hover:bg-[#27C08D]/90 text-white">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
