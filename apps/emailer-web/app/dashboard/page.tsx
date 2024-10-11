"use client";
import { useState } from "react";
import { SignOutButton } from "@clerk/nextjs";
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

export default function Component() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-100 lg:flex-row">
      <header className="lg:hidden flex justify-between items-center p-4 bg-white shadow-md">
        <button onClick={() => setSidebarOpen(true)}>
          <IconMenu2 className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">Create Template</h1>
        <div className="w-6" /> {/* Placeholder for balance */}
      </header>

      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col lg:translate-x-0 fixed inset-y-0 left-0 z-50 w-64 bg-white p-6 shadow-md transition-transform duration-300 ease-in-out lg:relative`}
      >
        <button
          className="absolute top-4 right-4 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <IconX className="h-6 w-6" />
        </button>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <IconUser className="text-gray-600" />
          </div>
          <div>
            <h2 className="font-semibold">IconUsername</h2>
            <p className="text-sm text-gray-500">297374 tokens</p>
          </div>
        </div>
        <nav className="space-y-4">
          <a
            href="#"
            className="flex items-center space-x-2 text-blue-600 font-medium"
          >
            <IconMail className="w-5 h-5" />
            <span>Create Template</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-gray-600">
            <IconMail className="w-5 h-5" />
            <span>Public Template Library</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-gray-600">
            <IconMail className="w-5 h-5" />
            <span>Private Template Library</span>
          </a>
        </nav>
        <div className="mt-auto pt-6">
          <a href="#" className="flex items-center space-x-2 text-gray-600">
            <IconHelp className="w-5 h-5" />
            <span>Support</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 text-gray-600 mt-4"
          >
            <IconUser className="w-5 h-5" />
            <span>Account</span>
          </a>
          <SignOutButton>
            <button className="flex items-center justify-center gap-3 px-3 py-2 rounded-md bg-gray-400 w-full mt-4">
              Logout <IconLogout className="w-4 h-4 mr-2" />
            </button>
          </SignOutButton>
        </div>
      </aside>

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

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
