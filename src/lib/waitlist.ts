const WAITLIST_KEY = "wally_waitlist";
const WAITLIST_COUNT_KEY = "wally_waitlist_count";

type WaitlistResponse = {
  count: number;
};

type JoinWaitlistResult = {
  status: "success" | "duplicate";
  count: number;
};

export function formatPeople(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return `${count} человек`;
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `${count} человека`;
  }

  return `${count} человек`;
}

function getLocalEmails(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(WAITLIST_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function setLocalEmails(list: string[]) {
  window.localStorage.setItem(WAITLIST_KEY, JSON.stringify(list));
  window.localStorage.setItem(WAITLIST_COUNT_KEY, String(list.length));
}

function getApiBaseUrl() {
  const baseUrl = import.meta.env.VITE_WAITLIST_API_URL;
  return typeof baseUrl === "string" && baseUrl.trim()
    ? baseUrl.trim().replace(/\/$/, "")
    : null;
}

async function getRemoteCount(baseUrl: string) {
  const response = await fetch(`${baseUrl}/count`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch waitlist count");
  }

  const data = (await response.json()) as WaitlistResponse;
  return typeof data.count === "number" ? data.count : 0;
}

export async function getWaitlistCount() {
  if (typeof window === "undefined") {
    return 0;
  }

  const baseUrl = getApiBaseUrl();

  if (baseUrl) {
    try {
      const remoteCount = await getRemoteCount(baseUrl);
      window.localStorage.setItem(WAITLIST_COUNT_KEY, String(remoteCount));
      return remoteCount;
    } catch {
      const cached = Number(
        window.localStorage.getItem(WAITLIST_COUNT_KEY) ?? "0",
      );
      return Number.isFinite(cached) ? cached : getLocalEmails().length;
    }
  }

  return getLocalEmails().length;
}

export async function joinWaitlist(email: string): Promise<JoinWaitlistResult> {
  const normalized = email.trim().toLowerCase();
  const list = getLocalEmails();

  if (list.includes(normalized)) {
    return { status: "duplicate", count: list.length };
  }

  const baseUrl = getApiBaseUrl();

  if (baseUrl) {
    const response = await fetch(`${baseUrl}/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: normalized }),
    });

    if (!response.ok) {
      throw new Error("Failed to join waitlist");
    }

    const nextList = [...list, normalized];
    setLocalEmails(nextList);
    return { status: "success", count: nextList.length };
  }

  const nextList = [...list, normalized];
  setLocalEmails(nextList);
  return { status: "success", count: nextList.length };
}
