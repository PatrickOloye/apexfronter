'use client';

import { ReactNode } from 'react';
import { useAuthStore } from '../store/AuthStore';

interface PermissionGateProps {
  /** Permission key required to view the content */
  permission?: string;
  /** Roles allowed to view the content */
  roles?: ('SYSTEM_ADMIN' | 'ADMIN' | 'USER')[];
  /** Content to render if user has permission/role */
  children: ReactNode;
  /** Fallback content if user doesn't have permission */
  fallback?: ReactNode;
}

/**
 * PermissionGate component for conditionally rendering content based on user permissions/roles
 * 
 * @example
 * // Permission-based
 * <PermissionGate permission="manage_loans">
 *   <LoanManagementPanel />
 * </PermissionGate>
 * 
 * @example
 * // Role-based
 * <PermissionGate roles={['SYSTEM_ADMIN', 'ADMIN']}>
 *   <AdminOnlyContent />
 * </PermissionGate>
 * 
 * @example
 * // With fallback
 * <PermissionGate permission="view_reports" fallback={<p>Access denied</p>}>
 *   <ReportsPanel />
 * </PermissionGate>
 */
export function PermissionGate({ permission, roles, children, fallback = null }: PermissionGateProps) {
  const { user } = useAuthStore();
  
  // If no user, don't render
  if (!user) {
    return <>{fallback}</>;
  }

  const userRole = (user.role?.toUpperCase() || 'USER') as 'SYSTEM_ADMIN' | 'ADMIN' | 'USER';

  // SYSTEM_ADMIN has all permissions
  if (userRole === 'SYSTEM_ADMIN') {
    return <>{children}</>;
  }

  // Check role requirement
  if (roles && roles.length > 0) {
    if (!roles.includes(userRole)) {
      return <>{fallback}</>;
    }
  }

  // Check permission requirement
  // Note: In a full implementation, this would check the user's permissions array
  // For now, we'll allow all if user is ADMIN and check frontend-side
  if (permission) {
    // TODO: Connect to user.permissions when backend is fully wired
    // For now, ADMIN users pass through (permissions checked at API level)
    if (userRole === 'ADMIN') {
      return <>{children}</>;
    }
    // Regular users don't have admin permissions
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Hook for checking if current user has a specific permission
 */
export function useHasPermission(permission: string): boolean {
  const { user } = useAuthStore();
  
  if (!user) return false;
  
  const userRole = user.role?.toUpperCase();
  
  // SYSTEM_ADMIN has all permissions
  if (userRole === 'SYSTEM_ADMIN') return true;
  
  // TODO: Check against user.permissions array
  // For now, admin users have permissions (checked at API level)
  if (userRole === 'ADMIN') return true;
  
  return false;
}

/**
 * Hook for checking if current user has one of the specified roles
 */
export function useHasRole(...roles: ('SYSTEM_ADMIN' | 'ADMIN' | 'USER')[]): boolean {
  const { user } = useAuthStore();
  
  if (!user) return false;
  
  const userRole = (user.role?.toUpperCase() || 'USER') as 'SYSTEM_ADMIN' | 'ADMIN' | 'USER';
  
  return roles.includes(userRole);
}

export default PermissionGate;
