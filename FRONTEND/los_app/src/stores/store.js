import { computed, ref } from "vue";
import { createGlobalState } from "@vueuse/core";

export const useToken = createGlobalState(() => {
  const token = ref("initoken");
  return { token };
});
