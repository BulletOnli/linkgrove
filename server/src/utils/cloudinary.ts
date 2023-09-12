import {
    v2 as cloudinary,
    ResourceApiResponse,
    UploadApiResponse,
} from "cloudinary";

export const getImg = async (
    publicId: string
): Promise<ResourceApiResponse> => {
    try {
        const result = await cloudinary.api.resource(publicId);
        return result;
    } catch (error) {
        throw new Error("Img not Found");
    }
};

export const uploadImg = async ({
    path,
    originalname,
}: {
    path: string;
    originalname: string;
}): Promise<UploadApiResponse> => {
    return await cloudinary.uploader.upload(
        path,
        { public_id: originalname },
        function (error, result) {
            if (error) throw new Error("Img Upload Failed");
            return result;
        }
    );
};

export const deleteImg = async (publicId: string) => {
    try {
        return await cloudinary.api.delete_resources([publicId], {
            type: "upload",
            resource_type: "image",
        });
    } catch (error) {
        throw new Error("Delete img failed");
    }
};
