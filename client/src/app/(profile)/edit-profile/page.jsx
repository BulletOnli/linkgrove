"use client";
import {
    Button,
    HStack,
    Avatar,
    Input,
    InputGroup,
    InputLeftElement,
    VStack,
    FormLabel,
    FormControl,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
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
import { useUserStore } from "@/src/zustandStore/userStore";
import { getRequest, putRequest } from "@/src/api/fetcher";
import useSWR, { mutate } from "swr";
import { redirect } from "next/navigation";

const EditProfilePage = () => {
    const toast = useToast();
    const [previewImage, setPreviewImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSomethingChanged, setIsSomethingChanged] = useState(false);

    const { accountUser, getAccountUser } = useUserStore();

    const profileDetails = useSWR(
        `/users/user/${accountUser?.username}`,
        getRequest
    );

    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [socialInputs, setSocialInputs] = useState(
        profileDetails?.data?.socials
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSocialInputs((state) => ({
            ...state,
            [name]: value,
        }));
    };

    const handleImgUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result);
            setIsSomethingChanged(true);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            setIsLoading(true);
            await putRequest("/users/details/update", formData);

            if (socialInputs) {
                await putRequest(
                    `/socials/update?id=${profileDetails?.data?.socials?._id}`,
                    socialInputs
                );
                profileDetails.mutate();
            }
            getAccountUser(); // update the state of accountUser

            setIsLoading(false);
            toast({
                title: "Details Updated",
                status: "success",
                isClosable: true,
                position: "bottom-left",
                duration: 3000,
            });
            setPreviewImage("");
            setIsSomethingChanged(false);
        } catch (error) {
            console.log(error.response.data);
            setIsLoading(false);
            setIsSomethingChanged(false);
            toast({
                title: "Oops! Something went wrong.",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("weblinksToken");
        if (!token) {
            redirect("/login");
        }
        setUsername(accountUser?.username);
        setBio(accountUser?.bio);
    }, []);

    return (
        <div className="w-full text-gray-200 min-h-screen flex justify-center items-center">
            <FormControl
                w="50rem"
                display="flex"
                flexDirection="column"
                alignItems="center"
                as="form"
                onSubmit={handleSubmit}
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
                            name="username"
                            borderColor="gray"
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setIsSomethingChanged(true);
                            }}
                            value={username ?? ""}
                            autoComplete="off"
                        />
                        <Input
                            type="text"
                            name="bio"
                            placeholder="Bio"
                            size="sm"
                            mt={2}
                            rounded="md"
                            borderColor="gray"
                            onChange={(e) => {
                                setBio(e.target.value);
                                setIsSomethingChanged(true);
                            }}
                            value={bio ?? ""}
                            autoComplete="off"
                        />
                    </VStack>
                </div>

                <div className="grid grid-cols-3 justify-items-center gap-4 mt-[4rem]">
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <FaFacebook size={22} className="text-blue-500" />
                        </InputLeftElement>
                        <Input
                            name="facebook"
                            type="url"
                            placeholder="Facebook"
                            borderColor="gray"
                            onChange={(e) => {
                                handleInputChange(e);
                                setIsSomethingChanged(true);
                            }}
                            value={socialInputs?.facebook ?? ""}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <FaInstagram size={22} className="text-pink-300" />
                        </InputLeftElement>
                        <Input
                            name="instagram"
                            type="url"
                            placeholder="Instagram"
                            borderColor="gray"
                            onChange={(e) => {
                                handleInputChange(e);
                                setIsSomethingChanged(true);
                            }}
                            value={socialInputs?.instagram ?? ""}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <FaTwitter size={22} className="text-blue-400" />
                        </InputLeftElement>
                        <Input
                            name="twitter"
                            type="url"
                            placeholder="Twitter"
                            borderColor="gray"
                            onChange={(e) => {
                                handleInputChange(e);
                                setIsSomethingChanged(true);
                            }}
                            value={socialInputs?.twitter ?? ""}
                        />
                    </InputGroup>

                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <FaDiscord size={22} className="text-blue-500" />
                        </InputLeftElement>
                        <Input
                            name="discord"
                            type="url"
                            placeholder="Discord"
                            borderColor="gray"
                            onChange={(e) => {
                                handleInputChange(e);
                                setIsSomethingChanged(true);
                            }}
                            value={socialInputs?.discord ?? ""}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <FaReddit size={22} className="text-orange-400" />
                        </InputLeftElement>
                        <Input
                            name="reddit"
                            type="url"
                            placeholder="Reddit"
                            borderColor="gray"
                            onChange={(e) => {
                                handleInputChange(e);
                                setIsSomethingChanged(true);
                            }}
                            value={socialInputs?.reddit ?? ""}
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
                            name="telegram"
                            type="url"
                            placeholder="Telegram"
                            borderColor="gray"
                            onChange={(e) => {
                                handleInputChange(e);
                                setIsSomethingChanged(true);
                            }}
                            value={socialInputs?.telegram ?? ""}
                        />
                    </InputGroup>

                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <FaTiktok size={18} />
                        </InputLeftElement>
                        <Input
                            name="tiktok"
                            type="url"
                            placeholder="Tiktok"
                            borderColor="gray"
                            onChange={(e) => {
                                handleInputChange(e);
                                setIsSomethingChanged(true);
                            }}
                            value={socialInputs?.tiktok ?? ""}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <FaYoutube size={22} className="text-red-500" />
                        </InputLeftElement>
                        <Input
                            name="youtube"
                            type="url"
                            placeholder="Youtube"
                            borderColor="gray"
                            onChange={(e) => {
                                handleInputChange(e);
                                setIsSomethingChanged(true);
                            }}
                            value={socialInputs?.youtube ?? ""}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <FaGithub size={20} className="" />
                        </InputLeftElement>
                        <Input
                            name="github"
                            type="url"
                            placeholder="Github"
                            borderColor="gray"
                            onChange={(e) => {
                                handleInputChange(e);
                                setIsSomethingChanged(true);
                            }}
                            value={socialInputs?.github ?? ""}
                        />
                    </InputGroup>
                </div>

                <Button
                    type="submit"
                    w="10rem"
                    colorScheme="teal"
                    mt={7}
                    isLoading={isLoading}
                    spinnerPlacement="start"
                    isDisabled={!isSomethingChanged}
                >
                    Save Changes
                </Button>
            </FormControl>
        </div>
    );
};

export default EditProfilePage;
