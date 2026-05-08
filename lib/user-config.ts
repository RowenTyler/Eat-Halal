// User Access Configuration
// These users have full, unrestricted access to the entire website
// TODO: Replace with database authentication when backend is connected

export type UserRole = "admin" | "restaurant_owner" | "user";

export interface AuthorizedUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  permissions: string[];
  isActive: boolean;
  createdAt: string;
  reviewCount: number;
  avatarUrl?: string;
}

// Authorized users with full sign-in privileges
export const authorizedUsers: AuthorizedUser[] = [
  {
    id: "user_001",
    fullName: "Rowen Tyler",
    email: "richardson.rowen@gmail.com",
    password: "JokeryearOne",
    role: "admin",
    permissions: [
      "full_access",
      "admin_dashboard",
      "restaurant_dashboard",
      "user_dashboard",
      "manage_users",
      "manage_restaurants",
      "manage_reviews",
      "manage_certifications",
      "view_analytics",
      "edit_content",
      "delete_content",
      "approve_claims",
      "moderate_reviews",
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
    reviewCount: 47,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    id: "user_002",
    fullName: "Rowen Tyler",
    email: "rowenrichardson@gmail.com",
    password: "JokeryearOne",
    role: "admin",
    permissions: [
      "full_access",
      "admin_dashboard",
      "restaurant_dashboard",
      "user_dashboard",
      "manage_users",
      "manage_restaurants",
      "manage_reviews",
      "manage_certifications",
      "view_analytics",
      "edit_content",
      "delete_content",
      "approve_claims",
      "moderate_reviews",
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
    reviewCount: 47,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    id: "user_003",
    fullName: "Rowen Tyler",
    email: "tyler.rowend@gmail.com",
    password: "JokeryearOne",
    role: "admin",
    permissions: [
      "full_access",
      "admin_dashboard",
      "restaurant_dashboard",
      "user_dashboard",
      "manage_users",
      "manage_restaurants",
      "manage_reviews",
      "manage_certifications",
      "view_analytics",
      "edit_content",
      "delete_content",
      "approve_claims",
      "moderate_reviews",
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
    reviewCount: 47,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
];

// Authentication helper functions
export function authenticateUser(
  email: string,
  password: string
): AuthorizedUser | null {
  const user = authorizedUsers.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password &&
      u.isActive
  );
  return user || null;
}

export function getUserByEmail(email: string): AuthorizedUser | null {
  return (
    authorizedUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.isActive
    ) || null
  );
}

export function hasPermission(user: AuthorizedUser, permission: string): boolean {
  return (
    user.permissions.includes("full_access") ||
    user.permissions.includes(permission)
  );
}

export function canAccessRoute(user: AuthorizedUser, route: string): boolean {
  // Users with full_access can access everything
  if (user.permissions.includes("full_access")) {
    return true;
  }

  // Route-based permission mapping
  const routePermissions: Record<string, string[]> = {
    "/admin-dashboard": ["admin_dashboard"],
    "/restaurant-dashboard": ["restaurant_dashboard"],
    "/dashboard": ["user_dashboard"],
    "/favorites": ["user_dashboard"],
    "/my-reviews": ["user_dashboard"],
    "/profile-settings": ["user_dashboard"],
    "/add-restaurant": ["manage_restaurants"],
    "/claim-restaurant-search": ["manage_restaurants"],
  };

  const requiredPermissions = routePermissions[route];
  if (!requiredPermissions) {
    return true; // Public route
  }

  return requiredPermissions.some((perm) => user.permissions.includes(perm));
}

// Session management (for frontend demo - replace with proper session handling)
export interface UserSession {
  user: AuthorizedUser;
  token: string;
  expiresAt: string;
}

export function createSession(user: AuthorizedUser): UserSession {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour session

  return {
    user,
    token: `session_${user.id}_${Date.now()}`,
    expiresAt: expiresAt.toISOString(),
  };
}

export function isSessionValid(session: UserSession): boolean {
  return new Date(session.expiresAt) > new Date();
}
