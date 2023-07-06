import { SimpleGrid } from "@chakra-ui/react";
import LinkCard from "./LinkCard";

const LinksGrid = () => {
    return (
        <div className="w-full text-gray-200 grid justify-items-center grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            <LinkCard />
            <LinkCard />
            <LinkCard />
            <LinkCard />
            <LinkCard />
            <LinkCard />
            <LinkCard />
            <LinkCard />
            <LinkCard />
            <LinkCard />
            <LinkCard />
            <LinkCard />
        </div>
    );
};

export default LinksGrid;
