import React from 'react'

import { 
    HStack,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Button,
    Text,
    Flex
 } from '@chakra-ui/react'

 import AccentedBox from '../../utilities/AccentedBox';

import useUpdateDebtRatio from '../../../hooks/vaultManager/useUpdateDebtRatio';

 interface Props {
    vaultId: string,
    strategyModule: string,
    currentDebtRatio: number,
 }

const DebtRatioSlider : React.FC<Props> = ({ vaultId, strategyModule, currentDebtRatio }) => {

    const {
        debtRatio,
        updateDebtRatio,
        onDebtRatioChange
    } = useUpdateDebtRatio(
        vaultId,
        strategyModule,
        currentDebtRatio
    );

  return (
    <Flex
        flex={1}
        alignItems="center"
        gap={4}
    >
        <Slider 
            aria-label={`${strategyModule}-${vaultId}-debt-ratio-slider`}
            value={debtRatio}
            onChange={onDebtRatioChange}
            colorScheme="brand"
        >
            <SliderTrack>
                <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
        </Slider>
        <Text>
            {debtRatio}%
        </Text>
        <Button
            onClick={updateDebtRatio}
            variant='ghost'
        >
            Update
        </Button>
    </Flex>
    
  )
}

export default DebtRatioSlider