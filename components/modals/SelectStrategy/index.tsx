import React from 'react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from '@chakra-ui/react'
import { strategies } from '../../../data/strategies';
import StrategyOption from './StrategyOption';


interface Props {
    isOpen: boolean;
    onClose: () => void;
    baseCoin: string;
    approveStrategy: (strategyType: string) => Promise<void> 
}

const SelectStrategy : React.FC<Props> = ({ isOpen, onClose, baseCoin, approveStrategy }) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Strategy</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
                strategies.filter(strategy => strategy.baseCoin === baseCoin).map(strategy => (
                  <StrategyOption
                    key={strategy.strategyId}
                    strategy={strategy}
                    approveStrategy={approveStrategy}
                  />
                ))
            }
          </ModalBody>

          <ModalFooter>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default SelectStrategy