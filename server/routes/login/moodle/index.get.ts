// import { generateState } from "arctic";
import { generateState, generateCodeVerifier } from "oslo/oauth2";
import { oauth2Client } from "../../../utils/auth";

export default defineEventHandler(async (event) => {
  const state = generateState();
  const url: any = await oauth2Client.createAuthorizationURL({
    state,
    scopes: ["user_info"],
  });

  setCookie(event, "moodle_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return sendRedirect(event, url.toString());
});
