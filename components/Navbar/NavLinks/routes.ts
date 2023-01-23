import { AiOutlineSwap } from "react-icons/ai";
import { CiVault } from "react-icons/ci";
import { TbBuildingBridge } from "react-icons/tb";
import { BiCodeBlock } from "react-icons/bi";

import { IconType } from "react-icons";

export interface Route {
    name: string;
    href: string;
    icon: IconType
}

export const routes: Route[] = [
    { 
        name: 'Vaults', 
        href: '/vaults',
        icon: CiVault
    },
    {
        name: 'Blocks',
        href: '/blocks',
        icon: BiCodeBlock
    },
    { 
        name: 'Products', 
        href: '/products',
        icon: AiOutlineSwap
    },
    {
        name: 'Bridge',
        href: '/bridge',
        icon: TbBuildingBridge
    }
];