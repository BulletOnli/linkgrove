import { Avatar, HStack, Image } from "@chakra-ui/react";
import {
    FaTiktok,
    FaInstagram,
    FaGithub,
    FaFacebook,
    FaDiscord,
} from "react-icons/fa";
import { useUserStore } from "../store/userStore";
import { useEffect } from "react";

const ProfileInfo = ({ params }) => {
    const { accountUser, getAccountUser } = useUserStore();

    let username = params.username;
    if (username.includes("%20")) {
        username = params.username.replace(/%20/g, " ");
    }

    useEffect(() => {
        getAccountUser();
    }, []);

    return (
        <div className="sticky top-[10rem] w-[40rem] h-max flex flex-col items-center">
            <Avatar
                name={accountUser?.username}
                src="/cj.jpg"
                size="2xl"
                mt="-4rem"
            />
            <h1 className="mt-5 text-2xl font-bold">{username}</h1>
            <p className="text-sm mt-2 text-gray-300">
                Time is gold while watching bold
            </p>
            <HStack fontSize={22} spacing={4} mt={6}>
                <FaTiktok className="cursor-pointer" />
                <FaInstagram className="text-pink-300 cursor-pointer" />
                <FaGithub className="cursor-pointer" />
                <FaFacebook className="text-blue-400 cursor-pointer" />
                <FaDiscord className="text-blue-500 cursor-pointer" />
            </HStack>
        </div>
    );
};

export default ProfileInfo;
