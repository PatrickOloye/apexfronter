"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BrandMark } from '@/components/BrandMark';
import { bottomNavLinks } from '../../../libs/MainnavLinks';
import { FiSearch, FiMenu, FiX, FiChevronDown, FiUser } from 'react-icons/fi';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore, getRoleBasePath } from '../../../store/AuthStore';
import AppLink from '../../AppLink';
import { useLoading } from '../../LoadingProvider';
import { useHasHydrated } from '../../HydrationGate';

interface DropdownItem {
  name: string;
  href: string;
  nestedDropdown?: DropdownItem[];
}

interface DropdownSection {
  title: string;
  items: DropdownItem[];
}

interface NavLink {
  name: string;
  href: string;
  dropdown?: DropdownSection[];
}

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, fetchCurrentUser, logout, isLoggingOut } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeNestedDropdown, setActiveNestedDropdown] = useState<{ section: string, item: string } | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Track Zustand hydration to prevent UI flash
  const hasHydrated = useHasHydrated();
  
  const searchRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { startLoading, stopLoading } = useLoading();

  const dashboardRoute = getRoleBasePath(user?.role);

  // Fetch user data on mount with proper error handling
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      try {
        await fetchCurrentUser();
      } catch (error) {
        console.error("Auth initialization error:", error);
        // Auth failed, but we still want to stop loading
      } finally {
        // Always set loading to false, even if the fetch fails
        setIsLoading(false);
      }
    };

    // Set a timeout to ensure loading doesn't hang indefinitely
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds max loading time

    initAuth();

    return () => clearTimeout(loadingTimeout);
  }, [fetchCurrentUser]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Handle search close
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
      
      // Handle dropdown close
      if (activeDropdown && 
          dropdownRefs.current[activeDropdown] && 
          !dropdownRefs.current[activeDropdown]?.contains(event.target as Node)) {
        setActiveDropdown(null);
        setActiveNestedDropdown(null);
      }

      // Handle user menu close
      if (userMenuOpen && 
          userMenuRef.current && 
          !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    
    // Use 'click' instead of 'mousedown' so element click handlers run first
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeDropdown, userMenuOpen]);

  // Close dropdowns when pressing escape
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setActiveNestedDropdown(null);
        setSearchOpen(false);
        setUserMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, []);

  // Check if a link is active
  const isActive = (href: string): boolean => {
    return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
    setActiveNestedDropdown(null);
  };

  const handleNestedDropdown = (section: string, itemName: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    setActiveNestedDropdown(
      activeNestedDropdown?.section === section && activeNestedDropdown?.item === itemName 
        ? null 
        : { section, item: itemName }
    );
  };

  const getDropdownPosition = (index: number): string => {
    const totalItems = bottomNavLinks.length;
    if (index < totalItems / 3) return 'left-0';
    if (index >= totalItems * 2 / 3) return 'right-0';
    return 'left-1/2 -translate-x-1/2';
  };

  const handleLogout = () => {
    startLoading('Signing out...');

    // Close UI elements immediately
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setActiveNestedDropdown(null);
    setUserMenuOpen(false);

    // Clear all auth cookies immediately (before async logout)
    if (typeof document !== 'undefined') {
      document.cookie = 'is_authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'apex_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }

    // Clear localStorage immediately
    try {
      localStorage.removeItem('apex-auth');
    } catch (e) {
      // ignore
    }

    // Trigger client-side signout in background
    try {
      logout().catch((err) => {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Logout API error (background):', err);
        }
      });
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Logout invocation failed:', err);
      }
    }

    // Use hard navigation for clean state reset (same as Dashboard Navbar)
    stopLoading();
    window.location.href = '/';
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  // Determine if logged in - note the explicit check for null because user could be defined but empty
  const isLoggedIn = user !== null && typeof user === 'object';

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <nav
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <BrandMark variant="light" size="md" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-6">
            {bottomNavLinks.map((link, index) => (
              <div 
                key={link.name} 
                className="relative"
                ref={(el) => { dropdownRefs.current[link.name] = el; }}
              >
                <button
                  onClick={() => toggleDropdown(link.name)}
                  className={`px-3 py-2 rounded-md text-xs font-medium flex items-center transition-colors ${
                    isActive(link.href) 
                      ? 'bg-blue-700 text-white' 
                      : isScrolled 
                        ? 'text-gray-900 hover:bg-gray-100' 
                        : 'text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                  {link.dropdown && (
                    <FiChevronDown className={`ml-1 h-4 w-4 transition-transform ${
                      activeDropdown === link.name ? 'rotate-180' : ''
                    }`} />
                  )}
                </button>
                
                {/* Main Dropdown Menu */}
                {link.dropdown && activeDropdown === link.name && (
                  <div className={`absolute top-full ${getDropdownPosition(index)} w-auto min-w-[680px] mt-1 bg-white rounded-md shadow-lg z-50 overflow-hidden`}>
                    <div className="flex bg-gradient-to-r from-blue-50 to-white">
                      {/* Left Column - Main Categories */}
                      <div className="w-1/3 border-r border-gray-100">
                        <div className="p-4 space-y-4">
                          {link.dropdown.map((section) => (
                            <div key={section.title} className="space-y-2">
                              <h3 className="text-sm font-semibold text-gray-900">{section.title}</h3>
                              <ul className="space-y-1">
                                {section.items.map((item) => (
                                  <li key={item.name}>
                                    {item.nestedDropdown ? (
                                      // Item with nested dropdown
                                      <button
                                        onClick={(e) => handleNestedDropdown(section.title, item.name, e)}
                                        className={`w-full text-left px-2 py-1 rounded text-xs ${
                                          isActive(item.href) 
                                            ? 'bg-blue-600 text-white' 
                                            : activeNestedDropdown?.section === section.title && 
                                              activeNestedDropdown?.item === item.name
                                              ? 'bg-blue-500 text-white'
                                              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                                        } flex items-center justify-between`}
                                      >
                                        <span>{item.name}</span>
                                        <FiChevronDown className="h-4 w-4" />
                                      </button>
                                    ) : (
                                      // Regular link without nested dropdown
                                      <Link
                                        href={item.href}
                                        className={`block w-full text-left px-2 py-1 rounded text-xs ${
                                          isActive(item.href) 
                                            ? 'bg-blue-600 text-white' 
                                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                                        }`}
                                      >
                                        {item.name}
                                      </Link>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Right Column - Nested Dropdowns or Featured Content */}
                      <div className="w-2/3 bg-gradient-to-r from-blue-50 to-white p-4">
                        {activeNestedDropdown ? (
                          // Display selected nested dropdown content
                          (() => {
                            // Find the selected section and item
                            const section = link.dropdown?.find(s => s.title === activeNestedDropdown.section);
                            const item = section?.items.find(i => i.name === activeNestedDropdown.item);
                            
                            if (section && item && item.nestedDropdown) {
                              return (
                                <div className="h-full">
                                  <h3 className="text-sm font-semibold text-blue-600 mb-3">{item.name} Options</h3>
                                  <div className="grid grid-cols-2 gap-4">
                                    {item.nestedDropdown.map((nestedItem) => (
                                      <Link
                                        key={nestedItem.name}
                                        href={nestedItem.href}
                                        className={`block p-3 rounded-md text-xs ${
                                          isActive(nestedItem.href) 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-white hover:bg-blue-50 hover:text-blue-600 shadow-sm'
                                        }`}
                                      >
                                        <span className="font-medium">{nestedItem.name}</span>
                                        <p className="mt-1 text-xs opacity-80">
                                          Access {nestedItem.name.toLowerCase()} banking services and features
                                        </p>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              );
                            }
                            
                            return (
                              <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500">No options available</p>
                              </div>
                            );
                          })()
                        ) : (
                          // Default Featured Content
                          <div className="h-full">
                            <div className="mb-3">
                              <h3 className="text-sm font-semibold text-blue-600">Featured</h3>
                              <p className="text-xs text-gray-600">Preview the new Apex Bank dashboard navigation</p>
                            </div>
                            <div className="bg-white p-4 rounded-md shadow-sm">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-medium text-gray-900">{link.name} Overview</span>
                                <span className="text-xs font-medium text-blue-600">4.28 Rating</span>
                              </div>
                              <p className="text-xs text-gray-600">
                                Explore our full range of {link.name.toLowerCase()} services designed to meet your financial needs.
                              </p>
                              <div className="mt-3">
                                <Link 
                                  href={link.href}
                                  className="text-xs font-medium text-blue-600 hover:text-blue-800"
                                >
                                  Learn more →
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Search and Auth */}
          <div className="flex items-center">
            {/* Search (Desktop) */}
            <div ref={searchRef} className="relative hidden md:block mr-2">
              {searchOpen ? (
                <div className="absolute right-0 top-0 mt-1 z-50 w-64">
                    <input
                    type="text"
                    placeholder="Search..."
                    className="pl-3 pr-8 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    autoFocus
                  />
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setSearchOpen(false)}
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  className={`p-1 rounded-full hover:bg-white/10 focus:outline-none ${
                    isScrolled ? 'text-gray-500' : 'text-white'
                  }`}
                  onClick={() => setSearchOpen(true)}
                >
                  <FiSearch className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Auth Buttons (Desktop) */}
            <div className="hidden md:flex items-center gap-1">
              {(isLoading || !hasHydrated) ? (
                // Loading state indicator (shown while fetching user OR during Zustand rehydration)
                <div className={`rounded-full h-6 w-6 border-2 border-t-transparent animate-spin ${
                  isScrolled ? 'border-gray-300' : 'border-white'
                }`}></div>
              ) : isLoggedIn ? (
                <>
                  {/* Notification Bell Icon */}
                  <button
                    className={`p-2 rounded-md transition-colors ${
                      isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                    }`}
                    title="Notifications"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </button>

                  {/* Desktop Profile Avatar Dropdown */}
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={toggleUserMenu}
                      className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all ${
                        isScrolled 
                          ? 'bg-blue-600 shadow-lg shadow-blue-500/25 text-white' 
                          : 'bg-white/20 backdrop-blur-sm border border-white/20 text-white hover:bg-white/30'
                      }`}
                      title="Profile"
                    >
                      <span className="text-sm font-bold">
                        {(user?.firstName?.[0] || 'U')}{(user?.lastName?.[0] || '')}
                      </span>
                    </button>

                    {/* Desktop User Dropdown */}
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-2xl z-[100] py-1 border border-slate-100">
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-slate-100">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold shadow-md">
                              {(user?.firstName?.[0] || 'U')}{(user?.lastName?.[0] || '')}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-800 text-sm truncate">{user?.firstName} {user?.lastName}</p>
                              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-1">
                          <AppLink 
                            href="/" 
                            onClick={() => setUserMenuOpen(false)} 
                            className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Home
                          </AppLink>
                          <AppLink 
                            href={dashboardRoute} 
                            onClick={() => setUserMenuOpen(false)} 
                            className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            Dashboard
                          </AppLink>
                          <AppLink 
                            href={`${dashboardRoute}/profile`} 
                            onClick={() => setUserMenuOpen(false)} 
                            className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Profile
                          </AppLink>
                          <AppLink 
                            href={`${dashboardRoute}/settings`} 
                            onClick={() => setUserMenuOpen(false)} 
                            className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Settings
                          </AppLink>
                        </div>

                        {/* Logout */}
                        <div className="py-1 border-t border-slate-100">
                          <button 
                            onClick={handleLogout} 
                            disabled={isLoggingOut} 
                            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                          >
                            {isLoggingOut ? (
                              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                            )}
                            {isLoggingOut ? 'Logging out...' : 'Logout'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    href="/signin" 
                    className={`px-4 py-2 text-xs font-medium rounded-md ${
                      isActive('/signin') 
                        ? 'bg-white/20 text-white' 
                        : isScrolled 
                          ? 'text-blue-600 hover:bg-blue-50' 
                          : 'text-white hover:bg-white/10'
                    }`}
                  >
                    Log In
                  </Link>
                  <Link 
                    href="/signup" 
                    className={`px-4 py-2 text-xs font-medium rounded-md ${
                      isActive('/signup') 
                        ? 'bg-blue-700 text-white' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Join Apex
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              {/* Mobile Profile Avatar (when logged in) */}
              {!isLoading && hasHydrated && isLoggedIn && (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={toggleUserMenu}
                    className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all ${
                      isScrolled 
                        ? 'bg-blue-600 shadow-lg shadow-blue-500/25' 
                        : 'bg-white/20 backdrop-blur-sm border border-white/20'
                    }`}
                  >
                    <span className={`text-sm font-bold ${isScrolled ? 'text-white' : 'text-white'}`}>
                      {(user?.firstName?.[0] || 'U')}{(user?.lastName?.[0] || '')}
                    </span>
                  </button>

                  {/* Mobile User Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-2xl z-[100] py-1 border border-slate-100">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold shadow-md">
                            {(user?.firstName?.[0] || 'U')}{(user?.lastName?.[0] || '')}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-800 text-sm truncate">{user?.firstName} {user?.lastName}</p>
                            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <AppLink 
                          href="/" 
                          onClick={() => setUserMenuOpen(false)} 
                          className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          Home
                        </AppLink>
                        <AppLink 
                          href={dashboardRoute} 
                          onClick={() => setUserMenuOpen(false)} 
                          className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                          Dashboard
                        </AppLink>
                        <AppLink 
                          href={`${dashboardRoute}/profile`} 
                          onClick={() => setUserMenuOpen(false)} 
                          className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Profile
                        </AppLink>
                        <AppLink 
                          href={`${dashboardRoute}/settings`} 
                          onClick={() => setUserMenuOpen(false)} 
                          className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Settings
                        </AppLink>
                      </div>

                      {/* Logout */}
                      <div className="py-1 border-t border-slate-100">
                        <button 
                          onClick={handleLogout} 
                          disabled={isLoggingOut} 
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                          {isLoggingOut ? (
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                          )}
                          {isLoggingOut ? 'Logging out...' : 'Logout'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-xl focus:outline-none transition-all ${
                  mobileMenuOpen 
                    ? 'bg-gray-100 text-gray-900' 
                    : isScrolled 
                      ? 'text-gray-900 hover:bg-gray-100' 
                      : 'text-white hover:bg-white/10'
                }`}
              >
                {mobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Fixed position to cover screen and allow independent scroll */}
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="md:hidden fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div className="md:hidden fixed top-0 right-0 bottom-0 z-[100] w-[85%] max-w-[320px] bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ease-in-out transform translate-x-0">
            <div className="flex flex-col min-h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                  <BrandMark variant="light" size="sm" />
                </Link>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              {/* User Info (Mobile) */}
              {isLoggedIn && (
                <div className="px-4 py-3 bg-blue-50/50 border-b border-blue-100">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <span className="text-white font-bold text-sm">
                        {(user?.firstName?.[0] || 'U')}{(user?.lastName?.[0] || '')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{user?.firstName || 'User'} {user?.lastName || ''}</p>
                      <p className="text-xs text-gray-500 font-medium">{user?.email || 'No email available'}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex-1 py-2 space-y-1 px-2">
                {/* Search Mobile */}
                <div className="px-2 pb-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FiSearch className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                
                {/* Mobile Navigation Links */}
                {bottomNavLinks.map((link) => (
                  <div key={link.name} className="space-y-1">
                    <div 
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium flex justify-between items-center transition-colors ${
                        isActive(link.href) ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => toggleDropdown(link.name)}
                    >
                      <span className="flex items-center gap-3">
                        {link.name}
                      </span>
                      {link.dropdown && (
                        <FiChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                          activeDropdown === link.name ? 'rotate-180 text-blue-500' : ''
                        }`} />
                      )}
                    </div>
                    
                    {/* Mobile Dropdown */}
                    {link.dropdown && activeDropdown === link.name && (
                      <div className="ml-4 pl-4 border-l-2 border-gray-100 space-y-4 py-2">
                        {link.dropdown.map((section) => (
                          <div key={section.title} className="space-y-2">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{section.title}</h3>
                            <div className="space-y-1">
                              {section.items.map((item) => (
                                <div key={item.name}>
                                  {item.nestedDropdown ? (
                                    // Item with nested dropdown
                                    <div className="space-y-1">
                                      <div 
                                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                                          isActive(item.href) ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                        onClick={(e) => handleNestedDropdown(section.title, item.name, e)}
                                      >
                                        <span>{item.name}</span>
                                        <FiChevronDown className={`h-3 w-3 transition-transform ${
                                          activeNestedDropdown?.section === section.title && 
                                          activeNestedDropdown?.item === item.name ? 'rotate-180' : ''
                                        }`} />
                                      </div>

                                      {/* Mobile Nested Dropdown */}
                                      {item.nestedDropdown && 
                                        activeNestedDropdown?.section === section.title && 
                                        activeNestedDropdown?.item === item.name && (
                                        <div className="ml-3 pl-3 border-l border-gray-200 space-y-1 py-1">
                                          {item.nestedDropdown.map((nestedItem) => (
                                            <Link 
                                              key={nestedItem.name}
                                              href={nestedItem.href}
                                              className={`block px-3 py-1.5 rounded-lg text-sm ${
                                                isActive(nestedItem.href) ? 'text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-900'
                                              }`}
                                              onClick={() => setMobileMenuOpen(false)}
                                            >
                                              {nestedItem.name}
                                            </Link>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    // Regular link without nested dropdown
                                    <Link 
                                      href={item.href}
                                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                        isActive(item.href) ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                      }`}
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            
              {/* Mobile Auth Buttons */}
              <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                {isLoading ? (
                  <div className="flex justify-center py-2">
                    <div className="rounded-full h-5 w-5 border-2 border-t-transparent border-blue-600 animate-spin"></div>
                  </div>
                ) : isLoggedIn ? (
                  <div className="space-y-2">
                    <AppLink
                      href={dashboardRoute}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-center w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                        isActive(dashboardRoute) 
                          ? 'bg-blue-600 text-white shadow-blue-500/25' 
                          : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      Dashboard
                    </AppLink>
                
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex items-center justify-center w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50"
                    >
                      {isLoggingOut ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Signing Out...
                        </>
                      ) : (
                        'Sign Out'
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/signin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      Log In 
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all"
                    >
                      Start Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;