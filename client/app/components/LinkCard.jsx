import {
    Image,
    HStack,
    Spacer,
    Text,
    Flex,
    IconButton,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart, AiOutlineLink } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";
import { FiExternalLink, FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import AlertDelete from "./modal/AlertDelete";
import EditLinkModal from "./modal/EditLinkModal";
import { putRequest } from "../api/fetcher";
import { useUserStore } from "../zustandStore/userStore";
import { redirect, useRouter } from "next/navigation";

const LinkCard = (props) => {
    const router = useRouter();
    const editModal = useDisclosure();
    const deleteModal = useDisclosure();
    const { title, url, thumbnail, likes, github, _id } = props.link;
    const isOtherProfile = props.isOtherProfile;

    const { accountUser } = useUserStore();

    const isLiked = Object.keys(likes).find((id) => id === accountUser?._id);
    const likeCount = !likes ? 0 : Object.keys(likes).length;
    const userId = accountUser?._id;

    const toggleLike = async () => {
        if (!localStorage.getItem("weblinksToken")) {
            return router.push("/login");
        }

        await putRequest(`/links/like?linkId=${_id}`, { userId });
        props.mutate();
    };

    return (
        <>
            <div className="bg-black relative w-[18rem] 2xl:w-[17rem] flex flex-col items-center border border-[#FFFFFF31] hover:shadow-custom4 rounded-xl">
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
                            className="w-[11rem] overflow-hidden whitespace-nowrap mt-[-2px]"
                        >
                            <small className="text-xs text-gray-400 ">
                                {url}
                            </small>
                        </Link>
                    </div>

                    <HStack>
                        <HStack>
                            {github && github.trim() !== "" && (
                                <Link href={github} target="_blank">
                                    <BsGithub className="cursor-pointer hover:text-blue-500" />
                                </Link>
                            )}
                            <Flex alignItems="center" gap={1}>
                                {isLiked ? (
                                    <AiFillHeart
                                        className="text-xl cursor-pointer text-red-700"
                                        onClick={toggleLike}
                                    />
                                ) : (
                                    <AiOutlineHeart
                                        className="text-xl cursor-pointer "
                                        onClick={toggleLike}
                                    />
                                )}
                                <Text fontSize="sm">{likeCount}</Text>
                            </Flex>
                        </HStack>
                    </HStack>
                </div>
            </div>

            <AlertDelete
                isOpen={deleteModal.isOpen}
                onClose={deleteModal.onClose}
                id={_id}
                mutate={props.mutate}
            />
            <EditLinkModal
                link={props.link}
                isOpen={editModal.isOpen}
                onClose={editModal.onClose}
                mutate={props.mutate}
            />
        </>
    );
};

export default LinkCard;
