import axios from "axios";

const config = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
const HTTP = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE,
  config,
});

export { HTTP };
