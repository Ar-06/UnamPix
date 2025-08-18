import type { CreatePublicResponse, Publics } from "@/types/public";
import axios from "./axiosPublics";

export const getPublics = (): Promise<Publics[]> =>
  axios.get("/").then((res) => res.data);

export const createPublics = async (
  publication: FormData
): Promise<CreatePublicResponse> => {
  const res = await axios.post("/create", publication);
  return res.data;
};
