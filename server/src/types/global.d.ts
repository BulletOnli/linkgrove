import mongoose from "mongoose";
import { UserType } from "src/models/userModel";

interface User extends UserType {
    _id: mongoose.Types.ObjectId;
}

declare global {
    namespace Express {
        interface Request {
            user: User | null;
        }
    }
}

export {};
