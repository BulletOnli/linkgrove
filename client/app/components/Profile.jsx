import { Avatar, HStack, Image } from "@chakra-ui/react";
import {
    FaTiktok,
    FaInstagram,
    FaGithub,
    FaFacebook,
    FaDiscord,
} from "react-icons/fa";

const Profile = () => {
    return (
        <div className="w-[40rem] h-full flex flex-col items-center">
            <Image
                src="/tzuyu.jpg"
                fallbackSrc="https://via.placeholder.com/180"
                borderRadius={"full"}
                boxSize="180px"
                mt={-20}
                border="2px"
            />
            <h1 className="mt-5 text-2xl font-bold">Gemmuel Dela Pena</h1>
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

export default Profile;
