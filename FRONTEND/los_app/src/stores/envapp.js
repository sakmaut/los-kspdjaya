import { defineStore } from "pinia";
export const useEnvapp = defineStore("envapp", {
  state: () => {
    return {
      name_app: "KSP DJAYA",
      title: "KSPDJAYA",
      theme_app: "greenhaze",
    };
  },
});
