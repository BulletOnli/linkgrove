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
import { useState, ChangeEvent, FormEvent } from "react";
import { MdTitle, MdLink } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { LinkType } from "../LinkCard";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import userStore, { UserType } from "@/src/zustandStore/userStore";
import { API_URL } from "@/src/api/userApi";

type EditLinkType = {
    title: string;
    url: string;
    github: string;
    thumbnail: File;
};

type EditLinkModalProps = {
    link: LinkType;
    isOpen: boolean;
    onClose: () => void;
    accountUser: UserType | null;
};

const EditLinkModal = ({
    link,
    isOpen,
    onClose,
    accountUser,
}: EditLinkModalProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const [previewImage, setPreviewImage] = useState<ArrayBuffer | string>("");
    const { register, setValue, handleSubmit } = useForm<EditLinkType>();

    const handleImgUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result as string);
        };

        if (file) {
            reader.readAsDataURL(file);
            setValue("thumbnail", file);
        }
    };

    const newLinkMutation = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await axios.put(
                `${API_URL}/links/update?id=${link?._id}`,
                data,
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
            queryClient.invalidateQueries(["user", "links", accountUser?._id]);

            toast({
                title: "Link Updated",
                status: "success",
                isClosable: true,
                position: "bottom-left",
                duration: 3000,
            });
            onClose();
        },
        onError: () => {
            toast({
                title: "Oops! Something went wrong.",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        },
    });

    const handleModalClose = () => {
        setPreviewImage("");
        setValue("github", link.github);
        setValue("title", link.title);
        setValue("url", link.url);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleModalClose}>
            <form
                onSubmit={handleSubmit((data) => {
                    const formData = new FormData();
                    formData.set("title", data.title);
                    formData.set("url", data.url);
                    formData.set("github", data.github);
                    formData.set("thumbnail", data.thumbnail);

                    newLinkMutation.mutate(formData);
                })}
            >
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
                                src={
                                    previewImage.toString() ||
                                    link?.thumbnail.url
                                }
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
                                    variant="filled"
                                    bg="gray.700"
                                    _focus={{ bg: "gray.700" }}
                                    border="none"
                                    autoComplete="off"
                                    {...register("title")}
                                    defaultValue={link.title}
                                    _hover={{}}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <MdLink color="gray.300" />
                                </InputLeftElement>
                                <Input
                                    type="url"
                                    placeholder="Url"
                                    variant="filled"
                                    bg="gray.700"
                                    _focus={{ bg: "gray.700" }}
                                    border="none"
                                    autoComplete="off"
                                    {...register("url")}
                                    defaultValue={link.url}
                                    _hover={{}}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <FaGithub color="gray.300" />
                                </InputLeftElement>
                                <Input
                                    type="url"
                                    placeholder="Repository (optional)"
                                    variant="filled"
                                    bg="gray.700"
                                    _focus={{ bg: "gray.700" }}
                                    border="none"
                                    autoComplete="off"
                                    {...register("github")}
                                    defaultValue={link.github}
                                    _hover={{}}
                                />
                            </InputGroup>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={2} onClick={handleModalClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            colorScheme="teal"
                            isLoading={newLinkMutation.isLoading}
                            spinnerPlacement="start"
                        >
                            Save Changes
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    );
};

export default EditLinkModal;
