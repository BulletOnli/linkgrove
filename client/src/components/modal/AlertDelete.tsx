"use client";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UserType } from "@/src/zustandStore/userStore";
import { API_URL } from "@/src/api/userApi";

type AlertDeleteProps = {
    isOpen: boolean;
    onClose: () => void;
    id: string;
    accountUser: UserType | null;
};

const AlertDelete = ({
    isOpen,
    onClose,
    id,
    accountUser,
}: AlertDeleteProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const cancelRef = useRef<HTMLButtonElement>(null);

    const deleteLinkMutation = useMutation({
        mutationFn: async () => {
            const response = await axios.delete(
                `${API_URL}/links/delete?id=${id}`,
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
                title: "Link Deleted!",
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

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent m={4}>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Link
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        Are you sure? You cant undo this action afterwards.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="red"
                            ml={3}
                            isLoading={deleteLinkMutation.isLoading}
                            spinnerPlacement="start"
                            onClick={() => deleteLinkMutation.mutate()}
                        >
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default AlertDelete;
