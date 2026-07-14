/** Read JWT from localStorage (supports btoa(JSON.stringify(token)) format). */
export function getStoredAuthToken(storageKey: string): string | null {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return null;
  try {
    const decoded = atob(raw);
    try {
      const parsed = JSON.parse(decoded);
      if (typeof parsed === 'string' && parsed.length > 0) {
        return parsed;
      }
    } catch {
      // not JSON — use decoded string directly
    }
    const cleaned = decoded.replace(/^"|"$/g, '').trim();
    return cleaned.length > 0 ? cleaned : null;
  } catch {
    return null;
  }
}

export function setStoredAuthToken(storageKey: string, token: string): void {
  localStorage.setItem(storageKey, btoa(JSON.stringify(token)));
}
