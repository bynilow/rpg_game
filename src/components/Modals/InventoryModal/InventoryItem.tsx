import styled from 'styled-components'
import { IItemInventory } from '../../../models/IInventory';
import Avatar from '../../Avatar/Avatar';
import CircleButton from '../../Buttons/CircleButton';
import { useState } from 'react';
import { equipItem, removeItemFromInventory } from '../../../store/reducers/ActionCreators';
import { IFullItemWithCount } from '../../../models/IAreaItem';
import { useAppDispatch } from '../../../hooks/redux';
import Title from '../../Title/Title';
import SquareButton from '../../Buttons/SquareButton';

interface IInvItemProps {
    $onClickMultipleDelete: Function;
}

function InventoryItem({item, count, $onClickMultipleDelete}:IItemInventory & IInvItemProps) {

    const dispatch = useAppDispatch();

    const [isCanUse, setIsCanUse] = useState(item.type === 'food');
    const [isCanEquip, setIsCanEquip] = useState(item.type === 'armor' || item.type === 'weapon' || item.type === 'tool');
    const [isSelectToDelete, setIsSelectToDelete] = useState(false);
    const [rangeCount, setRangeCount] = useState(1);

    const onClickCancelDelete = () => {
        setIsSelectToDelete(false);
        setRangeCount(1);
    }

    const onClickDeleteItem = () => {
        if(isSelectToDelete){
            dispatch(removeItemFromInventory({...item, count: 1}));
        }
        else{
            if(count > 2){
                $onClickMultipleDelete({...item, count});
            }
            else{
                setIsSelectToDelete(true);
            }            
        }
    }


    const onClickEquip = () => {
        dispatch(equipItem(item.id));
    }

    return ( 
        <Item $rare={item.rare} onMouseLeave={() => onClickCancelDelete()}>
            <Avatar 
                key={""}
                $image={item.avatar} 
                width={'100px'} />
            <InfoButton>
                <CircleButton symbol='?' />
            </InfoButton>
            <Info>
                <Title $size='1.2rem'>
                    { item.title } x{count}
                </Title>
                <ButtonsGroup>
                    {
                        isCanUse
                        && <SquareButton
                            $fontSize='1rem'
                            $isSquare={false}
                            $onClick={() => {}} >
                            Использовать
                        </SquareButton>
                    }
                    {
                        isCanEquip && !isSelectToDelete
                        ? <SquareButton 
                            $fontSize='1rem'
                            $isSquare={false}
                            $onClick={() => onClickEquip()}>
                            Экипировать
                        </SquareButton>
                        : null
                    }
                    <DeleteBlock>
                        {
                            isSelectToDelete
                                ? <SquareButton
                                    $fontSize='1rem' 
                                    $onClick={onClickDeleteItem}>
                                    🗸
                                </SquareButton>
                                : <SquareButton
                                    $fontSize='1rem' 
                                    $isSquare={false}
                                    $onClick={onClickDeleteItem}>
                                    Удалить
                                </SquareButton>
                        }

                        {
                            isSelectToDelete
                                ? <SquareButton 
                                    $fontSize='1rem' 
                                    $onClick={() => onClickCancelDelete()}>
                                    ✕
                                </SquareButton>
                                : null
                        }
                    </DeleteBlock>
                </ButtonsGroup>
                <AboutItemBlock>
                    <Cost>
                        ${
                            item.cost
                        }
                    </Cost>
                    <Weight>
                        kg
                        {
                            ' ' + item.weight
                        }
                    </Weight>
                </AboutItemBlock>
                
            </Info>
        </Item>
     );
}

const InfoButton = styled.div`
    position: absolute;
    top: 0;
    right: -30%;

    transition: .3s;
`

const DeleteBlock = styled.div`
    z-index: 9;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
`

const ButtonsGroup = styled.div`
    display: flex;
    gap: 5px;
    height: 100%;
    flex-direction: column;
    transform: translateY(150%);
    
    transition: .3s;
    
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: 100%;
`

const AboutItemBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 5px;
    position: absolute;
    z-index: -1;
    margin: 5px;
    bottom: 0;
    right: 0;
`

const Weight = styled.p`
    color: black;
    background-color: #dddddd;
    border-radius: 5px;
    padding: 5px;
`

const Cost = styled.p`
    color: black;
    background-color: #dddddd;
    border-radius: 5px;
    padding: 5px;
`

interface IItemProps {
    $rare: string;
}

const Item = styled.div<IItemProps>`
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 1;
    box-shadow: 0 0 5px #0000005a;
    background: white;
    border-radius: 5px;
    height: 10rem;
    padding: 15px;
    overflow: hidden;
    width: 100%;
    flex: 30%;
    transition: 0.3s;

    background: ${props => 
        props.$rare === 'common' 
        ? "linear-gradient(135deg, white 80%, #a4a4ab 80%);"
        : props.$rare === 'uncommon'
        ? "linear-gradient(135deg, white 80%, #59c87f 80%);"
        : props.$rare === 'rare'
        ? "linear-gradient(135deg, white 80%, #4d69cd 80%);"
        : props.$rare === 'mythical'
        ? "linear-gradient(135deg, white 80%, #d42be6 80%);"
        : "linear-gradient(135deg, white 80%, #caab05 80%);"
    };

    &:hover{
        z-index: 9999;
        transform: scale(1.07);
        box-shadow: 0 0 5px 1px black;
    }

    &:hover ${InfoButton} {
        right: 0%;
    }

    &:hover ${ButtonsGroup} {
        transform: translateY(0%);
    }

    @media (max-width: 769px) {
        min-width: 40%;
    }
    @media (max-width: 426px) {
        min-width: 100%;
    }
`

export default InventoryItem;