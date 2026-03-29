/**
 * Auth stub — always returns authorized.
 * Replace with Clerk when keys are available.
 */
export async function requireAdmin(): Promise<null> {
  // TODO: Wire up Clerk auth
  // const { userId } = await auth();
  // if (!userId) throw new Error("Unauthorized");
  return null;
}

export function isAuthenticated(): boolean {
  // TODO: Check Clerk session
  return true;
}
