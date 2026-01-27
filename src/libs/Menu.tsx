"use client";

import { usePathname } from "next/navigation";
import { useAuthStore, getRoleBasePath, normalizeRole } from "../store/AuthStore";
import { useMemo } from "react";
import AppLink from "../components/AppLink";

// SVG Icons as components for better quality
const icons = {
  dashboard: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  users: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  admins: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  audit: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  transactions: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  loans: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  forex: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    </svg>
  ),
  investment: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  reports: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  announcements: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
  email: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  settings: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

// Types for menu items
interface MenuItem {
  icon: keyof typeof icons;
  label: string;
  href: string;
  visible: string[];
  tooltip?: string;
  permission?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const Menu = () => {
  const { user } = useAuthStore();
  const pathname = usePathname();

  // Get user role from auth store, default to 'user' if not authenticated
  const normalizedRole = normalizeRole(user?.role);
  const role = normalizedRole?.toLowerCase() || 'user';
  const baseRoute = getRoleBasePath(normalizedRole);

// Menu configuration based on role
  const menuItems: MenuSection[] = useMemo(() => [
    {
      title: "MAIN",
      items: [
        {
          icon: "dashboard",
          label: "Dashboard",
          href: baseRoute,
          visible: ["admin", "system_admin", "user"],
          tooltip: "Overview of your account and quick stats",
        },
        {
          icon: "admins",
          label: "Manage Admins",
          href: "/system-admin/admins",
          visible: ["system_admin"], // STRICTLY SYSTEM_ADMIN ONLY
          tooltip: "Create and manage administrator accounts",
        },
        {
          icon: "users",
          label: "User Management",
          href: "/system-admin/users",
          visible: ["system_admin"],
          tooltip: "Manage all users: create, edit, use actions",
        },
        {
          icon: "audit",
          label: "Audit Logs",
          href: "/system-admin/audit",
          visible: ["system_admin"], // STRICTLY SYSTEM_ADMIN ONLY
          tooltip: "View system activity and audit trail",
        },
        // Regular Admin 'Users' link usually points to same management page but might have different path?
        // If regular admin also manages users, they should see a link. 
        // Based on user request "Create users(access to user management).", admins need this.
        // Assuming /system-admin/users is the unified page, otherwise /admin/users if separate.
        // Using visible array to control same link for multiple roles if path is shared.
        // If paths are different, we use separate items.
        // Let's assume 'admin' also goes to /system-admin/users for now OR has their own route.
        // Be careful with route protection. If admin goes to system-admin route, page must allow it.
        // For now, I will add 'admin' to the visible list of "User Management" if the route permits, 
        // OR add a specific "Users" item for 'admin'.
        // The previous code had a specific item for admin:
        {
          icon: "users",
          label: "Users",
          href: "/admin/users",
          visible: ["admin"],
          tooltip: "Manage user accounts",
        },
      ],
    },
    {
      title: "BANKING",
      items: [
        {
          icon: "transactions",
          label: "Transactions",
          href: `${baseRoute}/transactions`,
          visible: ["admin", "system_admin", "user"],
          tooltip: "View and manage transactions",
        },
        {
          icon: "loans",
          label: "Loans",
          href: `${baseRoute}/loans`,
          visible: ["admin", "system_admin", "user"],
          tooltip: "Apply for and manage loans",
        },
        {
          icon: "forex",
          label: "Forex",
          href: `${baseRoute}/forex`,
          visible: ["admin", "system_admin", "user"],
          tooltip: "Currency exchange and rates",
        },
        {
          icon: "investment",
          label: "Investment",
          href: `${baseRoute}/investment`,
          visible: ["admin", "system_admin", "user"],
          tooltip: "Investment opportunities and portfolio",
        },
      ],
    },
    {
      title: "MANAGEMENT",
      items: [
        {
          icon: "announcements",
          label: "Chat Management",
          href: "/system-admin/chats",
          visible: ["system_admin"],
          tooltip: "Manage live support chats",
        },
        {
          icon: "announcements",
          label: "Chat Management",
          href: "/admin/chats",
          visible: ["admin"],
          tooltip: "Manage live support chats",
        },
        {
          icon: "reports",
          label: "Reports",
          href: `${baseRoute}/reports`,
          visible: ["system_admin"], // HIDING from regular admin as per "Admin only has permission to create user... trigger mail... change management"
          tooltip: "Generate and view reports",
        },
        {
          icon: "announcements",
          label: "Announcements",
          href: `${baseRoute}/announcements`,
          visible: ["admin", "system_admin"], // "access to change management (when created)" -> assuming announcements/changes
          tooltip: "Create and manage announcements",
        },
        {
          icon: "email",
          label: "Email Management",
          href: "/system-admin/emails", // Careful if regular admin cannot access system-admin routes
          visible: ["system_admin"], 
          tooltip: "Manage email templates",
        },
        // Separate item for Admin email if they use a different route or same
        // User said: "Trigger manual mail.(access to email management)"
        {
           icon: "email",
             label: "Emails",
             href: "/admin/emails", // Assuming separate route or reusing system-admin one if accessible
             visible: ["admin"],
             tooltip: "Send emails manually"
        },
        {
          icon: "settings",
          label: "System Settings",
          href: "/system-admin/settings",
          visible: ["system_admin"], // STRICTLY SYSTEM_ADMIN ONLY
          tooltip: "Configure system-wide settings",
        },
        {
          icon: "settings",
          label: "Notifications",
          href: "/notifications",
          visible: ["admin", "system_admin", "user"],
          tooltip: "Manage push notifications",
        },
      ],
    },
  ], [baseRoute]);

  // Check if a path is active
  const isActive = (href: string): boolean => {
    if (href === '#') return false;
    // Specific fix for dashboard active state to not be active on sub-routes unless exact match
    if (href === baseRoute && pathname === baseRoute) return true;
    if (href !== baseRoute && pathname.startsWith(href)) return true;
    return false;
  };

  // Check if user has permission - simplified for now as role check handles visibility
  const hasPermission = (permission?: string): boolean => {
    return true; 
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-hide flex flex-col py-4">
      <div className="flex flex-col gap-6 px-3">
        {menuItems.map((section) => {
          const visibleItems = section.items.filter(
            item => item.visible.includes(role)
          );

          if (visibleItems.length === 0) return null;

          return (
            <div className="flex flex-col gap-1" key={section.title}>
              <span className="block md:hidden lg:block text-slate-400 text-[10px] font-bold uppercase tracking-wider px-3 mb-2">
                {section.title}
              </span>
              {visibleItems.map((item) => {
                const active = isActive(item.href);
                const IconComponent = icons[item.icon];

                return (
                  <AppLink
                    href={item.href}
                    key={item.label}
                    title={item.tooltip}
                    className={`group relative flex flex-row items-center justify-start gap-3 py-3 px-3 rounded-xl transition-all duration-200 md:justify-center md:gap-3 lg:justify-start ${
                      active
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <div className={`flex-shrink-0 transition-colors ${active ? "text-white" : "text-slate-500 group-hover:text-blue-400"}`}>
                      {IconComponent}
                    </div>
                    <span className={`block text-sm leading-tight md:hidden lg:block font-medium ${active ? "text-white" : ""}`}>
                      {item.label}
                    </span>
                    {/* Tooltip for collapsed sidebar */}
                    <div className="lg:hidden absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                      {item.label}
                    </div>
                  </AppLink>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;