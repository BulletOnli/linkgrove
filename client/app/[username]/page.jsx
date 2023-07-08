"use client";
import {
    Button,
    FormControl,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Spacer,
    useDisclosure,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import LinksGrid from "../components/LinksGrid";
import ProfileInfo from "../components/ProfileInfo";
import Header from "../components/Header";
import NewLinkModal from "../components/modal/NewLinkModal";

const ProfilePage = ({ params }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isOtherProfile = params.username !== "gemmuel";

    return (
        <>
            <Header />
            <div className="relative w-full h-full flex p-4">
                <ProfileInfo params={params} />
                <div className="w-full flex flex-col gap-8 p-2">
                    <HStack w="full" px={6}>
                        <HStack>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                        <BsSearch />
                                    </InputLeftElement>
                                    <Input
                                        type="search"
                                        placeholder="Find a link"
                                        autoComplete="off"
                                    />
                                </InputGroup>
                            </FormControl>
                        </HStack>
                        <Spacer />
                        {!isOtherProfile && (
                            <Button colorScheme="teal" onClick={onOpen}>
                                Create new
                            </Button>
                        )}
                    </HStack>

                    <LinksGrid />
                </div>
            </div>

            <NewLinkModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default ProfilePage;
