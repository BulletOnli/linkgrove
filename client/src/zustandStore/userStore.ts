import { create } from "zustand";
import { getRequest } from "../api/fetcher";

export type UserType = {
    username: string;
    bio: string;
    _id: string;
    profilePic: {
        id: string;
        url: string;
    };
};

type UserStoreType = {
    accountUser: UserType | null;
    isLoggedIn: boolean;
    getAccountUser: () => void;
    logoutUser: () => void;
};

// personal details of the user only
const userStore = create<UserStoreType>((set, get) => ({
    isLoggedIn: false,
    accountUser: null,
    getAccountUser: async () => {
        const accountUser = await getRequest("/users/details");
        // automatically remove the token when it expires
        if (!accountUser) {
            localStorage.removeItem("weblinksToken");
        }

        set({ accountUser: accountUser });
    },
    logoutUser: () => {
        localStorage.removeItem("weblinksToken");
        set({ accountUser: null });
    },
}));

export default userStore;
