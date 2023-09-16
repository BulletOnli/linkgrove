"use client";
import {
    Button,
    Avatar,
    Input,
    InputGroup,
    InputLeftElement,
    VStack,
    FormLabel,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState, ChangeEvent } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import {
    FaTiktok,
    FaInstagram,
    FaGithub,
    FaFacebook,
    FaDiscord,
    FaTwitter,
    FaTelegramPlane,
    FaReddit,
    FaYoutube,
} from "react-icons/fa";
import { redirect } from "next/navigation";
import userStore from "@/src/zustandStore/userStore";
import { SocialsType } from "@/src/components/profile/SocialsGrid";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@/src/api/userApi";
import { isTokenAvailable } from "@/src/utils/checkAccessToken";

interface EditProfileTypes extends SocialsType {
    username: string;
    bio: string;
    profilePic: File;
}

const EditProfilePage = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const [previewImage, setPreviewImage] = useState("");
    const { register, handleSubmit, setValue } = useForm<EditProfileTypes>();

    const accountUser = userStore((state) => state.accountUser);
    const getAccountUser = userStore((state) => state.getAccountUser);

    const profileDetailsQuery = useQuery({
        queryKey: ["user", "profile", "details", accountUser?._id],
        queryFn: async () => {
            const response = await axios.get(
                `${API_URL}/users/user/${accountUser?.username}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "weblinksToken"
                        )}`,
                    },
                }
            );

            return response.data;
        },
        enabled: accountUser != null,
    });

    const profileSocials: SocialsType = profileDetailsQuery.data?.socials;

    const handleImgUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result as string);
        };

        if (file) {
            reader.readAsDataURL(file);
            setValue("profilePic", file);
        }
    };

    const editProfileMutation = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await axios.put(
                `${API_URL}/users/details/update?socialsId=${profileSocials?._id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "weblinksToken"
                        )}`,
                    },
                }
            );

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries([
                "user",
                "profile",
                "details",
                accountUser?._id,
            ]);

            getAccountUser(); // update the state of accountUser
            toast({
                title: "Details Updated",
                status: "success",
                isClosable: true,
                position: "bottom-left",
                duration: 3000,
            });
            // setPreviewImage("");
        },
        onError: () => {
            toast({
                title: "Oops! Something went wrong.",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        },
    });

    const onSubmit = (data: EditProfileTypes) => {
        const formData = new FormData();
        formData.set("username", data.username);
        formData.set("bio", data.bio);
        formData.set("facebook", data.facebook);
        formData.set("instagram", data.instagram);
        formData.set("twitter", data.twitter);
        formData.set("discord", data.discord);
        formData.set("reddit", data.reddit);
        formData.set("telegram", data.telegram);
        formData.set("tiktok", data.tiktok);
        formData.set("youtube", data.youtube);
        formData.set("github", data.github);
        formData.set("profilePic", data.profilePic);

        editProfileMutation.mutate(formData);
    };

    useEffect(() => {
        const checkToken = async () => {
            if (await isTokenAvailable()) {
                redirect("/login");
            }
        };

        checkToken();
    }, []);

    return (
        <div className="w-full text-gray-200 min-h-screen flex justify-center items-center">
            <form
                className="w-[50rem] flex flex-col items-center"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col lg:flex-row items-center">
                    <Avatar
                        name={accountUser?.username}
                        src={previewImage || accountUser?.profilePic?.url}
                        size="2xl"
                    >
                        <Button
                            size="xs"
                            colorScheme="gray"
                            position="absolute"
                            right={2}
                            bottom={0}
                            rounded="full"
                        >
                            <label
                                htmlFor="profilePic-upload"
                                className="w-full"
                            >
                                <BsFillCameraFill size={18} />
                            </label>
                            <input
                                onChange={handleImgUpload}
                                type="file"
                                accept="image/*"
                                id="profilePic-upload"
                                className="hidden"
                                name="profilePic"
                            />
                        </Button>
                    </Avatar>
                    <VStack gap={0} ml={4}>
                        <FormLabel w="full" fontWeight="semibold">
                            Username:
                        </FormLabel>
                        <Input
                            type="text"
                            borderColor="gray"
                            autoComplete="off"
                            {...register("username")}
                            defaultValue={accountUser?.username}
                        />
                        <Input
                            type="text"
                            placeholder="Bio"
                            size="sm"
                            mt={2}
                            rounded="md"
                            borderColor="gray"
                            autoComplete="off"
                            {...register("bio")}
                            defaultValue={accountUser?.bio}
                        />
                    </VStack>
                </div>

                <div className="grid grid-cols-3 justify-items-center gap-4 mt-[4rem]">
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <FaFacebook size={22} className="text-blue-500" />
                        </InputLeftElement>
                        <Input
                            type="url"
                            placeholder="Facebook"
                            borderColor="gray"
                            {...register("facebook")}
                            defaultValue={profileSocials?.facebook}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <FaInstagram size={22} className="text-pink-300" />
                        </InputLeftElement>
                        <Input
                            type="url"
                            placeholder="Instagram"
                            borderColor="gray"
                            {...register("instagram")}
                            defaultValue={profileSocials?.instagram}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <FaTwitter size={22} className="text-blue-400" />
                        </InputLeftElement>
                        <Input
                            type="url"
                            placeholder="Twitter"
                            borderColor="gray"
                            {...register("twitter")}
                            defaultValue={profileSocials?.twitter}
                        />
                    </InputGroup>

                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <FaDiscord size={22} className="text-blue-500" />
                        </InputLeftElement>
                        <Input
                            type="url"
                            placeholder="Discord"
                            borderColor="gray"
                            {...register("discord")}
                            defaultValue={profileSocials?.discord}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <FaReddit size={22} className="text-orange-400" />
                        </InputLeftElement>
                        <Input
                            type="url"
                            placeholder="Reddit"
                            borderColor="gray"
                            {...register("reddit")}
                            defaultValue={profileSocials?.reddit}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <FaTelegramPlane
                                size={22}
                                className="text-blue-400"
                            />
                        </InputLeftElement>
                        <Input
                            type="url"
                            placeholder="Telegram"
                            borderColor="gray"
                            {...register("telegram")}
                            defaultValue={profileSocials?.telegram}
                        />
                    </InputGroup>

                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <FaTiktok size={18} />
                        </InputLeftElement>
                        <Input
                            type="url"
                            placeholder="Tiktok"
                            borderColor="gray"
                            {...register("tiktok")}
                            defaultValue={profileSocials?.tiktok}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <FaYoutube size={22} className="text-red-500" />
                        </InputLeftElement>
                        <Input
                            type="url"
                            placeholder="Youtube"
                            borderColor="gray"
                            {...register("youtube")}
                            defaultValue={profileSocials?.youtube}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <FaGithub size={20} className="" />
                        </InputLeftElement>
                        <Input
                            type="url"
                            placeholder="Github"
                            borderColor="gray"
                            {...register("github")}
                            defaultValue={profileSocials?.github}
                        />
                    </InputGroup>
                </div>

                <Button
                    type="submit"
                    w="10rem"
                    colorScheme="teal"
                    mt={7}
                    isLoading={editProfileMutation.isLoading}
                    spinnerPlacement="start"
                    // isDisabled={!isSomethingChanged}
                >
                    Save Changes
                </Button>
            </form>
        </div>
    );
};

export default EditProfilePage;
