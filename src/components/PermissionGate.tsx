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
  const user = useAuthStore((state) => state.currentUser);
  
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
  if (permission) {
    const permissions = Array.isArray(user.permissions) ? user.permissions : [];
    if (permissions.includes(permission)) {
      return <>{children}</>;
    }
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Hook for checking if current user has a specific permission
 */
export function useHasPermission(permission: string): boolean {
  const user = useAuthStore((state) => state.currentUser);
  
  if (!user) return false;
  
  const userRole = user.role?.toUpperCase();
  
  // SYSTEM_ADMIN has all permissions
  if (userRole === 'SYSTEM_ADMIN') return true;
  
  const permissions = Array.isArray(user.permissions) ? user.permissions : [];
  if (permissions.includes(permission)) return true;
  
  return false;
}

/**
 * Hook for checking if current user has one of the specified roles
 */
export function useHasRole(...roles: ('SYSTEM_ADMIN' | 'ADMIN' | 'USER')[]): boolean {
  const user = useAuthStore((state) => state.currentUser);
  
  if (!user) return false;
  
  const userRole = (user.role?.toUpperCase() || 'USER') as 'SYSTEM_ADMIN' | 'ADMIN' | 'USER';
  
  return roles.includes(userRole);
}

export default PermissionGate;
