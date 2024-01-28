import styled from 'styled-components'
import { IItemInventory } from '../../../models/IInventory';
import Avatar from '../../Avatar/Avatar';
import CircleButton from '../../Buttons/CircleButton';
import { useState } from 'react';
import { equipItem, removeItemFromInventory } from '../../../store/reducers/ActionCreators';
import { IFullItemWithCount } from '../../../models/IAreaItem';
import { useAppDispatch } from '../../../hooks/redux';
import Title from '../../Title/Title';


function InventoryItem({item, count}:IItemInventory) {

    const dispatch = useAppDispatch();

    const [isCanUse, setIsCanUse] = useState(item.type === 'food');
    const [isCanEquip, setIsCanEquip] = useState(item.type === 'armor' || item.type === 'weapon' || item.type === 'tool');
    const [isSelectToDelete, setIsSelectToDelete] = useState(false);
    const [rangeCount, setRangeCount] = useState(1);

    console.log(item.title, item.type, isCanEquip)

    const onClickCancelDelete = () => {
        setIsSelectToDelete(false);
        setRangeCount(1);
    }

    const onClickDeleteItem = (item: IFullItemWithCount) => {
        dispatch(removeItemFromInventory(item));
    }

    const onClickEquip = () => {
        dispatch(equipItem(item.id));
    }

    return ( 
        <Item $rare={item.rare} onMouseLeave={() => onClickCancelDelete()}>
            <Avatar $image={item.avatar} width={'100px'} height={'100%'}  />
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
                        && <Button>
                            Использовать
                        </Button>
                    }
                    {
                        isCanEquip && !isSelectToDelete
                        ? <Button onClick={() => onClickEquip()}>
                            Экипировать
                        </Button>
                        : null
                    }
                    <DeleteBlock>
                        <Button onClick={
                            isSelectToDelete
                                ? () => onClickDeleteItem({...item, count: rangeCount})
                                : () => setIsSelectToDelete(true)}>
                            {
                                isSelectToDelete
                                    ? '🗸'
                                    : 'Удалить'
                            }
                        </Button>

                        {
                            isSelectToDelete
                                ? <Button onClick={() => onClickCancelDelete()}>
                                    ✕
                                </Button>
                                : null
                        }
                        {
                            isSelectToDelete && count > 1
                                ? <RangeBlock>
                                    <CountRangeText>
                                        x{rangeCount}
                                    </CountRangeText>
                                    <CountRange
                                        type='range'
                                        min={1}
                                        max={count}
                                        value={rangeCount}
                                        onChange={e => setRangeCount(Number(e.currentTarget.value))} />
                                </RangeBlock>
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


const CountRangeText = styled.p`
    font-size: 1rem;
`

const RangeBlock = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 5px;
    box-shadow: 0 0 5px black;
    background-color: white;
    border-radius: 5px;
    width: 50%;

    @media (max-width: 1025px) {
        min-width: 100%;
    }
    @media (max-width: 376px) {
        min-width: 100%;
    }
`

const CountRange = styled.input`
    transition: 0.1s;
    accent-color: #4494df;
    align-items: center;
    z-index: 9;
    width: 100%;

    &::-webkit-slider-thumb{
        transform: translateY(-30%) scale(1.2);
        transition: 0.1s;
    }

    &::-webkit-slider-thumb:hover {
        transform: scale(1.5) translateY(-25%);
    }

    &::-webkit-slider-runnable-track{
        border-radius: 5px;
        background: gray;
        height: 5px;
    }

`

const Button = styled.div`
    cursor: pointer;
    box-shadow: 0 0 5px black;
    border-radius: 5px;
    background-color: white;
    padding: 10px;
    width: fit-content;
    font-size: 1rem;
    min-width: 2rem;
    min-height: 2rem;
    line-height: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    transition: .05s;

    &:hover{
        transform: scale(0.98);
        background-color: #e4e4e4;
    }
    
`

const ButtonsGroup = styled.div`
    display: flex;
    gap: 10px;
    height: 100%;
    flex-direction: column;
    width: fit-content;
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
    padding: 5px;
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