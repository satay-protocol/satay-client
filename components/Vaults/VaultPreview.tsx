import React from 'react'

import { 
    HStack, 
    Image, 
    Text 
} from '@chakra-ui/react'

import { VaultPreview } from '../../types/vaults'
import Link from 'next/link'

interface Props {
    vault: VaultPreview
}

const keys = [
    'asset',
    'apy',
    'totalAssets'
] as Array<keyof VaultPreview>

const VaultPreview : React.FC<Props> = ({ vault }) => {
    return (
        <Link
            href={`/vaults/${vault.id}`}
        >
            <HStack
                width='100%'
                borderBottomWidth='1px'
                py={4}
                px={2}
                borderRadius={8}
                _hover={{
                    bg: 'gray.100'
                }}
            >
                <HStack
                    flex={1}
                >
                    <Image
                        src={vault.logo}
                        height='40px'
                        width='40px'
                        rounded='full'
                    />
                    <Text
                        flex={1}
                    >
                        {vault.asset}
                    </Text>
                </HStack>
                <Text
                    flex={1}
                >
                    {vault.apy}%
                </Text>
                <Text
                    flex={1}
                >
                    ${vault.totalAssets.toLocaleString()}
                </Text>
            </HStack>
        </Link>
    )
}

export default VaultPreview