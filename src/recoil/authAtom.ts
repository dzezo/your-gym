import { atom } from "recoil";
import { IUser } from "../interfaces/user.interface";

export const authAtom = atom<IUser | null>({
  key: "authAtom",
  default: JSON.parse(localStorage.getItem("user") || "{}"),
});
