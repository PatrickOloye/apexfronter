"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ChevronDown,
  Home,
  LayoutDashboard,
  Loader2,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import AppLink from "./AppLink";
import { useLoading } from "./LoadingProvider";
import { getRoleBasePath, useAuthStore } from "@/store/AuthStore";

type UserProfileDropdownProps = {
  showDetails?: boolean;
  tone?: "light" | "dark";
  onNavigate?: () => void;
};

const getInitials = (user: any) => {
  if (user?.firstName && user?.lastName) {
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  }
  return "U";
};

const getRoleMeta = (role?: string) => {
  switch (role) {
    case "SYSTEM_ADMIN":
      return {
        label: "System Admin",
        avatar: "bg-gradient-to-br from-purple-600 to-indigo-600",
        badge: "bg-purple-100 text-purple-700",
      };
    case "ADMIN":
      return {
        label: "Admin",
        avatar: "bg-gradient-to-br from-blue-600 to-cyan-600",
        badge: "bg-blue-100 text-blue-700",
      };
    default:
      return {
        label: "User",
        avatar: "bg-gradient-to-br from-emerald-500 to-teal-500",
        badge: "bg-emerald-100 text-emerald-700",
      };
  }
};

export function UserProfileDropdown({
  showDetails = false,
  tone = "light",
  onNavigate,
}: UserProfileDropdownProps) {
  const user = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);
  const isLoggingOut = useAuthStore((state) => state.isLoggingOut);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { startLoading } = useLoading();

  const dashboardRoute = getRoleBasePath(user?.role);
  const roleMeta = getRoleMeta(user?.role);
  const initials = getInitials(user);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (!user) return null;

  const close = () => {
    setIsOpen(false);
    onNavigate?.();
  };

  const handleLogout = async () => {
    startLoading("Signing out...");
    setIsOpen(false);

    try {
      await logout();
    } finally {
      window.location.href = "/";
    }
  };

  const triggerText =
    tone === "dark" && !isOpen ? "text-white hover:bg-white/10" : "text-slate-700 hover:bg-slate-100";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className={`flex min-w-0 items-center gap-2 rounded-lg px-2 py-1.5 transition-colors ${triggerText} ${
          isOpen ? "bg-slate-100 text-slate-800" : ""
        }`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white shadow-md ${roleMeta.avatar}`}
        >
          {initials}
        </div>
        {showDetails && (
          <div className="hidden min-w-0 flex-col items-start lg:flex">
            <span className="max-w-36 truncate text-xs font-medium leading-tight">
              {user.firstName} {user.lastName}
            </span>
            <span className={`mt-0.5 rounded px-1.5 py-0.5 text-[10px] font-medium leading-tight ${roleMeta.badge}`}>
              {roleMeta.label}
            </span>
          </div>
        )}
        <ChevronDown
          size={14}
          className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-[10000] mt-2 w-[min(15rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-slate-100 bg-white py-1 text-slate-700 shadow-2xl"
        >
          <div className="border-b border-slate-100 px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white shadow-md ${roleMeta.avatar}`}
              >
                {initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {user.firstName} {user.lastName}
                </p>
                <p className="truncate text-xs text-slate-500">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="py-1">
            <MenuLink href="/" onClick={close} icon={<Home size={16} />}>
              Home
            </MenuLink>
            <MenuLink href={dashboardRoute} onClick={close} icon={<LayoutDashboard size={16} />}>
              Dashboard
            </MenuLink>
            <MenuLink href={`${dashboardRoute}/profile`} onClick={close} icon={<User size={16} />}>
              Profile
            </MenuLink>
            <MenuLink href={`${dashboardRoute}/settings`} onClick={close} icon={<Settings size={16} />}>
              Settings
            </MenuLink>
          </div>

          <div className="border-t border-slate-100 py-1">
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
            >
              {isLoggingOut ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuLink({
  href,
  icon,
  onClick,
  children,
}: {
  href: string;
  icon: ReactNode;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <AppLink
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
    >
      <span className="text-slate-400">{icon}</span>
      {children}
    </AppLink>
  );
}
