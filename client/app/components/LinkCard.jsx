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
import { usePathname } from "next/navigation";
import AlertDelete from "./modal/AlertDelete";
import EditLinkModal from "./modal/EditLinkModal";

const LinkCard = () => {
    const editModal = useDisclosure();
    const deleteModal = useDisclosure();
    const pathname = usePathname();
    const isOtherProfile = pathname !== "/gemmuel";

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
                            onClick={editModal.onOpen}
                        />
                        <IconButton
                            size="xs"
                            rounded="full"
                            aria-label="Delete link"
                            icon={<FaTrash />}
                            colorScheme="blackAlpha"
                            onClick={deleteModal.onOpen}
                        />
                    </VStack>
                )}
                <Link
                    href="/kwadernote2.png"
                    target="_blank"
                    className="w-full cursor-zoom-in"
                >
                    <Image
                        w="full"
                        h="120px"
                        objectFit="cover"
                        src="/kwadernote2.png"
                        roundedTop="xl"
                        fallbackSrc="https://via.placeholder.com/180"
                    />
                </Link>
                <div className="w-full flex flex-col py-2 px-3">
                    <h1 className="text-sm font-semibold">
                        Student Management System
                    </h1>
                    <HStack mt={1}>
                        <Flex alignItems="center" gap={1}>
                            <AiOutlineHeart className="text-lg cursor-pointer " />
                            <Text fontSize="sm">12</Text>
                        </Flex>
                        <Spacer />
                        <HStack>
                            <Link href="#">
                                <BsGithub className=" cursor-pointer hover:text-blue-500" />
                            </Link>
                            <Link href="#">
                                <FiExternalLink className="text-lg cursor-pointer hover:text-blue-500" />
                            </Link>
                        </HStack>
                    </HStack>
                </div>
            </div>

            <AlertDelete
                isOpen={deleteModal.isOpen}
                onClose={deleteModal.onClose}
            />
            <EditLinkModal
                isOpen={editModal.isOpen}
                onClose={editModal.onClose}
            />
        </>
    );
};

export default LinkCard;
