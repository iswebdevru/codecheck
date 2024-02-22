export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  const parsed = await $fetch(data.url);
  return parsed;
});
