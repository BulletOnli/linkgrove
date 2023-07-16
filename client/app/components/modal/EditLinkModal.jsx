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
import { putRequest } from "@/app/api/fetcher";

const EditLinkModal = ({ link, isOpen, onClose, mutate }) => {
    const toast = useToast();
    const [previewImage, setPreviewImage] = useState("");
    const [isLoadingChanges, setIsLoadingChanges] = useState(false);
    const [isSomethingChanged, setIsSomethingChanged] = useState(false);

    // Set default value of inputs
    const [title, setTitle] = useState(link?.title);
    const [url, setUrl] = useState(link?.url);
    const [github, setGithub] = useState(link?.github);

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
            setIsLoadingChanges(true);
            await putRequest(`/links/update?id=${link?._id}`, formData);
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
            setIsSomethingChanged(false);
        } catch (error) {
            console.log(error);
            setIsLoadingChanges(false);
            toast({
                title: `Oops! ${error.response.data.error.message}`,
                status: "error",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        }
    };

    const handleClose = () => {
        setPreviewImage("");
        setTitle(link?.title);
        setUrl(link?.url);
        setGithub(link?.github);
        setIsSomethingChanged(false);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <FormControl as="form" onSubmit={handleSubmit}>
                <ModalOverlay />
                <ModalContent color="white" bg="#23232E" m={4}>
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
                                alt="thumbnail"
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
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                        setIsSomethingChanged(true);
                                    }}
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
                                    value={url}
                                    onChange={(e) => {
                                        setUrl(e.target.value);
                                        setIsSomethingChanged(true);
                                    }}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <FaGithub color="gray.300" />
                                </InputLeftElement>
                                <Input
                                    type="url"
                                    placeholder="Repository (optional)"
                                    name="github"
                                    variant="filled"
                                    bg="gray.700"
                                    _focus={{ bg: "gray.700" }}
                                    border="none"
                                    _hover={false}
                                    autoComplete="off"
                                    value={github}
                                    onChange={(e) => {
                                        setGithub(e.target.value);
                                        setIsSomethingChanged(true);
                                    }}
                                />
                            </InputGroup>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={2} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            isDisabled={!isSomethingChanged}
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
