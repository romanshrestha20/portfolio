import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createSupabaseServerClient: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: mocks.createSupabaseServerClient,
}));

import {
  getAdminUser,
  isAdminEmail,
  requireAdmin,
  safeAdminRedirect,
} from "@/lib/auth";

function clientWithUser(user: { id: string; email?: string } | null) {
  return {
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user } }),
    },
  };
}

describe("admin authorization", () => {
  beforeEach(() => {
    mocks.createSupabaseServerClient.mockReset();
    vi.unstubAllEnvs();
  });

  it("returns null when Supabase is not configured", async () => {
    mocks.createSupabaseServerClient.mockResolvedValue(null);

    await expect(getAdminUser()).resolves.toBeNull();
  });

  it("fails closed when no admin email is configured", async () => {
    const user = { id: "user-1", email: "owner@example.com" };
    mocks.createSupabaseServerClient.mockResolvedValue(clientWithUser(user));

    await expect(getAdminUser()).resolves.toBeNull();
  });

  it("compares the configured admin email without case sensitivity", async () => {
    vi.stubEnv("ADMIN_EMAIL", "OWNER@EXAMPLE.COM");
    const user = { id: "user-1", email: "owner@example.com" };
    mocks.createSupabaseServerClient.mockResolvedValue(clientWithUser(user));

    await expect(requireAdmin()).resolves.toBe(user);
  });

  it("rejects a signed-in user whose email is not the configured admin", async () => {
    vi.stubEnv("ADMIN_EMAIL", "owner@example.com");
    mocks.createSupabaseServerClient.mockResolvedValue(
      clientWithUser({ id: "user-2", email: "someone@example.com" })
    );

    await expect(requireAdmin()).rejects.toThrow("Unauthorized");
  });
});

describe("admin auth helpers", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it("normalizes whitespace and casing in the admin allowlist", () => {
    vi.stubEnv("ADMIN_EMAIL", " OWNER@EXAMPLE.COM ");

    expect(isAdminEmail("owner@example.com")).toBe(true);
    expect(isAdminEmail("someone@example.com")).toBe(false);
  });

  it.each([
    ["https://evil.example", "/admin"],
    ["//evil.example/admin", "/admin"],
    ["javascript:alert(1)", "/admin"],
    ["/admin/projects?status=draft", "/admin/projects?status=draft"],
  ])("sanitizes a requested post-login path", (value, expected) => {
    expect(safeAdminRedirect(value)).toBe(expected);
  });
});
