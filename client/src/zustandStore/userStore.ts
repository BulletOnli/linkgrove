import { create } from "zustand";
import { API_URL, fetchAccountUser } from "../api/userApi";
import { isTokenAvailable } from "../utils/checkAccessToken";
import axios from "axios";

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
    logoutUser: async () => {
        await axios
            .post(`${API_URL}/auth/logout`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "weblinksToken"
                    )}`,
                },
                withCredentials: true,
            })
            .then(() => {
                localStorage.removeItem("weblinksToken");
                set({ accountUser: null });
            });
    },
}));

export default userStore;
