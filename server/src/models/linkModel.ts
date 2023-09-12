import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add a Title"],
    },
    url: {
        type: String,
        required: [true, "Please add a URL"],
    },
    thumbnail: {
        url: {
            type: String,
        },
        id: {
            type: String,
        },
    },
    likes: {
        type: Map,
        of: Boolean,
    },
    github: {
        type: String,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

export type LinkType = mongoose.InferSchemaType<typeof linkSchema>;

export default mongoose.model<LinkType>("Link", linkSchema);
