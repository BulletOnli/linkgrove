import { Image } from "@chakra-ui/react";
import React from "react";

const Header = () => {
    return (
        <Image
            src="/pc.png"
            h="15rem"
            objectFit="cover"
            fallbackSrc="https://via.placeholder.com/1400"
        />
    );
};

export default Header;
