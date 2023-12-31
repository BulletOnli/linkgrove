import mongoose from "mongoose";

const socialsSchema = new mongoose.Schema({
    facebook: {
        type: String,
    },
    instagram: {
        type: String,
    },
    twitter: {
        type: String,
    },
    tiktok: {
        type: String,
    },
    github: {
        type: String,
    },
    discord: {
        type: String,
    },
    telegram: {
        type: String,
    },
    reddit: {
        type: String,
    },
    youtube: {
        type: String,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

export type SocialsSchemaType = mongoose.InferSchemaType<typeof socialsSchema>;

export default mongoose.model<SocialsSchemaType>("Socials", socialsSchema);
