import { create } from "zustand";
import { fetchAccountUser } from "../api/userApi";
import { isTokenAvailable } from "../utils/checkAccessToken";

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
    getAccountUser: () => void;
    logoutUser: () => void;
};

// personal details of the user only
const userStore = create<UserStoreType>((set, get) => ({
    accountUser: null,
    getAccountUser: async () => {
        const response = await fetchAccountUser();

        if ((await isTokenAvailable()) && response) {
            set({ accountUser: response });
        } else {
            set({ accountUser: null });
        }
    },
    logoutUser: () => {
        localStorage.removeItem("weblinksToken");
        set({ accountUser: null });
    },
}));

export default userStore;
