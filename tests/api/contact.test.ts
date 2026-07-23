import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createSupabaseAdminClient: vi.fn(),
  sendContactNotification: vi.fn(),
}));

vi.mock("@/lib/supabase/admin", () => ({
  createSupabaseAdminClient: mocks.createSupabaseAdminClient,
}));

vi.mock("@/lib/contact-email", () => ({
  sendContactNotification: mocks.sendContactNotification,
}));

import { POST } from "@/app/api/contact/route";

const validMessage = {
  name: "Roman Shrestha",
  email: "roman@example.com",
  message: "I would like to discuss a new project.",
};

function requestWith(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

function databaseResult(result: {
  data: { id: string } | null;
  error: { message: string } | null;
}) {
  const single = vi.fn().mockResolvedValue(result);
  const select = vi.fn().mockReturnValue({ single });
  const insert = vi.fn().mockReturnValue({ select });
  const from = vi.fn().mockReturnValue({ insert });
  return { client: { from }, from, insert, select, single };
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    mocks.createSupabaseAdminClient.mockReset();
    mocks.sendContactNotification.mockReset();
    vi.unstubAllEnvs();
  });

  it.each([
    [{ ...validMessage, name: "R" }],
    [{ ...validMessage, email: "not-an-email" }],
    [{ ...validMessage, message: "Too short" }],
  ])("rejects invalid contact details", async (body) => {
    const response = await POST(requestWith(body));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "Invalid message" });
    expect(mocks.createSupabaseAdminClient).not.toHaveBeenCalled();
  });

  it("accepts a valid message in local development without Supabase", async () => {
    vi.stubEnv("NODE_ENV", "development");
    mocks.createSupabaseAdminClient.mockReturnValue(null);

    const response = await POST(requestWith(validMessage));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true, local: true });
  });

  it("returns 503 outside development when Supabase is unavailable", async () => {
    vi.stubEnv("NODE_ENV", "production");
    mocks.createSupabaseAdminClient.mockReturnValue(null);

    const response = await POST(requestWith(validMessage));

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error: "Contact service is not configured",
    });
  });

  it("returns 500 when the message cannot be persisted", async () => {
    const database = databaseResult({
      data: null,
      error: { message: "insert failed" },
    });
    mocks.createSupabaseAdminClient.mockReturnValue(database.client);

    const response = await POST(requestWith(validMessage));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Could not save message",
    });
    expect(mocks.sendContactNotification).not.toHaveBeenCalled();
  });

  it("persists a valid message and sends its notification", async () => {
    const database = databaseResult({
      data: { id: "message-123" },
      error: null,
    });
    mocks.createSupabaseAdminClient.mockReturnValue(database.client);
    mocks.sendContactNotification.mockResolvedValue("sent");

    const response = await POST(requestWith(validMessage));

    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(database.from).toHaveBeenCalledWith("messages");
    expect(database.insert).toHaveBeenCalledWith(validMessage);
    expect(mocks.sendContactNotification).toHaveBeenCalledWith({
      ...validMessage,
      id: "message-123",
    });
  });
});
