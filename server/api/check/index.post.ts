import jszip from "jszip";

export default defineEventHandler(async (event) => {
  if (!event.context.user) return;

  const body = await readBody(event);
  if (body.lang === "Python") {
    const zip = new jszip();
    zip.file("solution_code.py", body.code);
    zip.file("main.py", body.test);
    zip.file(
      "run",
      `#!/bin/bash \n
    /usr/local/python-3.8.1/bin/python3 main.py`
    );
    const archive = await zip.generateAsync({ type: "base64" });

    const submission: any = await $fetch(
      `${process.env.JUDGE0}/submissions?wait=true&base64_encoded=true`,
      {
        method: "POST",
        body: {
          language_id: 89,
          additional_files: archive,
        },
      }
    );

    return submission;
  }
  return "";
});
