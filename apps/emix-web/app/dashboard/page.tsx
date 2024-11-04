"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import CreateTemplate from "@/components/dashboard/CreateTemplate";
import { UserDetails } from "../types/types";
import { useUser } from "@clerk/nextjs";
import Account from "@/components/dashboard/Account";

export default function Dashboard() {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSectionT, setActiveSectionT] = useState("createTemplate"); // Default to "createTemplate"

  const handleSectionSelect = (section: string) => {
    setActiveSectionT(section);
  };

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
      <Sidebar
        userDetails={userDetails || null}
        loading={loading}
        onSectionSelect={handleSectionSelect}
      />
      <main className="flex-1 p-4 lg:p-10 overflow-auto">
        {activeSectionT === "createTemplate" && (
          <CreateTemplate userDetails={userDetails || null} />
        )}
        {activeSectionT === "account" && (
          <Account userDetails={userDetails || null} />
        )}
      </main>
    </div>
  );
}
