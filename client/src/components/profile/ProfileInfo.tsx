"use client";
import {
    Avatar,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    VStack,
} from "@chakra-ui/react";
import SocialsGrid, { SocialsType } from "./SocialsGrid";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import { UserType } from "@/src/zustandStore/userStore";
import { useQueryClient } from "@tanstack/react-query";

type ProfileInfoProps = {
    userData: UserType;
    params: string;
    isOtherProfile: boolean;
    socials: SocialsType;
};

const ProfileInfo = ({
    userData,
    params,
    isOtherProfile,
    socials,
}: ProfileInfoProps) => {
    const queryClient = useQueryClient();
    let username = params;
    if (username.includes("%20")) {
        username = params.replace(/%20/g, " ");
    }

    const userDataStatus = queryClient.getQueryState([
        "user",
        "profile",
        username,
    ])?.status;

    return (
        <div className="xl:sticky xl:top-[10rem] w-full md:w-[30rem] lg:h-[35rem] flex flex-col items-center">
            <Avatar
                name={userData?.username}
                src={userData?.profilePic?.url}
                size="2xl"
                mt="-4rem"
            />
            <h1 className="relative mt-5 text-2xl font-bold">
                {userDataStatus === "loading" ? (
                    <VStack>
                        <Skeleton
                            startColor="#000000"
                            width={"200px"}
                            height="15px"
                        />
                        <Skeleton
                            startColor="#000000"
                            width={"100px"}
                            height="12px"
                            mt={"6px"}
                        />
                    </VStack>
                ) : (
                    userData?.username
                )}
                {!isOtherProfile && (
                    <Link
                        href="/edit-profile"
                        className="absolute -right-10 -top-3"
                    >
                        <FiEdit size={18} />
                    </Link>
                )}
            </h1>
            <p className="w-[70%] text-sm text-center mt-2 text-gray-300">
                {userData?.bio}
            </p>

            <SocialsGrid socials={socials} />
        </div>
    );
};

export default ProfileInfo;
