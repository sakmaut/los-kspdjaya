import { defineStore } from "pinia";
import { reactive } from "vue";
export const useProspect = defineStore("prospect", () => {
  const formData = reactive({
    pinjaman: {
      cust_code_ref: "",
      tujuan_kredit: "",
      plafond: "",
      tenor: "",
      kategori: "",
    },
  });
  return { formData };
});
