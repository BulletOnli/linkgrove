"use client";
import {
    Image,
    HStack,
    Text,
    Flex,
    IconButton,
    VStack,
    useDisclosure,
    Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import AlertDelete from "./modal/AlertDelete";
import EditLinkModal from "./modal/EditLinkModal";
import { useRouter } from "next/navigation";
import userStore, { UserType } from "../zustandStore/userStore";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../api/userApi";
import { isTokenAvailable } from "../utils/checkAccessToken";

export type LinkType = {
    creator: string;
    github: string;
    likes: {};
    thumbnail: {
        url: string;
        id: string;
    };
    title: string;
    url: string;
    _id: string;
};

type LinkCard2Props = {
    link: LinkType;
    userProfileInfo: UserType;
};

const LinkCard2 = ({ link, userProfileInfo }: LinkCard2Props) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const editModal = useDisclosure();
    const deleteModal = useDisclosure();
    const accountUser = userStore((state) => state.accountUser);

    const { title, url, thumbnail, likes, github, _id } = link;
    const isOtherProfile = accountUser?.username !== userProfileInfo.username;

    const isLiked = Object.keys(likes).find((id) => id === accountUser?._id);
    const likeCount = !likes ? 0 : Object.keys(likes).length;
    const userId = accountUser?._id;

    const toggleLikeMutation = useMutation({
        mutationFn: async () => {
            const response = await axios.put(
                `${API_URL}/links/like?linkId=${_id}`,
                { userId },
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
                "links",
                userProfileInfo._id,
            ]);
        },
    });

    const handleToggle = async () => {
        if (!(await isTokenAvailable())) {
            router.push("/login");
        } else {
            toggleLikeMutation.mutate();
        }
    };

    return (
        <>
            <div className="bg-black relative w-[18rem] max-w-[18rem] flex flex-grow flex-col items-center border border-[#FFFFFF31] hover:shadow-custom4 rounded-xl">
                {!isOtherProfile && (
                    <VStack
                        position="absolute"
                        top={-3}
                        right={-3}
                        zIndex={20}
                        gap={1}
                    >
                        <IconButton
                            size="xs"
                            rounded="full"
                            aria-label="Edit Link"
                            icon={<FiEdit />}
                            colorScheme="blackAlpha"
                            bg="blackAlpha.800"
                            onClick={editModal.onOpen}
                        />
                        <IconButton
                            size="xs"
                            rounded="full"
                            aria-label="Delete link"
                            icon={<FaTrash />}
                            colorScheme="blackAlpha"
                            bg="blackAlpha.800"
                            onClick={deleteModal.onOpen}
                        />
                    </VStack>
                )}

                <Link href={url} target="_blank" className="w-full ">
                    <Image
                        w="full"
                        h="120px"
                        objectFit="cover"
                        src={thumbnail.url}
                        roundedTop="xl"
                        fallbackSrc="https://via.placeholder.com/180"
                        alt="thumbnail"
                    />
                </Link>
                <div className="w-full flex items-center justify-between py-2 px-3 gap-1">
                    <div className="flex flex-col">
                        <h1 className="text-sm font-semibold">{title}</h1>
                        <Link
                            href={url}
                            target="_blank"
                            className="w-[11rem] text-[10px] text-gray-400 overflow-hidden whitespace-nowrap"
                        >
                            {url}
                        </Link>
                    </div>

                    <HStack>
                        <HStack>
                            {github && github.trim() !== "" && (
                                <Link href={github} target="_blank">
                                    <BsGithub className="cursor-pointer hover:text-blue-500" />
                                </Link>
                            )}

                            <Button
                                iconSpacing={1}
                                p={0}
                                bg="transparent"
                                colorScheme=""
                                size="xs"
                                leftIcon={
                                    isLiked ? (
                                        <AiFillHeart className="text-xl cursor-pointer text-red-700" />
                                    ) : (
                                        <AiOutlineHeart className="text-xl cursor-pointer " />
                                    )
                                }
                                onClick={handleToggle}
                                isLoading={toggleLikeMutation.isLoading}
                            >
                                <Text fontSize="sm">{likeCount}</Text>
                            </Button>
                        </HStack>
                    </HStack>
                </div>
            </div>

            <AlertDelete
                isOpen={deleteModal.isOpen}
                onClose={deleteModal.onClose}
                id={_id}
                accountUser={accountUser}
            />
            <EditLinkModal
                link={link}
                isOpen={editModal.isOpen}
                onClose={editModal.onClose}
                accountUser={accountUser}
            />
        </>
    );
};

export default LinkCard2;
