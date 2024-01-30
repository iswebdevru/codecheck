import { sign } from "jsonwebtoken";

const refreshTokens: Record<number, Record<string, any>> = {};
export const SECRET = "dummy";

export default eventHandler(async (event) => {
  const result = await readBody(event);
  if (!result.username || !result.password) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }
  // console.log(result);
  const expiresIn = 15;
  const refreshToken =
    Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1;
  const { username } = result;
  const user = {
    username,
    name: "User " + username,
  };

  const accessToken = sign(user, SECRET, {
    expiresIn,
  });
  refreshTokens[refreshToken] = {
    accessToken,
    user,
  };

  return {
    token: {
      accessToken,
      refreshToken,
    },
  };
});
