import React from 'react';
import {getBlock} from "../../data/aaa";
import {Flex} from "@chakra-ui/react";
import BlockHeader from "./BlockHeader";
import BlockDepositWithdraw from "./BlockDepositWithdraw";
import Card from "../utilities/Card";
import BlockNotFound from "./BlockNotFound";


interface Props {
    blockName: string
}

const BlockComponent: React.FC<Props> = ({ blockName }) => {

    const block = getBlock(blockName);

    if(!block) {
        return (
            <BlockNotFound />
        )
    }

    return (
        <Flex
            flexDirection='column'
            gap={4}
            w='100%'
        >
            <BlockHeader
                title={block.title}
                description={block.description}
                protocols={block.protocols}
            />
            <Card>
                <BlockDepositWithdraw
                    block={block}
                />
            </Card>
        </Flex>
    );
};

export default BlockComponent;
