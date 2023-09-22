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
import { BsSearch } from "react-icons/bs";
import ProfileInfo from "@/src/components/profile/ProfileInfo";
import NewLinkModal from "@/src/components/modal/NewLinkModal";
import ErrorPage from "@/src/components/ErrorPage";
import LinkCard, { LinkType } from "@/src/components/LinkCard";
import { useParams } from "next/navigation";
import userStore from "@/src/zustandStore/userStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@/src/api/userApi";
import Loading from "../../loading";

const ProfilePage = () => {
    const params = useParams().username;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const accountUser = userStore((state) => state.accountUser);
    const getAccountUser = userStore((state) => state.getAccountUser);

    // contains user info and social media links
    const userProfileQuery = useQuery({
        queryKey: ["user", "profile", params],
        queryFn: async () => {
            const response = await axios.get(
                `${API_URL}/users/user/${params}`,
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
    });

    const userLinksQuery = useQuery({
        queryKey: ["user", "links", userProfileQuery.data?.user._id],
        queryFn: async () => {
            const response = await axios.get(
                `${API_URL}/links/all?userId=${userProfileQuery.data?.user._id}`,
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
        enabled: userProfileQuery.data != null,
    });

    const isOtherProfile =
        accountUser?.username !== userProfileQuery.data?.user?.username;

    if (userProfileQuery.isLoading) return <Loading />;
    if (userProfileQuery.error) return <ErrorPage />;

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
                    userData={userProfileQuery.data?.user}
                    isOtherProfile={isOtherProfile}
                    params={params}
                    socials={userProfileQuery.data?.socials}
                />

                <div className="w-full flex flex-col mt-6 lg:mt-0 lg:p-4">
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
                                        isDisabled
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
                        {userLinksQuery.isLoading ? "Loading Links..." : ""}

                        {userLinksQuery.data?.map((link: LinkType) => (
                            <LinkCard
                                link={link}
                                key={link._id}
                                userProfileInfo={userProfileQuery.data?.user}
                            />
                        ))}

                        {userLinksQuery.data?.length <= 0
                            ? "User doesn't have any links yet"
                            : ""}
                    </div>
                </div>
            </div>

            <NewLinkModal
                isOpen={isOpen}
                onClose={onClose}
                accountUser={accountUser}
            />
        </div>
    );
};

export default ProfilePage;
