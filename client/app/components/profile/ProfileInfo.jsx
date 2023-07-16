import { Avatar } from "@chakra-ui/react";
import SocialsGrid from "./SocialsGrid";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";

const ProfileInfo = ({ userData, params, isOtherProfile, socials }) => {
    let username = params.username;
    if (username.includes("%20")) {
        username = params.username.replace(/%20/g, " ");
    }

    return (
        <div className="xl:sticky xl:top-[10rem] w-full lg:w-[30%] flex flex-col items-center">
            <Avatar
                name={userData?.username}
                src={userData?.profilePic?.url}
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
            <p className="w-[70%] text-sm text-center mt-2 text-gray-300">
                {userData?.bio}
            </p>

            <SocialsGrid socials={socials} />
        </div>
    );
};

export default ProfileInfo;
