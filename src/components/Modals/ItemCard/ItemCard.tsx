import styled from 'styled-components';
import { Items } from '../../../data/ItemsData';
import { getItemBackground, getItemHoveredBackground } from '../../../styles/backgrounds';
import Avatar from '../../Avatar/Avatar';
import Title from '../../Title/Title';
import { palette } from '../../../styles/palette';
import CircleButton from '../../Buttons/CircleButton';
import { useAppDispatch } from '../../../hooks/redux';
import { removeItemTradingAC } from '../../../store/reducers/ActionCreators';

interface IItemCard {
    $isCurrentPlayerItem?: boolean;
    $documentId?: string;
    $isTrading?: boolean;
    id: string
    count: number;
    extraInfo?: string;
}

function ItemCard({ id, count, extraInfo, $documentId, $isTrading = false, $isCurrentPlayerItem = false }: IItemCard) {

    const dispatch = useAppDispatch();

    const item = Items.find(i => i.id === id)!;

    const onClickDelete = () => {
        dispatch(removeItemTradingAC($documentId!));
    }

    return (
        <Item
            color={getItemBackground(item.rare)}
            $hoveredColor={getItemHoveredBackground(item.rare)}>
            <ButtonOuter $isVisible={$isTrading && $isCurrentPlayerItem}>
                <CircleButton
                    symbol={palette.cancelMark}
                    click={() => onClickDelete()} />
            </ButtonOuter>
            <Avatar
                $image={item.avatar}
                width={'40%'} />
            <Info>
                <Title $size='1rem'>
                    {
                        item.title
                    }
                </Title>
                <Count>
                    x{count}
                </Count>
            </Info>
        </Item>
    );
}

interface IButtonOuter {
    $isVisible: boolean;
}

const ButtonOuter = styled.div<IButtonOuter>`
    position: absolute;
    padding: 15px;
    top: -10%;
    right: -10%;
    display: flex;
    transform: scale(0);
    
    transition: 0.2s;

    ${p => p.$isVisible ? 'display: block;' : 'display: hidden;'}
`

const Info = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: .1s;
`

const Count = styled.p`

`

interface IItemProps {
    color: string;
    $hoveredColor: string;
}

const Item = styled.div<IItemProps>`
    position: relative;
    width: auto;
    /* height: 10rem; */
    /* aspect-ratio: 1/1; */
    box-shadow: 0 0 5px black;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
    transition: .1s;

    background: ${p => p.color};

    &:hover{
        background: ${p => p.$hoveredColor};
    }

    &:hover ${ButtonOuter}{
        transform: scale(1);
    }

    /* @media (max-width: 426px) {
        width: 100%;
    } */

`

export default ItemCard;