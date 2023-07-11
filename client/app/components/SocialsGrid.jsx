import { Avatar, Button, HStack, Image } from "@chakra-ui/react";
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

const SocialsGrid = () => {
    const disableButton = false;

    return (
        <div className="grid grid-cols-3 justify-items-center gap-4 px-4 2xl:px-0 mt-10">
            <Button
                w="full"
                size="xs"
                colorScheme="facebook"
                leftIcon={<FaFacebook />}
            >
                Facebook
            </Button>
            <Button
                w="full"
                size="xs"
                colorScheme="pink"
                leftIcon={<FaInstagram />}
                isDisabled={disableButton}
            >
                Instagram
            </Button>
            <Button
                w="full"
                size="xs"
                colorScheme="twitter"
                leftIcon={<FaTwitter />}
                isDisabled={disableButton}
            >
                Twitter
            </Button>

            <Button
                w="full"
                size="xs"
                colorScheme="blue"
                leftIcon={<FaDiscord />}
                isDisabled={disableButton}
            >
                Discord
            </Button>
            <Button
                w="full"
                size="xs"
                colorScheme="orange"
                leftIcon={<FaReddit />}
                isDisabled={disableButton}
            >
                Reddit
            </Button>
            <Button
                w="full"
                size="xs"
                colorScheme="telegram"
                leftIcon={<FaTelegramPlane />}
                isDisabled={disableButton}
            >
                Telegram
            </Button>

            <Button
                w="full"
                size="xs"
                colorScheme=""
                bg="gray.800"
                leftIcon={<FaTiktok />}
                isDisabled={disableButton}
            >
                Tiktok
            </Button>
            <Button
                w="full"
                size="xs"
                colorScheme="red"
                leftIcon={<FaYoutube />}
                isDisabled={disableButton}
            >
                Youtube
            </Button>
            <Button
                w="full"
                size="xs"
                colorScheme=""
                bg="#0D1117"
                leftIcon={<FaGithub />}
                isDisabled={disableButton}
            >
                Github
            </Button>
        </div>
    );
};

export default SocialsGrid;
