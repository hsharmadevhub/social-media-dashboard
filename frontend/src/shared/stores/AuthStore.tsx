import { create } from "zustand";

interface LoginData {
  username: string;
  token: string;
}

type AuthStore = LoginData & {
  login: (data: LoginData) => void;
  logout: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  username: "",
  token: "",
  login: (data: LoginData) =>
    set({ username: data.username, token: data.token }),
  logout: () => set({ username: "", token: "" }),
}));

export default useAuthStore;
