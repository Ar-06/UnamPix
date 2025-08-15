import type { Publics } from "@/types/public";
import axios from "./axiosPublics";

export const getPublics = (): Promise<Publics[]> =>
  axios.get("/").then((res) => res.data);
