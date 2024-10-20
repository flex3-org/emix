"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  IconCopy,
  IconDownload,
  IconDeviceFloppy,
  IconEyeQuestion,
} from "@tabler/icons-react";
import Sidebar from "@/components/dashboard/Sidebar";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { deductCredits } from "../actions/deduct-credits";
import { UserDetails } from "../types/types";

let mjml2html: any = null;

export default function Dashboard() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("preview");
  const [topic, setTopic] = useState("");
  const [mjmlContent, setMjmlContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    (async () => {
      mjml2html = (await import("mjml-browser")).default; // Import mjml-browser dynamically
    })();
  }, []);

  const updateHtmlContent = (mjmlCode: string) => {
    if (mjml2html) {
      const { html } = mjml2html(mjmlCode);
      setHtmlContent(html);
    }
  };

  const handleToggleSection = (section: any) => {
    setActiveSection(section);
  };

  const createMJLMEmail = async () => {
    if (userDetails == null) {
      toast.error("Could not fetch user details. Please try again later.");
      return;
    }
    if (userDetails?.credits_remaining === 0) {
      toast.error("You are out of credits, please purchase credits!");
      return;
    }

    setIsLoading(true);
    try {
      const token = await getToken();
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL || "",
        {
          params: {
            topic: topic,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const mjmlCode = response.data.code;
      setMjmlContent(mjmlCode);
      updateHtmlContent(mjmlCode);

      //@ts-ignore
      await deductCredits(user.id, 20);
    } catch (err) {
      toast.error("Some internal error occured try again.");
      console.log("Error creating email:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (mjmlContent && mjml2html) {
      updateHtmlContent(mjmlContent);
    }
  }, [mjmlContent]);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        if (user?.id) {
          const response = await fetch(`/api/user/${user.id}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setUserDetails(data);
          localStorage.setItem("user_id", data?.id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.id]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 lg:flex-row">
      <Sidebar userDetails={userDetails || null} loading={loading} />
      <main className="flex-1 p-4 lg:p-10 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 hidden lg:block">
          Create Template
        </h1>
        <form className="bg-white p-4 lg:p-6 rounded-lg shadow-sm mb-6">
          <textarea
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ask emailer an email..."
            className="outline-none w-full mb-4"
          />
          <div className="flex justify-end">
            <button
              onClick={createMJLMEmail}
              disabled={isLoading} // Disable the button when loading
              className={`bg-black text-white rounded-md px-3 py-2 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291a7.962 7.962 0 01-2-5.291H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Generating...</span>
                </div>
              ) : (
                "Generate Email"
              )}
            </button>
          </div>
        </form>
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 space-y-4 lg:space-y-0">
            <h2 className="text-xl font-semibold">Generated Email</h2>
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-1 text-sm border-[1px] px-2 py-1 rounded-md border-gray-300">
                Copy <IconCopy className="h-4 w-4" />
              </button>
              <button className="flex items-center gap-1 text-sm border-[1px] px-2 py-1 rounded-md border-gray-300">
                Download <IconDownload className="h-4 w-4" />
              </button>
              <button className="flex items-center gap-1 text-sm border-[1px] px-2 py-1 rounded-md border-gray-300">
                Save <IconDeviceFloppy className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex justify-between bg-gray-200 rounded-sm p-2 gap-3">
              <button
                onClick={() => handleToggleSection("preview")}
                className={`w-full rounded-md p-2 text-left ${
                  activeSection === "preview" ? "bg-white" : ""
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => handleToggleSection("rawHtml")}
                className={`w-full rounded-md p-2 text-left ${
                  activeSection === "rawHtml" ? "bg-white" : ""
                }`}
              >
                Raw MJML
              </button>
            </div>

            {/* MJML Live Editor */}
            <div className="p-4">
              {activeSection === "preview" ? (
                <>
                  {mjmlContent ? (
                    <>
                      <h3 className="font-semibold mb-1">Preview</h3>
                      <div
                        className="mjml-preview"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                      />
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col items-center justify-center">
                        <IconEyeQuestion className="text-gray-400" size={70} />
                        <h3 className="font-semibold text-2xl mb-1">Preview</h3>
                        <p className="text-gray-400 text-sm">
                          Waiting for the message to generate a preview.
                        </p>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  {mjmlContent ? (
                    <>
                      <h3 className="font-semibold mb-1">Raw HTML</h3>
                      <textarea
                        value={mjmlContent}
                        onChange={(e) => setMjmlContent(e.target.value)}
                        placeholder="Edit your MJML code..."
                        className="w-full h-48 p-2 border rounded-md mb-4"
                      />
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col items-center justify-center">
                        <IconEyeQuestion className="text-gray-400" size={70} />
                        <h3 className="font-semibold text-2xl mb-1">
                          Raw HTML
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Generate an email to see the MJML code.
                        </p>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
