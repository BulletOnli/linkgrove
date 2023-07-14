import { create } from "zustand";
import { getRequest } from "../api/fetcher";

// personal details of the user only
const userStore = (set, get) => ({
    isLoggedIn: false,
    accountUser: [],
    getAccountUser: async () => {
        const accountUser = await getRequest("/users/details");
        // automatically remove the token when it expires
        if (Object.values(accountUser).length === 0) {
            localStorage.removeItem("weblinksToken");
        }

        set({ accountUser: accountUser });
    },
    logoutUser: () => {
        localStorage.removeItem("weblinksToken");
        set({ accountUser: {} });
    },
});

export const useUserStore = create(userStore);
