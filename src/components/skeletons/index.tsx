"use client";

import React from 'react';

/**
 * Base skeleton component with pulse animation
 */
export const SkeletonPulse = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-slate-200 rounded ${className}`} />
);

/**
 * Skeleton for the dashboard navbar
 */
export const NavbarSkeleton = () => (
  <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-100">
    <div className="flex items-center gap-3">
      {/* Hamburger menu placeholder (mobile) */}
      <SkeletonPulse className="w-6 h-6 rounded-lg md:hidden" />
      {/* Search bar placeholder */}
      <SkeletonPulse className="hidden md:block w-44 h-8 rounded-lg" />
    </div>
    <div className="flex items-center gap-3">
      {/* Notification icon */}
      <SkeletonPulse className="w-9 h-9 rounded-lg" />
      {/* Divider */}
      <div className="w-px h-6 bg-slate-100 mx-1" />
      {/* Avatar */}
      <SkeletonPulse className="w-8 h-8 rounded-full" />
      {/* Username */}
      <SkeletonPulse className="hidden md:block w-24 h-4 rounded" />
    </div>
  </div>
);

/**
 * Skeleton for user auth section in navbar
 */
export const NavbarUserSkeleton = () => (
  <div className="flex items-center gap-3">
    <SkeletonPulse className="w-8 h-8 rounded-full" />
    <SkeletonPulse className="hidden md:block w-20 h-4 rounded" />
  </div>
);

/**
 * Skeleton for stat/metric cards used in dashboards
 */
export const StatCardSkeleton = () => (
  <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
    <SkeletonPulse className="w-24 h-4 mb-3" />
    <SkeletonPulse className="w-16 h-8" />
  </div>
);

/**
 * Skeleton for gradient stat cards (like system admin dashboard)
 */
export const GradientStatCardSkeleton = () => (
  <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-slate-300 to-slate-400 animate-pulse">
    <div className="relative z-10">
      <SkeletonPulse className="w-20 h-4 mb-2 bg-white/30" />
      <SkeletonPulse className="w-12 h-8 bg-white/30" />
    </div>
    <div className="absolute right-4 top-4 w-10 h-10 rounded-full bg-white/20" />
  </div>
);

/**
 * Skeleton for table rows
 */
export const TableRowSkeleton = () => (
  <div className="flex items-center gap-4 px-6 py-4 border-b border-slate-50">
    {/* Avatar */}
    <SkeletonPulse className="w-10 h-10 rounded-full flex-shrink-0" />
    {/* Name/Email column */}
    <div className="flex-1 space-y-2">
      <SkeletonPulse className="w-32 h-4" />
      <SkeletonPulse className="w-48 h-3" />
    </div>
    {/* Status */}
    <SkeletonPulse className="w-16 h-6 rounded-full" />
    {/* Role */}
    <SkeletonPulse className="w-16 h-6 rounded-full hidden md:block" />
    {/* Actions */}
    <SkeletonPulse className="w-20 h-4 hidden md:block" />
  </div>
);

/**
 * Mobile card skeleton for user list
 */
export const MobileCardSkeleton = () => (
  <div className="p-4 space-y-3 border-b border-slate-100">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <SkeletonPulse className="w-10 h-10 rounded-full" />
        <div className="space-y-2">
          <SkeletonPulse className="w-28 h-4" />
          <SkeletonPulse className="w-36 h-3" />
        </div>
      </div>
      <SkeletonPulse className="w-6 h-6 rounded" />
    </div>
    <div className="flex gap-2">
      <SkeletonPulse className="w-16 h-5 rounded-full" />
      <SkeletonPulse className="w-12 h-5 rounded-full" />
    </div>
  </div>
);

/**
 * Skeleton for sidebar menu
 */
export const SidebarSkeleton = () => (
  <div className="hidden md:block w-64 bg-slate-800 p-4 space-y-4">
    {/* Logo */}
    <SkeletonPulse className="w-full h-10 bg-slate-700 rounded-lg" />
    {/* Divider */}
    <div className="h-px bg-slate-700" />
    {/* Menu items */}
    {[...Array(6)].map((_, i) => (
      <SkeletonPulse key={i} className="w-full h-10 bg-slate-700 rounded-lg" />
    ))}
  </div>
);

/**
 * Full page dashboard skeleton
 */
export const DashboardSkeleton = () => (
  <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-slate-50">
    {/* Sidebar skeleton (desktop only) */}
    <SidebarSkeleton />
    
    {/* Main content area */}
    <div className="flex-1 flex flex-col">
      {/* Navbar skeleton */}
      <NavbarSkeleton />
      
      {/* Content skeleton */}
      <div className="flex-1 px-4 md:px-6 py-4 space-y-6 overflow-hidden">
        {/* Header */}
        <div className="space-y-2">
          <SkeletonPulse className="w-48 h-8" />
          <SkeletonPulse className="w-72 h-4" />
        </div>
        
        {/* Stats grid - 2x2 on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <GradientStatCardSkeleton />
          <GradientStatCardSkeleton />
          <GradientStatCardSkeleton />
          <GradientStatCardSkeleton />
        </div>
        
        {/* Table skeleton */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <SkeletonPulse className="w-40 h-6" />
          </div>
          {/* Desktop table rows */}
          <div className="hidden md:block">
            {[...Array(5)].map((_, i) => (
              <TableRowSkeleton key={i} />
            ))}
          </div>
          {/* Mobile card rows */}
          <div className="md:hidden">
            {[...Array(4)].map((_, i) => (
              <MobileCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Content-only skeleton (for pages that already have sidebar/navbar)
 */
export const ContentSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    {/* Header */}
    <div className="space-y-2">
      <SkeletonPulse className="w-48 h-8" />
      <SkeletonPulse className="w-72 h-4" />
    </div>
    
    {/* Stats grid */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
    </div>
    
    {/* Card/Table skeleton */}
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <SkeletonPulse className="w-40 h-6 mb-4" />
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <SkeletonPulse key={i} className="w-full h-12" />
        ))}
      </div>
    </div>
  </div>
);

export default DashboardSkeleton;
