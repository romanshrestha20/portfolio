import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createSupabaseAdminClient: vi.fn(),
  createSupabaseServerClient: vi.fn(),
  generateLink: vi.fn(),
  sendAdminOtpEmail: vi.fn(),
  verifyOtp: vi.fn(),
  getUser: vi.fn(),
  signOut: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock("next/navigation", () => ({ redirect: mocks.redirect }));
vi.mock("@/lib/supabase/admin", () => ({ createSupabaseAdminClient: mocks.createSupabaseAdminClient }));
vi.mock("@/lib/supabase/server", () => ({ createSupabaseServerClient: mocks.createSupabaseServerClient }));
vi.mock("@/lib/admin-login-email", () => ({ sendAdminOtpEmail: mocks.sendAdminOtpEmail }));

import {
  requestAdminOtp,
  verifyAdminOtp,
  type LoginState,
  type VerifyLoginState,
} from "@/app/admin/login/actions";

const initialLoginState: LoginState = { status: "idle" };
const initialVerifyState: VerifyLoginState = { status: "idle" };

function requestForm(email: string) {
  const formData = new FormData();
  formData.set("email", email);
  return formData;
}

function verifyForm(email: string, otp: string, next = "/admin") {
  const formData = new FormData();
  formData.set("email", email);
  formData.set("otp", otp);
  formData.set("next", next);
  return formData;
}

describe("passwordless admin OTP login", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.stubEnv("ADMIN_EMAIL", "owner@example.com");
    mocks.generateLink.mockReset().mockResolvedValue({
      data: { properties: { email_otp: "123456" } },
      error: null,
    });
    mocks.sendAdminOtpEmail.mockReset().mockResolvedValue("sent");
    mocks.createSupabaseAdminClient.mockReset().mockReturnValue({
      auth: { admin: { generateLink: mocks.generateLink } },
    });
    mocks.verifyOtp.mockReset().mockResolvedValue({ error: null });
    mocks.getUser.mockReset().mockResolvedValue({
      data: { user: { id: "admin-1", email: "owner@example.com" } },
    });
    mocks.signOut.mockReset();
    mocks.createSupabaseServerClient.mockReset().mockResolvedValue({
      auth: { verifyOtp: mocks.verifyOtp, getUser: mocks.getUser, signOut: mocks.signOut },
    });
    mocks.redirect.mockReset();
  });

  it("rejects malformed email input", async () => {
    await expect(requestAdminOtp(initialLoginState, requestForm("not-an-email"))).resolves.toEqual({
      status: "error",
      message: "Enter a valid email address.",
    });
  });

  it("returns the generic sent state without emailing a non-admin", async () => {
    await expect(requestAdminOtp(initialLoginState, requestForm("someone@example.com"))).resolves.toEqual({
      status: "sent",
      email: "someone@example.com",
    });
    expect(mocks.generateLink).not.toHaveBeenCalled();
    expect(mocks.sendAdminOtpEmail).not.toHaveBeenCalled();
  });

  it("generates and emails a six-digit OTP to the admin", async () => {
    await expect(requestAdminOtp(initialLoginState, requestForm("OWNER@example.com"))).resolves.toEqual({
      status: "sent",
      email: "OWNER@example.com",
    });
    expect(mocks.generateLink).toHaveBeenCalledWith({ type: "magiclink", email: "OWNER@example.com" });
    expect(mocks.sendAdminOtpEmail).toHaveBeenCalledWith("OWNER@example.com", "123456");
  });

  it("verifies the OTP and redirects to a safe admin path", async () => {
    await verifyAdminOtp(initialVerifyState, verifyForm("owner@example.com", "123456", "/admin/projects"));
    expect(mocks.verifyOtp).toHaveBeenCalledWith({ email: "owner@example.com", token: "123456", type: "email" });
    expect(mocks.redirect).toHaveBeenCalledWith("/admin/projects");
  });

  it("rejects an invalid OTP without redirecting", async () => {
    mocks.verifyOtp.mockResolvedValue({ error: new Error("expired") });
    await expect(verifyAdminOtp(initialVerifyState, verifyForm("owner@example.com", "000000"))).resolves.toEqual({
      status: "error",
      message: "That code is invalid or has expired. Request a new one.",
    });
    expect(mocks.redirect).not.toHaveBeenCalled();
  });

  it("signs out a verified account outside the admin allowlist", async () => {
    mocks.getUser.mockResolvedValue({ data: { user: { id: "user-2", email: "someone@example.com" } } });
    await expect(verifyAdminOtp(initialVerifyState, verifyForm("someone@example.com", "123456"))).resolves.toEqual({
      status: "error",
      message: "This account is not authorized for the admin workspace.",
    });
    expect(mocks.signOut).toHaveBeenCalledOnce();
  });
});
