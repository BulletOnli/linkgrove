"use client";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast,
    FormControl,
    Image,
    VStack,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdTitle, MdLink } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { updateLink } from "@/app/api/linkApi";

const EditLinkModal = ({ link, isOpen, onClose, mutate }) => {
    const toast = useToast();
    const [previewImage, setPreviewImage] = useState("");
    const [isLoadingChanges, setIsLoadingChanges] = useState(false);

    // Set default value of inputs
    const [title, setTitle] = useState(link?.title);
    const [url, setUrl] = useState(link?.url);
    const [github, setGithub] = useState(link?.github);

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
        const formData = new FormData(e.target);
        try {
            setIsLoadingChanges(true);
            await updateLink(`/links/${link?._id}`, formData);
            mutate();
            setIsLoadingChanges(false);
            toast({
                title: "Link Updated",
                status: "success",
                isClosable: true,
                position: "bottom-left",
                duration: 3000,
            });
            onClose();
            setPreviewImage("");
        } catch (error) {
            setIsLoadingChanges(false);
            console.log(error);
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
        <Modal isOpen={isOpen} onClose={onClose}>
            <FormControl as="form" onSubmit={handleSubmit}>
                <ModalOverlay />
                <ModalContent color="white" bg="#23232E">
                    <ModalHeader>Edit Link</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack>
                            <Image
                                w="full"
                                h="12rem"
                                objectFit="cover"
                                rounded="lg"
                                src={previewImage || link?.thumbnail.url}
                                fallbackSrc="https://via.placeholder.com/400"
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
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <MdLink color="gray.300" />
                                </InputLeftElement>
                                <Input
                                    type="text"
                                    placeholder="Url"
                                    name="url"
                                    variant="filled"
                                    bg="gray.700"
                                    _focus={{ bg: "gray.700" }}
                                    border="none"
                                    _hover={false}
                                    autoComplete="off"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <FaGithub color="gray.300" />
                                </InputLeftElement>
                                <Input
                                    type="text"
                                    placeholder="Source Code"
                                    name="github"
                                    variant="filled"
                                    bg="gray.700"
                                    _focus={{ bg: "gray.700" }}
                                    border="none"
                                    _hover={false}
                                    autoComplete="off"
                                    value={github}
                                    onChange={(e) => setGithub(e.target.value)}
                                />
                            </InputGroup>
                        </VStack>
                    </ModalBody>

                    <ModalFooter mt={2}>
                        <Button mr={2} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            colorScheme="teal"
                            isLoading={isLoadingChanges}
                            spinnerPlacement="start"
                        >
                            Save Changes
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </FormControl>
        </Modal>
    );
};

export default EditLinkModal;
