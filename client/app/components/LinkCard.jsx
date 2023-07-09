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
import { AiOutlineHeart, AiOutlineLink } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";
import { FiExternalLink, FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import AlertDelete from "./modal/AlertDelete";
import EditLinkModal from "./modal/EditLinkModal";

const LinkCard = (props) => {
    const editModal = useDisclosure();
    const deleteModal = useDisclosure();
    const { title, url, thumbnail, likes, github, _id } = props.link;
    const isOtherProfile = props.isOtherProfile;

    return (
        <>
            <div className="relative w-[18rem] flex flex-col items-center bg-[#23232E] rounded-xl">
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
                    />
                </Link>
                <div className="w-full flex flex-col py-2 px-3">
                    <h1 className="text-sm font-semibold">{title}</h1>
                    <HStack mt={1}>
                        <Flex alignItems="center" gap={1}>
                            <AiOutlineHeart className="text-lg cursor-pointer " />
                            <Text fontSize="sm">{likes}</Text>
                        </Flex>
                        <Spacer />
                        <HStack>
                            <Link href={github || ""} target="_blank">
                                <BsGithub className=" cursor-pointer hover:text-blue-500" />
                            </Link>
                            <Link href={url || ""} target="_blank">
                                <FiExternalLink className="text-lg cursor-pointer hover:text-blue-500" />
                            </Link>
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
