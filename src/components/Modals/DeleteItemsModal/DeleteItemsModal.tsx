import { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IFullItemWithCount } from '../../../models/IAreaItem';
import { removeItemsFromInventory } from '../../../store/reducers/ActionCreators';
import { scrollBarX } from '../../../styles/scrollbars';
import SquareButton from '../../Buttons/SquareButton';
import Range from '../../Range/Range';
import Title from '../../Title/Title';
import Modal from '../Modal';

interface IDeleteItemsModal {
    $item: IFullItemWithCount
    $closeModal: Function;
    $itemTitle: string;
    $min: number;
    $max: number;
}

function DeleteItemsModal({$closeModal, $itemTitle, $min, $max, $item}: IDeleteItemsModal) {

    const {inventory} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    const [count, setCount] = useState($min);

    const onClickDeleteItem = () => {
        dispatch(removeItemsFromInventory([{...$item, count}]));
        $closeModal();
    }

    return (  
        <Modal
            $zIndex={9999}
            $size='small'
            $flexDirection='column'
            $justifyContent='center'
            $isEnableAnims={false}
            $closeButtonFunction={() => $closeModal()}
            $isCloseButton >
            <ModalInner>
                <Title>
                    Удаление
                </Title>
                <Title $size='2rem'>
                    {$itemTitle} <Count>
                        x{count}
                    </Count>
                </Title>
                <Range $min={$min} $max={$max} $onChange={(count: number) => setCount(count)} />
                <SquareButton 
                    $fontSize='3rem'
                    $onClick={() => onClickDeleteItem()} >
                    🗸
                </SquareButton>
            </ModalInner>
        </Modal>
    );
}

const Count = styled.span`
    
`

const ModalInner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    height: 100%;
`

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

export default DeleteItemsModal;