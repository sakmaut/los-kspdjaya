import axios from "axios";
const apibase = import.meta.env.VITE_APP_API_BASE;
const useAPIget = async (route, token) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const data = [];
  try {
    await axios.get(`${apibase}/${route}`, config).then((res) => {
      data.push(res.data.response);
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
const useOpenAPIget = async (url) => {
  const data = [];
  try {
    await axios.get(url).then((res) => {
      data.push(res.data);
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
const useAPIPost = async (route, token, payload) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const data = [];
  try {
    await axios.get(`${apibase}/${route}`, payload, config).then((res) => {
      data.push(res.data.response);
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { useAPIget, useAPIPost, useOpenAPIget };
