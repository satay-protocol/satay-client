import React from 'react'

import { 
    HStack,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Button,
    Text
 } from '@chakra-ui/react'
import useUpdateDebtRatio from '../../hooks/manager/useUpdateDebtRatio'

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
    <HStack
        flex={1}
        spacing={4}
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
        >
            Update
        </Button>
    </HStack>
  )
}

export default DebtRatioSlider