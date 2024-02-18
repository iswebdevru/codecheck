import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";
import zlib from "zip-lib";
import fs from "fs";

export default defineEventHandler(async (event) => {
  if (!event.context.user) return;
  const storage = createStorage({
    driver: fsDriver({ base: `./tmp/${event.context.user?.username}` }),
  });

  //   const storage = useStorage("checks");

  const body = await readBody(event);
  if (body.lang === "Python") {
    // storage.mount(".", fsDriver({ base: "./output" }));

    await storage.setItem(`solution_code.py`, body.code);
    await storage.setItem(`main.py`, body.test);
    await storage.setItem(
      `run`,
      `#!/bin/bash \n
 /usr/local/python-3.8.1/bin/python3 main.py`
    );

    await zlib.archiveFolder(
      `${storage.getMount("checks").driver.options.base}`,
      `${storage.getMount("checks").driver.options.base}` +
        "/additional_files.zip"
    );

    //   const test = await storage.clear(storage.getMount().driver.options.base);

    //   fs.rmSync(storage.getMount().driver.options.base, { recursive: true });
    const base64 = fs
      .readFileSync(
        `${storage.getMount("checks").driver.options.base}` +
          "/additional_files.zip"
      )
      .toString("base64");

    const submission: any = await $fetch(
      `${process.env.JUDGE0}/submissions?wait=true`,
      {
        method: "POST",
        body: {
          language_id: 89,
          additional_files: base64,
        },
      }
    );
    await storage.clear();
    return submission;
  }
  return "";
});
