import styled from 'styled-components'
import Modal from '../Modal';
import EquipmentItem from './EquipmentItem';
import CircleButton from '../../Buttons/CircleButton';
import { useAppSelector } from '../../../hooks/redux';
import { useState } from 'react';
import { scrollBarX } from '../../../styles/scrollbars';

interface ISelectEquipmentModalProps {
    $closeModal: Function;
    $type: string;
}

function SelectEquipmentModal({$closeModal, $type}: ISelectEquipmentModalProps) {

    const {inventory} = useAppSelector(state => state.userReducer);

    return (  
        <Modal
            $zIndex={11}
            $size='small'
            $flexDirection='column'
            $justifyContent='center'
            $closeButtonFunction={() => $closeModal()}
            $isCloseButton >
            {
                inventory.find(i => i.item.type === $type || i.item.subType === $type)
                    ? null
                    : <NotFoundText>
                        Пусто...
                    </NotFoundText>
            }
            <List>

                {
                    inventory.filter(i => i.item.type === $type || i.item.subType === $type)
                        .map(i =>
                            <EquipmentItem
                                key={i.item.id}
                                $item={i.item}
                                $isEquipped={!!i.isEquipped} />)
                }
                
                
            </List>
        </Modal>
    );
}

const NotFoundText = styled.p`
    font-size: 1.5rem;
    text-align: center;
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 10px;
    width: 100%;
    height: 100%;
    overflow-y: auto;

    ${scrollBarX}
`

export default SelectEquipmentModal;