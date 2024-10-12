"use client";

import React, { useState, useEffect } from "react";
import {
  IconCopy,
  IconDownload,
  IconDeviceFloppy,
  IconHelp,
} from "@tabler/icons-react";
import Sidebar from "@/components/dashboard/Sidebar";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { deductCredits } from "../actions/deduct-credits";

let mjml2html: any = null; // Initialize mjml2html as null

export default function Dashboard() {
  const { user } = useUser();
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
    try {
      // First, make the GET request to generate the email
      const response = await axios.get("http://127.0.0.1:8000/response", {
        params: {
          topic: topic,
        },
      });

      // Extract MJML code from the response
      const mjmlCode = response.data.code;
      setMjmlContent(mjmlCode);
      updateHtmlContent(mjmlCode);

      //@ts-ignore
      await deductCredits(user.id, 20);
    } catch (err) {
      console.log("Error creating email:", err);
    }
  };

  // Convert MJML to HTML in real time
  useEffect(() => {
    if (mjmlContent && mjml2html) {
      updateHtmlContent(mjmlContent);
    }
  }, [mjmlContent]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 lg:flex-row">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-10 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 hidden lg:block">
          Create Template
        </h1>
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm mb-6">
          <textarea
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ask emailer an email..."
            className="outline-none w-full mb-4"
          />
          <div className="flex justify-end">
            <button
              onClick={createMJLMEmail}
              className="bg-black text-white rounded-md px-3 py-2"
            >
              Generate Email
            </button>
          </div>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 space-y-4 lg:space-y-0">
            <h2 className="text-xl font-semibold">Generated Email</h2>
            <div className="flex flex-wrap items-center gap-2">
              <button>
                <IconHelp className="h-4 w-4" />
              </button>
              <button>
                <IconCopy className="h-4 w-4" />
              </button>
              <button>
                <IconDownload className="h-4 w-4" />
              </button>
              <button>
                <IconDeviceFloppy className="h-4 w-4" />
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
                Raw HTML
              </button>
            </div>

            {/* MJML Live Editor */}
            <div className="p-4">
              {activeSection === "preview" ? (
                <>
                  {htmlContent ? (
                    <>
                      <h3 className="font-semibold mb-1">Preview</h3>
                      <div
                        className="mjml-preview"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="font-semibold mb-1">Preview</h3>
                    </>
                  )}
                </>
              ) : (
                <>
                  <h3 className="font-semibold mb-1">Raw HTML</h3>
                  <textarea
                    value={mjmlContent}
                    onChange={(e) => setMjmlContent(e.target.value)}
                    placeholder="Edit your MJML code..."
                    className="w-full h-48 p-2 border rounded-md mb-4"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
