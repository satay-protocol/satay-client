import { FaTwitter, FaTelegram, FaDiscord, FaMedium, FaBook } from 'react-icons/fa';

import { IconType } from "react-icons";

export interface SocialLink {
    name: string;
    href: string;
    icon: IconType;
}

export const socialLinks: SocialLink[] = [
    {
        name: 'Twitter',
        href: 'https://twitter.com/sataylabs',
        icon: FaTwitter,
    },
    {
        name: 'Discord',
        href: 'https://discord.com/invite/2GmvdXKBBD',
        icon: FaDiscord,
    },
    {
        name: 'Medium',
        href: 'https://medium.com/@sataylabs',
        icon: FaMedium,
    },
    {
        name: 'Docs',
        href: 'https://docs.satay.finance/overview/introduction',
        icon: FaBook,
    },
]        