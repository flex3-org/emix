"use client";

import React, { useState } from "react";
import {
  IconCopy,
  IconDownload,
  IconDeviceFloppy,
  IconHelp,
} from "@tabler/icons-react";
import Sidebar from "@/components/dashboard/Sidebar";
import axios from "axios";
import mjml2html from "mjml-browser"; // Import mjml-browser

export default function Component() {
  const [activeSection, setActiveSection] = useState("preview");
  const [topic, setTopic] = useState("");
  const [mjmlContent, setMjmlContent] = useState(""); // State for MJML content
  const [htmlContent, setHtmlContent] = useState(""); // State for HTML content

  const handleToggleSection = (section: any) => {
    setActiveSection(section);
  };

  const createMJLMEmail = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/response", {
        params: {
          topic: topic,
        },
      });

      const mjmlCode = response.data.code;
      setMjmlContent(mjmlCode); // Set raw MJML content

      // Convert MJML to HTML
      const { html } = mjml2html(mjmlCode);
      setHtmlContent(html); // Set converted HTML
    } catch (err) {
      console.log(err);
    }
  };

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
            <div className="p-4">
              {activeSection === "preview" ? (
                <>
                  <h3 className="font-semibold mb-1">Preview</h3>
                  <div
                    className="mjml-preview"
                    dangerouslySetInnerHTML={{ __html: htmlContent }} // Render the converted HTML
                  />
                </>
              ) : (
                <>
                  <h3 className="font-semibold mb-1">Raw HTML</h3>
                  <pre className="bg-gray-200 p-4 rounded-lg overflow-x-auto">
                    {mjmlContent} {/* Show the raw MJML content */}
                  </pre>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
