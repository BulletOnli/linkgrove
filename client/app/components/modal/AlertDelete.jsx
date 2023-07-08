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

const AlertDelete = ({ isOpen, onClose }) => {
    const toast = useToast();
    const cancelRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post(
            //     "http://localhost:8080/user/profile/upload",
            //     data,
            //     {
            //         headers: {
            //             Authorization: `Bearer ${localStorage.getItem(
            //                 "vibelyToken"
            //             )}`,
            //         },
            //     }
            // );
            toast({
                title: "Link Deleted!",
                status: "success",
                isClosable: true,
                position: "bottom-left",
                duration: 3000,
            });
            onClose();
        } catch (error) {
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
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Link
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={handleSubmit} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default AlertDelete;
