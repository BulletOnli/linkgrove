import jwt from "jsonwebtoken";

export const getAccessToken = (_id: string) => {
    return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "10m",
    });
};

export const getRefreshToken = (_id: string) => {
    return jwt.sign({ _id }, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: "1d",
    });
};
