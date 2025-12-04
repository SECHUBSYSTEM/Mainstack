import axios from "axios";

const api = axios.create({
  baseURL: "https://fe-task-api.mainstack.io",
});

export default api;
