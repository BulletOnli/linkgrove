import { Avatar, Button, HStack, IconButton, Image } from "@chakra-ui/react";
import { useUserStore } from "../zustandStore/userStore";
import { useEffect } from "react";
import SocialsGrid from "./SocialsGrid";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";

const ProfileInfo = ({ params, isOtherProfile }) => {
    const { accountUser, getAccountUser } = useUserStore();

    let username = params.username;
    if (username.includes("%20")) {
        username = params.username.replace(/%20/g, " ");
    }

    useEffect(() => {
        getAccountUser();
    }, []);

    return (
        <div className="sticky top-[10rem] w-[35rem] flex flex-col items-center">
            <Avatar
                name={accountUser?.username}
                src={accountUser?.profilePic?.url}
                size="2xl"
                mt="-4rem"
            />
            <h1 className="relative mt-5 text-2xl font-bold">
                {username}
                {!isOtherProfile && (
                    <Link
                        href="/edit-profile"
                        className="absolute -right-10 -top-3"
                    >
                        <FiEdit size={18} />
                    </Link>
                )}
            </h1>
            <p className="text-sm mt-2 text-gray-300">{accountUser?.bio}</p>

            <SocialsGrid />
        </div>
    );
};

export default ProfileInfo;
