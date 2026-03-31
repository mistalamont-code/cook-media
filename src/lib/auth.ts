import { cookies } from "next/headers";

/**
 * Auth stub — checks for admin_session cookie.
 * Replace with Clerk when keys are available.
 */
export async function requireAdmin(): Promise<null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "authenticated") {
    // In API routes, throw to return 401
    // In pages, the proxy handles the redirect
    return null;
  }

  return null;
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === "authenticated";
}
