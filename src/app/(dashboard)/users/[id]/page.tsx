"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

// Mock/placeholder data
const mockUser = {
  id: "1",
  username: "admin",
  email: "admin@example.com",
  img: "/noavatar.png",
  phone: "+1234567890",
  address: "123 Admin St, Admin City",
  isAdmin: true,
  isActive: true,
};

type User = typeof mockUser;

const SingleUserPage = () => {
  const params = useParams();

  // Safely extract `id` from params
  const [id, setId] = useState<string | null>(null);

  const [user, setUser] = useState<User>(mockUser);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Handle case where `id` is undefined
    if (!params || typeof params.id === "undefined") {
      setError("User ID not found");
      setLoading(false);
      return;
    }

    const userId = typeof params.id === "string" ? params.id : params.id[0];
    setId(userId);

    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(`/api/users/${userId}`);
        setUser(data);
        setError(null);
      } catch (err) {
        console.warn("Using mock data due to error:", err);
        setError("Could not load user data");
        setUser(mockUser);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [params]);

  if (loading) {
    return <div className="p-5">Loading user...</div>;
  }

  if (error) {
    return <div className="p-5 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex gap-12 mt-5">
      <div className="flex-1 bg-[var(--bgSoft)] p-5 rounded-lg font-bold text-[var(--textSoft)] h-max">
        <div className="w-full h-[300px] relative rounded-lg overflow-hidden mb-5">
          <Image
            src={user.img || "/noavatar.png"}
            alt={`${user.username}'s avatar`}
            fill
            className="object-cover"
          />
        </div>
        <h2>{user.username}</h2>
      </div>

      <div className="flex-3 bg-[var(--bgSoft)] p-5 rounded-lg space-y-4">
        <div>
          <label className="text-xs text-gray-500">Username</label>
          <p className="p-3 border-2 border-[#2e374a] rounded bg-[var(--bg)] text-[var(--text)]">{user.username}</p>
        </div>

        <div>
          <label className="text-xs text-gray-500">Email</label>
          <p className="p-3 border-2 border-[#2e374a] rounded bg-[var(--bg)] text-[var(--text)]">{user.email}</p>
        </div>

        <div>
          <label className="text-xs text-gray-500">Phone</label>
          <p className="p-3 border-2 border-[#2e374a] rounded bg-[var(--bg)] text-[var(--text)]">{user.phone}</p>
        </div>

        <div>
          <label className="text-xs text-gray-500">Address</label>
          <p className="p-3 border-2 border-[#2e374a] rounded bg-[var(--bg)] text-[var(--text)]">{user.address}</p>
        </div>

        <div>
          <label className="text-xs text-gray-500">Is Admin?</label>
          <p className="p-3 border-2 border-[#2e374a] rounded bg-[var(--bg)] text-[var(--text)]">
            {user.isAdmin ? "Yes" : "No"}
          </p>
        </div>

        <div>
          <label className="text-xs text-gray-500">Is Active?</label>
          <p className="p-3 border-2 border-[#2e374a] rounded bg-[var(--bg)] text-[var(--text)]">
            {user.isActive ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;