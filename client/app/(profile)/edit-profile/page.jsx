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
import { updateAccountDetails } from "@/app/api/userApi";
import { useUserStore } from "@/app/zustandStore/userStore";

const EditProfilePage = () => {
    const toast = useToast();
    const [previewImage, setPreviewImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSomethingChanged, setIsSomethingChanged] = useState(false);

    const { accountUser, getAccountUser } = useUserStore();

    const [username, setUsername] = useState(accountUser?.username);
    const [bio, setBio] = useState(accountUser?.bio);
    const [facebook, setFacebook] = useState(accountUser?.facebook);
    const [instagram, setInstagram] = useState(accountUser?.instagram);
    const [twitter, setTwitter] = useState(accountUser?.twitter);
    const [discord, setDiscord] = useState(accountUser?.discord);
    const [reddit, setReddit] = useState(accountUser?.reddit);
    const [telegram, setTelegram] = useState(accountUser?.telegram);
    const [tiktok, setTiktok] = useState(accountUser?.tiktok);
    const [youtube, setYoutube] = useState(accountUser?.youtube);
    const [github, setGithub] = useState(accountUser?.github);

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
            await updateAccountDetails("/users/details", formData);
            getAccountUser(); // update the account details

            setIsLoading(false);
            toast({
                title: "Details Updated",
                status: "success",
                isClosable: true,
                position: "top",
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
        getAccountUser();
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
                <HStack>
                    <Avatar
                        name={accountUser?.username}
                        src={previewImage || accountUser?.profilePic?.url}
                        size="2xl"
                        mt="-4rem"
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
                    <VStack gap={0} ml={4} mt={-16}>
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
                            value={username}
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
                            value={bio}
                        />
                    </VStack>
                </HStack>

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
                                setFacebook(e.target.value);
                                setIsSomethingChanged(true);
                            }}
                            value={facebook}
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
                                setInstagram(e.target.value);
                                setIsSomethingChanged(true);
                            }}
                            value={instagram}
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
                                setTwitter(e.target.value);
                                setIsSomethingChanged(true);
                            }}
                            value={twitter}
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
                                setDiscord(e.target.value);
                                setIsSomethingChanged(true);
                            }}
                            value={discord}
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
                                setReddit(e.target.value);
                                setIsSomethingChanged(true);
                            }}
                            value={reddit}
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
                                setTelegram(e.target.value);
                                setIsSomethingChanged(true);
                            }}
                            value={telegram}
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
                                setTiktok(e.target.value);
                                setIsSomethingChanged(true);
                            }}
                            value={tiktok}
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
                                setYoutube(e.target.value);
                                setIsSomethingChanged(true);
                            }}
                            value={youtube}
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
                                setGithub(e.target.value);
                                setIsSomethingChanged(true);
                            }}
                            value={github}
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
