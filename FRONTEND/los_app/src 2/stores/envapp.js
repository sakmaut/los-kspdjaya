import { defineStore } from "pinia";
export const useEnvapp = defineStore("envapp", {
  state: () => {
    return {
      name_app: "bpr cahaya fajsar",
      theme_app: "greenhaze",
    };
  },
});
