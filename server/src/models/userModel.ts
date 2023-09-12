import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, "Username is required!"],
        },
        password: {
            type: String,
            required: [true, "Password is required!"],
        },
        bio: {
            type: String,
        },
        profilePic: {
            url: {
                type: String,
            },
            id: {
                type: String,
            },
        },
    },
    {
        timestamps: true,
    }
);

export type UserType = mongoose.InferSchemaType<typeof userSchema>;

export default mongoose.model<UserType>("User", userSchema);
