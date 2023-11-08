import mongoose from "mongoose";
import { UserType } from "src/models/userModel";

interface User {
    username?: string;
    _id?: mongoose.Types.ObjectId;
}

declare global {
    namespace Express {
        interface Request {
            user: User | null;
        }
    }
}

export {};
