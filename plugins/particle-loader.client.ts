import { defineNuxtPlugin } from "#app";
import { loadFull } from "tsparticles";
import { tsParticles } from "@tsparticles/engine";

export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.server) {
    return;
  }

  await loadFull(tsParticles);
});
