import {
    Image,
    HStack,
    Spacer,
    Text,
    Flex,
    Divider,
    VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineHeart, AiOutlineLink } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";

const LinkCard = () => {
    return (
        <div className="w-[17rem] flex flex-col items-center bg-[#27272A] rounded-xl shadow-custom3 overflow-hidden">
            <Link
                href="/pc.png"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
            >
                <Image
                    w="full"
                    h="150px"
                    objectFit="cover"
                    src="/pc.png"
                    fallbackSrc="https://via.placeholder.com/180"
                    cursor="zoom-in"
                    _hover={{
                        transform: "scale(1.05)",
                        transition: "transform 0.3s",
                    }}
                />
            </Link>
            <div className="w-full flex flex-col p-2">
                <h1 className="w-full text-white font-semibold px-1">
                    Student Management System
                </h1>
                <HStack w="full" px={1} mt={2}>
                    <Flex alignItems="center" gap={1}>
                        <AiOutlineHeart className="text-xl cursor-pointer " />
                        <Text>12</Text>
                    </Flex>
                    <Spacer />
                    <HStack>
                        <BsGithub className=" cursor-pointer hover:text-blue-500" />
                        <AiOutlineLink className="text-xl cursor-pointer hover:text-blue-500" />
                    </HStack>
                </HStack>
            </div>
        </div>
    );
};

export default LinkCard;
