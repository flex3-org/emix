import { Benefits } from "@/components/Home/Benefits";
import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Home/Navbar";
import Pricing from "@/components/Home/Pricing";

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
        <Pricing />
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
