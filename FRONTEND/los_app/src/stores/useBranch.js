import { defineStore } from "pinia";
import { reactive } from "vue";
export const useBranch = defineStore("branch", () => {
  const formData = reactive({
    code: "",
    name: "",
    address: "",
    rt: "",
    rw: "",
    province: "",
    city: "",
    kelurahan: "",
    kecamatan: "",
    zip_code: "",
    location: "",
    phone_1: "",
    phone_2: "",
    phone_3: "",
    descr: "",
    status: "",
  });
  return { formData };
});
