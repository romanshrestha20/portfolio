import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ createSupabaseAdminClient: vi.fn() }));

vi.mock("@/lib/supabase/admin", () => ({
  createSupabaseAdminClient: mocks.createSupabaseAdminClient,
}));

import {
  DEFAULT_PERSONAL_DETAILS,
  getPersonalDetailsHistory,
  normalizePersonalDetails,
} from "@/lib/site-settings";

describe("personal site settings", () => {
  beforeEach(() => mocks.createSupabaseAdminClient.mockReset());

  it("uses all defaults when stored settings are missing", () => {
    expect(normalizePersonalDetails(undefined)).toEqual(DEFAULT_PERSONAL_DETAILS);
  });

  it("merges saved values with defaults for backward compatibility", () => {
    const details = normalizePersonalDetails({
      name: "Updated Name",
      role: "",
      email: 42,
    });

    expect(details.name).toBe("Updated Name");
    expect(details.role).toBe(DEFAULT_PERSONAL_DETAILS.role);
    expect(details.email).toBe(DEFAULT_PERSONAL_DETAILS.email);
    expect(details.githubUrl).toBe(DEFAULT_PERSONAL_DETAILS.githubUrl);
  });

  it("maps stored profile revisions in newest-first order", async () => {
    const limit = vi.fn().mockResolvedValue({
      data: [{ id: "version-1", details: { name: "Earlier Name" }, created_at: "2026-08-02T10:00:00.000Z" }],
      error: null,
    });
    const order = vi.fn().mockReturnValue({ limit });
    const select = vi.fn().mockReturnValue({ order });
    mocks.createSupabaseAdminClient.mockReturnValue({ from: vi.fn().mockReturnValue({ select }) });

    await expect(getPersonalDetailsHistory()).resolves.toEqual({
      versions: [{
        id: "version-1",
        details: { ...DEFAULT_PERSONAL_DETAILS, name: "Earlier Name" },
        createdAt: "2026-08-02T10:00:00.000Z",
      }],
      error: null,
    });
    expect(order).toHaveBeenCalledWith("created_at", { ascending: false });
    expect(limit).toHaveBeenCalledWith(25);
  });

  it("explains when the revision migration is missing", async () => {
    const limit = vi.fn().mockResolvedValue({
      data: null,
      error: { message: "Could not find personal_details_history in the schema cache" },
    });
    const order = vi.fn().mockReturnValue({ limit });
    const select = vi.fn().mockReturnValue({ order });
    mocks.createSupabaseAdminClient.mockReturnValue({ from: vi.fn().mockReturnValue({ select }) });

    await expect(getPersonalDetailsHistory()).resolves.toEqual({
      versions: [],
      error: "Run the personal-details history migration to begin recording versions.",
    });
  });
});
