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
import ProfileInfo from "../components/ProfileInfo";
import Header from "../components/Header";
import NewLinkModal from "../components/modal/NewLinkModal";
import useSWR from "swr";
import { getUserAccount, getUserProfile } from "../api/userApi";
import ErrorPage from "../components/ErrorPage";
import { useEffect, useState } from "react";
import LinkCard from "../components/LinkCard";
import { useUserStore } from "../store/userStore";

const ProfilePage = ({ params }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { accountUser, getAccountUser } = useUserStore();

    const { data, isLoading, error, mutate } = useSWR(
        `/users/${params.username}`,
        getUserProfile
    );

    const isOtherProfile = accountUser?.username !== data?.user?.username;

    if (error) return <ErrorPage />;

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
                                Add Link
                            </Button>
                        )}
                    </HStack>

                    <div className="w-full grid justify-items-center grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                        {isLoading ? "Loading Links..." : ""}
                        {data?.links?.map((link) => (
                            <LinkCard
                                link={link}
                                key={link._id}
                                isOtherProfile={isOtherProfile}
                                mutate={mutate}
                            />
                        ))}
                        {data?.links?.length <= 0
                            ? "User doesn't have any links yet"
                            : ""}
                    </div>
                </div>
            </div>

            <NewLinkModal isOpen={isOpen} onClose={onClose} mutate={mutate} />
        </>
    );
};

export default ProfilePage;
