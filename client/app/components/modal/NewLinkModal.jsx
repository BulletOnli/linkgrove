"use client";
import {
    Avatar,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast,
    Flex,
    FormControl,
    Image,
    HStack,
    VStack,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdTitle, MdLink } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { postRequest } from "@/app/api/fetcher";

const NewLinkModal = ({ isOpen, onClose, mutate }) => {
    const toast = useToast();
    const [previewImage, setPreviewImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleImgUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        try {
            setIsLoading(true);
            await postRequest("/links/create", data);
            mutate();
            setIsLoading(false);
            toast({
                title: "New link created!",
                status: "success",
                isClosable: true,
                position: "bottom-left",
                duration: 3000,
            });
            onClose();
            setPreviewImage("");
        } catch (error) {
            setIsLoading(false);
            toast({
                title: "Oops! Something went wrong.",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                onClose();
                setPreviewImage("");
            }}
        >
            <FormControl as="form" onSubmit={handleSubmit}>
                <ModalOverlay />
                <ModalContent color="white" bg="#23232E">
                    <ModalHeader>Create new link</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack>
                            <Image
                                w="full"
                                h="12rem"
                                objectFit="cover"
                                rounded="lg"
                                src={previewImage}
                                fallbackSrc="https://via.placeholder.com/400"
                                alt="Thumbnail preview"
                            />
                            <Button size="sm" w="full" colorScheme="teal">
                                <label
                                    htmlFor="thumbnail-upload"
                                    className="w-full"
                                >
                                    Upload Thumbnail
                                </label>
                                <input
                                    onChange={handleImgUpload}
                                    type="file"
                                    accept="image/*"
                                    id="thumbnail-upload"
                                    className="hidden"
                                    name="thumbnail"
                                    required
                                />
                            </Button>
                        </VStack>
                        <VStack mt={4}>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <MdTitle color="gray.300" />
                                </InputLeftElement>
                                <Input
                                    type="text"
                                    placeholder="Title"
                                    name="title"
                                    variant="filled"
                                    bg="gray.700"
                                    _focus={{ bg: "gray.700" }}
                                    border="none"
                                    _hover={false}
                                    autoComplete="off"
                                    required
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <MdLink color="gray.300" />
                                </InputLeftElement>
                                <Input
                                    type="url"
                                    placeholder="Url"
                                    name="url"
                                    variant="filled"
                                    bg="gray.700"
                                    _focus={{ bg: "gray.700" }}
                                    border="none"
                                    _hover={false}
                                    autoComplete="off"
                                    required
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <FaGithub color="gray.300" />
                                </InputLeftElement>
                                <Input
                                    type="url"
                                    placeholder="Repository (Optional)"
                                    name="github"
                                    variant="filled"
                                    bg="gray.700"
                                    _focus={{ bg: "gray.700" }}
                                    border="none"
                                    _hover={false}
                                    autoComplete="off"
                                />
                            </InputGroup>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            isDisabled={!previewImage}
                            type="submit"
                            colorScheme="teal"
                            isLoading={isLoading}
                            spinnerPlacement="start"
                        >
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </FormControl>
        </Modal>
    );
};

export default NewLinkModal;
