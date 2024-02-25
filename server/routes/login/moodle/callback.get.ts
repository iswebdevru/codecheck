import { OAuth2RequestError } from "oslo/oauth2";
import { oauth2Client, prisma } from "../../../utils/auth";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const code = query.code?.toString() ?? null;
  const state = query.state?.toString() ?? null;
  const storedState = getCookie(event, "moodle_oauth_state") ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    throw createError({
      status: 400,
    });
  }
  try {
    const data = await oauth2Client.validateAuthorizationCode(code!, {
      credentials: process.env.MOODLE_SECRETKEY,
      authenticateWith: "request_body",
    });

    const userInfo: any = await $fetch(process.env.MOODLE_USERINFO!, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        access_token: data.access_token,
      }),
    });
    const userInfoData = JSON.parse(userInfo);
    // console.log(userInfoData);
    let existingUser = await prisma.user.findFirst({
      where: {
        username: userInfoData.username,
      },
    });
    if (existingUser) {
      existingUser = await prisma.user.update({
        where: {
          username: userInfoData.username,
        },
        data: {
          email: userInfoData.email,
          fio: `${userInfoData.lastname} ${userInfoData.firstname} `,
          group: userInfoData.city || "",
        },
      });
      const session = await lucia.createSession(existingUser.id, {});
      appendHeader(
        event,
        "Set-Cookie",
        lucia.createSessionCookie(session.id).serialize()
      );
      return sendRedirect(event, "/");
    }
    existingUser = await prisma.user.create({
      data: {
        username: userInfoData.username,
        email: userInfoData.email,
        fio: `${userInfoData.lastname} ${userInfoData.firstname}`,
        group: userInfoData.city || "",
      },
    });
    const session = await lucia.createSession(existingUser.id, {});
    appendHeader(
      event,
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    );
    return sendRedirect(event, "/");
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      // see https://www.rfc-editor.org/rfc/rfc6749#section-5.2
      const { request, message, description } = e;
    }
    console.log(e);
    // return sendRedirect(event, "/");
    // unknown error
  }
});
