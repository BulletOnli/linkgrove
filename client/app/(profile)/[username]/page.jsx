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
    Image,
} from "@chakra-ui/react";
import useSWR from "swr";
import { BsSearch } from "react-icons/bs";
import ProfileInfo from "../../components/ProfileInfo";
import NewLinkModal from "../../components/modal/NewLinkModal";
import { getUserProfile } from "../../api/userApi";
import ErrorPage from "../../components/ErrorPage";
import LinkCard from "../../components/LinkCard";
import { useUserStore } from "../../zustandStore/userStore";

const ProfilePage = ({ params }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { accountUser, getAccountUser } = useUserStore();

    const { data, isLoading, error, mutate } = useSWR(
        `/users/user/${params.username}`,
        getUserProfile
    );

    const isOtherProfile = accountUser?.username !== data?.user?.username;
    if (error) return <ErrorPage />;

    return (
        <div className="w-full min-h-screen flex flex-col items-center">
            <Image
                w="full"
                src="/pc.png"
                h="15rem"
                objectFit="cover"
                fallbackSrc="https://via.placeholder.com/1400"
            />
            <div className="relative w-full h-full flex p-4">
                <ProfileInfo isOtherProfile={isOtherProfile} params={params} />

                <div className="flex flex-col gap-8 p-2">
                    <HStack w="full">
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
        </div>
    );
};

export default ProfilePage;
