import { Button } from "@chakra-ui/react";
import Link from "next/link";
import {
    FaTiktok,
    FaInstagram,
    FaGithub,
    FaFacebook,
    FaDiscord,
    FaTwitter,
    FaTelegramPlane,
    FaReddit,
    FaYoutube,
} from "react-icons/fa";

export type SocialsType = {
    creator: string;
    discord: string;
    facebook: string;
    github: string;
    instagram: string;
    reddit: string;
    telegram: string;
    tiktok: string;
    twitter: string;
    youtube: string;
    _id: string;
};

const SocialsGrid = ({ socials }: { socials: SocialsType }) => {
    return (
        <div className="grid grid-cols-3 justify-items-center gap-4 2xl:px-0 mt-4 lg:mt-5">
            <Button
                as={Link}
                href={`${socials?.facebook}`}
                target="_blank"
                w="full"
                size="xs"
                colorScheme="facebook"
                leftIcon={<FaFacebook />}
                isDisabled={!socials?.facebook}
            >
                Facebook
            </Button>
            <Button
                as={Link}
                href={`${socials?.instagram}`}
                target="_blank"
                w="full"
                size="xs"
                colorScheme="pink"
                leftIcon={<FaInstagram />}
                isDisabled={!socials?.instagram}
            >
                Instagram
            </Button>
            <Button
                as={Link}
                href={`${socials?.twitter}`}
                target="_blank"
                w="full"
                size="xs"
                colorScheme="twitter"
                leftIcon={<FaTwitter />}
                isDisabled={!socials?.twitter}
            >
                Twitter
            </Button>

            <Button
                as={Link}
                href={`${socials?.discord}`}
                target="_blank"
                w="full"
                size="xs"
                colorScheme="blue"
                leftIcon={<FaDiscord />}
                isDisabled={!socials?.discord}
            >
                Discord
            </Button>
            <Button
                as={Link}
                href={`${socials?.reddit}`}
                target="_blank"
                w="full"
                size="xs"
                colorScheme="orange"
                leftIcon={<FaReddit />}
                isDisabled={!socials?.reddit}
            >
                Reddit
            </Button>
            <Button
                as={Link}
                href={`${socials?.telegram}`}
                target="_blank"
                w="full"
                size="xs"
                colorScheme="telegram"
                leftIcon={<FaTelegramPlane />}
                isDisabled={!socials?.telegram}
            >
                Telegram
            </Button>

            <Button
                as={Link}
                href={`${socials?.tiktok}`}
                target="_blank"
                w="full"
                size="xs"
                colorScheme=""
                bg="gray.800"
                leftIcon={<FaTiktok />}
                isDisabled={!socials?.tiktok}
            >
                Tiktok
            </Button>
            <Button
                as={Link}
                href={`${socials?.youtube}`}
                target="_blank"
                w="full"
                size="xs"
                colorScheme="red"
                leftIcon={<FaYoutube />}
                isDisabled={!socials?.youtube}
            >
                Youtube
            </Button>
            <Button
                as={Link}
                href={`${socials?.github}`}
                target="_blank"
                w="full"
                size="xs"
                colorScheme=""
                bg="#0D1117"
                leftIcon={<FaGithub />}
                isDisabled={!socials?.github}
            >
                Github
            </Button>
        </div>
    );
};

export default SocialsGrid;
