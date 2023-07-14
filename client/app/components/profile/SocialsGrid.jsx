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

const SocialsGrid = ({ socials }) => {
    return (
        <div className="grid grid-cols-3 justify-items-center gap-4 px-4 2xl:px-0 mt-10">
            <Button
                as={socials?.facebook ? Link : ""}
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
                as={socials?.instagram ? Link : ""}
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
                as={socials?.twitter ? Link : ""}
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
                as={socials?.discord ? Link : ""}
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
                as={socials?.reddit ? Link : ""}
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
                as={socials?.telegram ? Link : ""}
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
                as={socials?.tiktok ? Link : ""}
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
                as={socials?.youtube ? Link : ""}
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
                as={socials?.github ? Link : ""}
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
