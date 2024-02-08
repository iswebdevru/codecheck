import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";
import zlib from "zip-lib";
import fs from "fs";

export default defineEventHandler(async (event) => {
  const storage = createStorage({
    driver: fsDriver({ base: `./tmp/${event.context.user?.username}` }),
  });

  //   const storage = useStorage("checks");

  const body = await readBody(event);
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
    "http://localhost:2358/submissions?base64_encoded=true",
    {
      method: "POST",
      body: {
        language_id: 89,
        additional_files: base64,
      },
    }
  );
  const getSubmission = async (token: string) => {
    let result: any = await $fetch(
      `http://localhost:2358/submissions/${token}`
    );
    while (result.status.id === 1) {
      result = await $fetch(`http://localhost:2358/submissions/${token}`);
    }
    return result;
  };
  //   await getSubmission(submission.token);
  //   const result = await $fetch(
  //     `http://localhost:2358/submissions/${submission.token}`,
  //     {
  //       retry: 3,
  //       retryDelay: 1000,
  //     }
  //   );
  const result = await getSubmission(submission.token);
  await storage.clear();

  return result;
});
