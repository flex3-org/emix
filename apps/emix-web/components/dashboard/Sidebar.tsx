"use client";

import {
  IconMenu2,
  IconLogout,
  IconMailPlus,
  IconUser,
  IconHelp,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import { UserDetails } from "@/app/types/types";
import Skeleton from "react-loading-skeleton";

interface SidebarProps {
  userDetails?: UserDetails | null;
  loading: boolean;
}

export default function Sidebar({ userDetails, loading }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
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

        {/* Loading Skeleton or User Data */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            {loading ? (
              <Skeleton circle={true} height={40} width={40} /> // Skeleton for profile image
            ) : (
              <Image
                src={userDetails?.profile_image_url || ""}
                width={40}
                height={40}
                className="rounded-full"
                alt="profilePic"
              />
            )}
          </div>
          <div>
            {loading ? (
              <Skeleton width={100} />
            ) : (
              <h2 className="font-semibold">{userDetails?.name}</h2>
            )}
            {loading ? (
              <Skeleton width={80} />
            ) : (
              <p className="m-0 text-sm text-gray-500">
                {userDetails?.credits_remaining} tokens
              </p>
            )}
          </div>
        </div>

        <nav className="space-y-4">
          <a
            href="#"
            className="flex items-center space-x-2 font-medium hover:bg-gray-200 p-2 rounded-md"
          >
            <IconMailPlus className="w-5 h-5" />
            <span>Create Template</span>
          </a>
          {/* <a href="#" className="flex items-center space-x-2 text-gray-600">
            <IconMailPlus className="w-5 h-5" />
            <span>Public Template Library</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-gray-600">
            <IconMailPlus className="w-5 h-5" />
            <span>Private Template Library</span>
          </a> */}
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
            <button
              className="flex items-center justify-center gap-3 px-3 py-2 rounded-md bg-gray-400 w-full mt-4"
              onClick={() => {
                localStorage.clear();
              }}
            >
              Logout <IconLogout className="w-4 h-4 mr-2" />
            </button>
          </SignOutButton>
        </div>
      </aside>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
