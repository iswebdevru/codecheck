import { Argon2id } from "oslo/password";
import { prisma, lucia } from "../../utils/auth";
import { generateId } from "lucia";

// import type { DatabaseUser } from "../utils/db";

export default eventHandler(async (event) => {
  const data = await readBody(event);

  const username = data.username;
  // console.log(username);
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    throw createError({
      message: "Некорректное имя пользователя",
      statusCode: 400,
    });
  }
  const password = data.password;
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    throw createError({
      message: "Неправильный пароль",
      statusCode: 400,
    });
  }
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("service", "moodle_mobile_app");
  const tokens: any = await $fetch(
    "https://xn--d1a.xn--j1al4b.xn--p1ai/login/token.php",
    {
      method: "POST",
      body: formData,
    }
  );
  // console.log(tokens);
  if (tokens.errorcode) {
    throw createError({
      message: "Неправильное имя пользователя или пароль",
      statusCode: 400,
    });
  }

  let existingUser = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  const userInfo: any = await $fetch(
    `https://xn--d1a.xn--j1al4b.xn--p1ai/webservice/rest/server.php?wstoken=${tokens.token}&wsfunction=core_user_get_users_by_field&field=username&values[0]=${username}&moodlewsrestformat=json`
  );
  // console.log(userInfo);
  if (!existingUser) {
    existingUser = await prisma.user.create({
      data: {
        id: generateId(15),
        email: userInfo[0].email,
        fio: userInfo[0].fullname,
        username: userInfo[0].username,
        group: userInfo[0].city || "",
      },
    });
  } else {
    existingUser = await prisma.user.update({
      where: {
        username: existingUser.username,
      },
      data: {
        email: userInfo[0].email,
        fio: userInfo[0].fullname,
        group: userInfo[0].city || "",
      },
    });
  }

  // const validPassword = await new Argon2id().verify(
  //   existingUser.password,
  //   password
  // );
  // if (!validPassword) {
  //   throw createError({
  //     message: "Incorrect username or password",
  //     statusCode: 400,
  //   });
  // }

  const session = await lucia.createSession(existingUser!.id, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize()
  );
});
