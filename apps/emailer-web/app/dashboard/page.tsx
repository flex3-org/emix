"use client";
import { useState } from "react";

import {
  IconMenu2,
  IconCopy,
  IconDownload,
  IconLogout,
  IconMail,
  IconDeviceFloppy,
  IconUser,
  IconHelp,
  IconX,
} from "@tabler/icons-react";
import Sidebar from "@/components/dashboard/Sidebar";

export default function Component() {
  return (
    <div className="flex flex-col h-screen bg-gray-100 lg:flex-row">
      <Sidebar />

      <main className="flex-1 p-4 lg:p-10 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 hidden lg:block">
          Create Template
        </h1>
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm mb-6">
          <textarea
            placeholder="Ask IconMailGen an eIconMail..."
            className="w-full mb-4"
          />
          <div className="flex justify-end">
            <button>Generate EIconMail</button>
          </div>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 space-y-4 lg:space-y-0">
            <h2 className="text-xl font-semibold">Generated EIconMail</h2>
            <div className="flex flex-wrap items-center gap-2">
              <select className="border rounded px-2 py-1">
                <option>Select a version</option>
              </select>
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
          <div className="border rounded-lg p-4 text-center">
            <div className="text-gray-400 mb-2">
              <IconHelp className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="font-semibold mb-1">No Preview Available</h3>
            <p className="text-sm text-gray-500">
              Waiting for the first message to generate a preview.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
