import jwt from "jsonwebtoken";

export const generateToken = (_id: string) => {
    return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "1d",
    });
};

export const getRefreshToken = (_id: string) => {
    return jwt.sign({ _id }, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: "1d",
    });
};
