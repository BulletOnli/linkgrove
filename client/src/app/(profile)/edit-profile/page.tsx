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
import { useEffect, useState, ChangeEvent, ReactElement } from "react";
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
import { useRouter } from "next/navigation";
import userStore from "@/src/zustandStore/userStore";
import { SocialsType } from "@/src/components/profile/SocialsGrid";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@/src/api/userApi";
import { isTokenAvailable } from "@/src/utils/checkAccessToken";
import Loading from "../../loading";

interface EditProfileTypes extends SocialsType {
    username: string;
    bio: string;
    profilePic: File;
}

const EditProfilePage = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const toast = useToast();
    const [previewImage, setPreviewImage] = useState("");

    const { register, handleSubmit, setValue } = useForm<EditProfileTypes>();

    const accountUser = userStore((state) => state.accountUser);
    const getAccountUser = userStore((state) => state.getAccountUser);

    // User details and its socials
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

        console.log(data);

        editProfileMutation.mutate(formData);
    };

    useEffect(() => {
        const checkToken = async () => {
            if (!(await isTokenAvailable())) {
                router.push("/login");
            }
        };

        getAccountUser();
        checkToken();
    }, []);

    if (profileDetailsQuery?.isLoading) return <Loading />;

    return (
        <div className="w-full text-gray-200 min-h-screen py-[5rem] lg:py-0 flex justify-center items-center">
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

                <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-4 mt-[4rem]">
                    <InputSocial
                        register={register}
                        name="facebook"
                        defaultValue={profileSocials?.facebook}
                        icon={
                            <FaFacebook size={22} className="text-blue-500" />
                        }
                    />
                    <InputSocial
                        register={register}
                        name="instagram"
                        defaultValue={profileSocials?.instagram}
                        icon={
                            <FaInstagram size={22} className="text-pink-300" />
                        }
                    />
                    <InputSocial
                        register={register}
                        name="twitter"
                        defaultValue={profileSocials?.twitter}
                        icon={<FaTwitter size={22} className="text-blue-400" />}
                    />
                    <InputSocial
                        register={register}
                        name="discord"
                        defaultValue={profileSocials?.discord}
                        icon={<FaDiscord size={22} className="text-blue-500" />}
                    />
                    <InputSocial
                        register={register}
                        name="reddit"
                        defaultValue={profileSocials?.reddit}
                        icon={
                            <FaReddit size={22} className="text-orange-400" />
                        }
                    />
                    <InputSocial
                        register={register}
                        name="telegram"
                        defaultValue={profileSocials?.telegram}
                        icon={
                            <FaTelegramPlane
                                size={22}
                                className="text-blue-400"
                            />
                        }
                    />
                    <InputSocial
                        register={register}
                        name="tiktok"
                        defaultValue={profileSocials?.tiktok}
                        icon={<FaTiktok size={18} />}
                    />
                    <InputSocial
                        register={register}
                        name="youtube"
                        defaultValue={profileSocials?.youtube}
                        icon={<FaYoutube size={22} className="text-red-500" />}
                    />
                    <InputSocial
                        register={register}
                        name="github"
                        defaultValue={profileSocials?.github}
                        icon={<FaGithub size={20} />}
                    />
                </div>

                <Button
                    type="submit"
                    w="10rem"
                    colorScheme="teal"
                    mt={7}
                    isLoading={editProfileMutation.isLoading}
                    spinnerPlacement="start"
                >
                    Save Changes
                </Button>
            </form>
        </div>
    );
};

const InputSocial = ({
    register,
    name,
    defaultValue,
    icon,
}: {
    register: any;
    name: string;
    defaultValue: string;
    icon: ReactElement;
}) => {
    return (
        <InputGroup>
            <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>
            <Input
                type="url"
                placeholder={`${name[0].toUpperCase()}${name.slice(
                    1,
                    name.length
                )}`}
                borderColor="gray"
                {...register(name)}
                defaultValue={defaultValue}
            />
        </InputGroup>
    );
};

export default EditProfilePage;
