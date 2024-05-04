import { defineStore } from "pinia";

export const useDarkMode = defineStore("dark", {
  state: () => ({
    dark: [],
  }),
  getters: {
    isDarkMode() {
      return this.dark;
    },
  },
  actions: {
    darken(dar) {
      this.dark.push(dar);
    },
  },
});
