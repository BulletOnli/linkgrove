import { create } from "zustand";
import { getUserAccount } from "../api/userApi";

const userStore = (set, get) => ({
    accountUser: [],
    getAccountUser: async () => {
        const accountUser = await getUserAccount("/users");
        set({ accountUser: accountUser });
    },
    logoutUser: () => {
        localStorage.removeItem("weblinksToken");
        set({ accountUser: {} });
    },
});

export const useUserStore = create(userStore);
