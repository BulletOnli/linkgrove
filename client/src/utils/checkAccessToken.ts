import jwtDecode from "jwt-decode";
import refreshAccessToken from "../api/refreshToken";

export const isTokenAvailable = async () => {
    const token = localStorage.getItem("weblinksToken");

    if (!token) {
        return false;
    }

    try {
        const decodedToken: any = jwtDecode(token);
        const tokenExpiration = decodedToken.exp * 1000;
        const currentTime = Date.now();

        if (currentTime > tokenExpiration) {
            const newAccessToken = await refreshAccessToken();

            if (newAccessToken) {
                localStorage.setItem("weblinksToken", newAccessToken);
                return true;
            } else {
                return false;
            }
        }
        console.log("Token available");
        return true;
    } catch (error) {
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
            localStorage.setItem("weblinksToken", newAccessToken);
            return true;
        } else {
            return false;
        }
    }
};
