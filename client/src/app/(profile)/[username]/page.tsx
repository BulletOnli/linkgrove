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
import ProfileInfo from "@/src/components/profile/ProfileInfo";
import NewLinkModal from "@/src/components/modal/NewLinkModal";
import ErrorPage from "@/src/components/ErrorPage";
import { getRequest } from "@/src/api/fetcher";
import LinkCard, { LinkType } from "@/src/components/LinkCard";
import { useParams } from "next/navigation";
import userStore from "@/src/zustandStore/userStore";

const ProfilePage = () => {
    const params = useParams().username;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { accountUser, getAccountUser } = userStore();

    // user profile
    const { data, isLoading, error, mutate } = useSWR(
        `/users/user/${params}`,
        getRequest
    );

    const isOtherProfile = accountUser?.username !== data?.user?.username;

    if (error) return <ErrorPage />;

    return (
        <div className="w-full min-h-screen flex flex-col items-center">
            <Image
                w="full"
                src="/pc.webp"
                h={{ sm: "10rem", lg: "15rem" }}
                objectFit="cover"
                fallbackSrc="https://via.placeholder.com/1400"
                alt="Banner"
            />
            <div className="relative w-full h-full flex flex-col items-center lg:flex-row lg:items-start p-4 gap-4 lg:gap-0">
                <ProfileInfo
                    userData={data?.user}
                    isOtherProfile={isOtherProfile}
                    params={params}
                    socials={data?.socials}
                />

                <div className="w-full flex flex-col p-4">
                    <HStack w="full" mb={6}>
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

                    <div className="w-full grid justify-items-center justify-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-8">
                        {isLoading ? "Loading Links..." : ""}

                        {data?.links?.map((link: LinkType) => (
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
