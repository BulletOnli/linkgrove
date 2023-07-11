import { create } from "zustand";
import { getUserAccountDetails } from "../api/userApi";

const userStore = (set, get) => ({
    accountUser: [],
    getAccountUser: async () => {
        // getting the account details
        const accountUser = await getUserAccountDetails("/users/details");

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
