import mongoose from "mongoose";
import { UserType } from "src/models/userModel";

type User = {
    _id: mongoose.Types.ObjectId;
} & UserType;

declare global {
    namespace Express {
        interface Request {
            user: User | null;
        }
    }
}

export {};
