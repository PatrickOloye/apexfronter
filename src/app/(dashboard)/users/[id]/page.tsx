"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminService, User } from "@/libs/server-actions/admin";

const SingleUserPage = () => {
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const idParam = params?.id;
    const userId = Array.isArray(idParam) ? idParam[0] : idParam;

    if (!userId) {
      setError("User ID not found");
      setLoading(false);
      return;
    }

    let mounted = true;

    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await AdminService.getUserById(userId);
        if (mounted) setUser(data);
      } catch {
        if (mounted) {
          setUser(null);
          setError("Could not load user data");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchUserData();

    return () => {
      mounted = false;
    };
  }, [params]);

  if (loading) {
    return <div className="p-5">Loading user...</div>;
  }

  if (error || !user) {
    return <div className="p-5 text-red-500">Error: {error || "User not found"}</div>;
  }

  return (
    <div className="flex gap-12 mt-5">
      <div className="flex-1 bg-[var(--bgSoft)] p-5 rounded-lg font-bold text-[var(--textSoft)] h-max">
        <div className="w-full h-[120px] rounded-lg overflow-hidden mb-5 bg-blue-600 text-white flex items-center justify-center text-4xl">
          {(user.firstName?.[0] || "U").toUpperCase()}
          {(user.lastName?.[0] || "").toUpperCase()}
        </div>
        <h2>{user.firstName} {user.lastName}</h2>
      </div>

      <div className="flex-3 bg-[var(--bgSoft)] p-5 rounded-lg space-y-4">
        <div>
          <label className="text-xs text-gray-500">Name</label>
          <p className="p-3 border-2 border-[#2e374a] rounded bg-[var(--bg)] text-[var(--text)]">{user.firstName} {user.lastName}</p>
        </div>

        <div>
          <label className="text-xs text-gray-500">Email</label>
          <p className="p-3 border-2 border-[#2e374a] rounded bg-[var(--bg)] text-[var(--text)]">{user.email}</p>
        </div>

        <div>
          <label className="text-xs text-gray-500">Phone</label>
          <p className="p-3 border-2 border-[#2e374a] rounded bg-[var(--bg)] text-[var(--text)]">{user.phoneNumber || "Not provided"}</p>
        </div>

        <div>
          <label className="text-xs text-gray-500">Account Number</label>
          <p className="p-3 border-2 border-[#2e374a] rounded bg-[var(--bg)] text-[var(--text)]">{user.accountNumber || "N/A"}</p>
        </div>

        <div>
          <label className="text-xs text-gray-500">Role</label>
          <p className="p-3 border-2 border-[#2e374a] rounded bg-[var(--bg)] text-[var(--text)]">{user.role}</p>
        </div>

        <div>
          <label className="text-xs text-gray-500">Status</label>
          <p className="p-3 border-2 border-[#2e374a] rounded bg-[var(--bg)] text-[var(--text)]">
            {user.status || "ACTIVE"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;
