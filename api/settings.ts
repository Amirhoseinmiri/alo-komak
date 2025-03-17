import axios from "axios";
export const axiosInstans = axios.create({
  baseURL: "https://stageauth.alo-komak.ir",
  headers: { "Content-Type": "application/json" },
});
