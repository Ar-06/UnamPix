import axios from "./axiosAuth";
import { type User, type LoginUser } from "../types/user";

export const registerRequest = (user: User) => axios.post("/register", user);
export const loginRequest = (user: LoginUser) => axios.post("/login", user);
export const logoutRequest = () => axios.post("/logout");
export const verifyToken = () => axios.get("/verify");
