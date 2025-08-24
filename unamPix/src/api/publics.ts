import type {
  CreatePublicResponse,
  idUsuario,
  Publics,
  PublicResponseUser,
  idPublicacion,
} from "@/types/public";
import axios from "./axiosPublics";

export const getPublics = (): Promise<Publics[]> =>
  axios.get("/").then((res) => res.data);

export const createPublics = async (
  publication: FormData
): Promise<CreatePublicResponse> => {
  const res = await axios.post("/create", publication);
  return res.data;
};

export const getPublicsByUser = async ({
  idUsuario,
}: idUsuario): Promise<PublicResponseUser> => {
  const res = await axios.get(`/${idUsuario}`);
  return res.data;
};

export const getPublicOne = async ({
  idPublicacion,
}: idPublicacion): Promise<Publics> => {
  const res = await axios.get(`/publicdetail/${idPublicacion}`);
  return res.data;
};
