import { beforeEach, describe, expect, it, vi } from "vitest";
import { projects as fallbackProjects } from "@/data/projects";

const mocks = vi.hoisted(() => ({
  createSupabaseAdminClient: vi.fn(),
}));

vi.mock("@/lib/supabase/admin", () => ({
  createSupabaseAdminClient: mocks.createSupabaseAdminClient,
}));

import { getAllProjects, getPublishedProjects, rowToProject } from "@/lib/projects";

const databaseRow = {
  id: "project-1",
  issue: "01",
  name: "Test project",
  slug: "test-project",
  dek: "A test project",
  image: "/test.png",
  tags: ["Next.js"],
  links: { live: "https://example.com", code: "https://github.com/example/project" },
  facts: [{ label: "Role", value: "Developer" }],
  case_study: {
    kicker: "Case study",
    headline: "A tested project",
    sections: ["Challenge", "Approach", "Outcome"],
  },
  featured: true,
  status: "published" as const,
  display_order: 2,
};

describe("projects repository", () => {
  beforeEach(() => {
    mocks.createSupabaseAdminClient.mockReset();
  });

  it("maps database column names to the Project model", () => {
    expect(rowToProject(databaseRow)).toMatchObject({
      id: "project-1",
      caseStudy: databaseRow.case_study,
      displayOrder: 2,
      featured: true,
      status: "published",
    });
  });

  it("returns bundled published projects when Supabase is unavailable", async () => {
    mocks.createSupabaseAdminClient.mockReturnValue(null);

    await expect(getPublishedProjects()).resolves.toEqual(fallbackProjects);
  });

  it("returns bundled projects when the published-project query is empty", async () => {
    const order = vi.fn().mockResolvedValue({ data: [], error: null });
    const eq = vi.fn().mockReturnValue({ order });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });
    mocks.createSupabaseAdminClient.mockReturnValue({ from });

    await expect(getPublishedProjects()).resolves.toEqual(fallbackProjects);
    expect(from).toHaveBeenCalledWith("projects");
    expect(eq).toHaveBeenCalledWith("status", "published");
    expect(order).toHaveBeenCalledWith("display_order");
  });

  it("maps projects returned by Supabase", async () => {
    const order = vi.fn().mockResolvedValue({ data: [databaseRow], error: null });
    const eq = vi.fn().mockReturnValue({ order });
    const select = vi.fn().mockReturnValue({ eq });
    mocks.createSupabaseAdminClient.mockReturnValue({
      from: vi.fn().mockReturnValue({ select }),
    });

    await expect(getPublishedProjects()).resolves.toEqual([rowToProject(databaseRow)]);
  });

  it("throws the database error while loading the admin project list", async () => {
    const order = vi.fn().mockResolvedValue({
      data: null,
      error: { message: "database unavailable" },
    });
    const select = vi.fn().mockReturnValue({ order });
    mocks.createSupabaseAdminClient.mockReturnValue({
      from: vi.fn().mockReturnValue({ select }),
    });

    await expect(getAllProjects()).rejects.toThrow("database unavailable");
  });
});
