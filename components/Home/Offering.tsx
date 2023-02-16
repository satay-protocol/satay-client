import React from 'react'

import { Box, Button, Icon, Text, VStack } from '@chakra-ui/react'

import Card from '../utilities/Card'

import { OfferingType } from './offeringsData'
import Link from 'next/link'

interface Props {
    offering: OfferingType
}

const Offering: React.FC<Props> = ({ offering }) => {
  return (
    <Card
        gap={4}
        alignItems='center'
    >
        <Box
            borderRadius='full'
            boxSize={16}
            display='flex'
            alignItems='center'
            justifyContent='center'
            shadow='lg'
        >
            <Icon 
                as={offering.icon}
                boxSize={12}
                color='brand.500'
            />
        </Box>
        <VStack>
            <Text
                fontSize='xl'
                fontWeight='bold'
                textAlign='center'
            >
                {offering.title}
            </Text>
            <Text
                textAlign='center'
            >
                {offering.description}
            </Text>
        </VStack>
        <Link
            href={offering.route}
        >
            <Button 
                colorScheme='brand'
                variant='outline'
            >
                See More
            </Button>
        </Link>
    </Card>
  )
}

export default Offering