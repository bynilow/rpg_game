import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../../hooks/redux';
import { IChangeInfo } from '../../../models/IArea';
import { IFullItem } from '../../../models/IAreaItem';
import { getItemBackground, getItemHoveredBackground } from '../../../styles/backgrounds';
import Avatar from '../../Avatar/Avatar';
import CircleButton from '../../Buttons/CircleButton';
import SquareButton from '../../Buttons/SquareButton';
import Title from '../../Title/Title';

interface IShopSellItemProps {
    $fullItem: IFullItem;
    $index: number;
    $isSelected: boolean;
    $setSelectedId: Function;
    $clearSelectedId: Function;
    $openInfoModal: (info: IChangeInfo) => void;
    $onClickSellItem: Function;
    $count: number;
    $cost: number;
}

function ShopSellItem({ 
    $fullItem,
    $index, 
    $isSelected,
    $setSelectedId,
    $clearSelectedId,
    $openInfoModal,
    $onClickSellItem,
    $cost,
    $count}: IShopSellItemProps) {

    const dispatch = useAppDispatch();

    const [rangeCount, setRangeCount] = useState(1);

    const onChangeRange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRangeCount(Number(e.currentTarget.value));
    }

    const onClickCancelSelect = () => {
        setRangeCount(1);
        $clearSelectedId();
    }

    useEffect(() => {
        setRangeCount(1)
    }, [$isSelected])

    if(!$fullItem.title){
        return (<></>)
    }

    return (
        <Item 
            color={getItemBackground($fullItem.rare)} 
            $hoveredColor={getItemHoveredBackground($fullItem.rare)} >
            <CircleButton symbol='?' click={() => $openInfoModal({id: $fullItem.id, whatInfo: 'item'})} />
            <Avatar 
                $image={$fullItem.avatar} 
                width={'5rem'} 
                $isBlocked={false} />

            <InfoBlock>
                <Title $size='1.3rem'>
                    {$fullItem.title} ({$count})
                </Title>
                <CraftBlock>
                    {
                        $isSelected
                            ? <SquareButton 
                                $width='3rem' 
                                $onClick={() => $onClickSellItem(rangeCount)} >
                                🗸
                            </SquareButton>
                            : <SquareButton
                                $width='3rem' 
                                $onClick={() => $setSelectedId()} >
                                +
                            </SquareButton>
                    }
                    
                    {
                        $isSelected 
                        ? <SquareButton 
                            $width='3rem'     
                            $onClick={() => onClickCancelSelect()}>
                            ✖
                        </SquareButton>
                        : null
                    }
                    {
                        $isSelected && $count > 1
                        ? <RangeBlock>
                            <CountRangeText>
                                x{rangeCount}
                            </CountRangeText>
                            <CountRange 
                                type='range' 
                                min={1} 
                                max={$count} 
                                value={rangeCount}
                                onChange={e => onChangeRange(e)} />
                            
                        </RangeBlock>
                        : null
                    }
                    <Cost>
                        {Number(($cost * rangeCount).toFixed(1)) }$
                    </Cost>
                </CraftBlock>
            </InfoBlock>
        </Item>
    );
}


const Cost = styled.p`
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 10px;
    font-size: 1rem;
    background: #cfcfcf;
    padding: 5px 10px;
    border-radius: 10px;
`

const CountRangeText = styled.p`
    font-size: 1.3rem;
    width: 2rem;
`

const RangeBlock = styled.div`
    display: flex;
    z-index: 9;
    background-color: white;
    gap: 10px;
    align-items: center;
    padding: 5px 10px;
    box-shadow: 0 0 5px black;
    border-radius: 5px;

    @media (max-width: 1025px) {
        min-width: 100%;
    }
    @media (max-width: 426px) {
        width: 50%;
    }
`

const CountRange = styled.input`
    width: 100%;
    transition: 0.1s;
    accent-color: #4494df;
    align-items: center;

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

    &::-moz-range-thumb{
        transform: translateY(-30%) scale(1.2);
        transition: 0.1s;
    }
    &::-moz-range-thumb:hover{
        transform: scale(1.5) translateY(-25%);
    }
    &::-moz-range-track{
        border-radius: 5px;
        background: gray;
        height: 5px;
    }

`

const CraftBlock = styled.div`
    margin-top: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
`

const InfoBlock = styled.div`
    display: flex;
    gap: 15px;
    height: 100%;
    flex-direction: column;
    justify-content: baseline;
`

interface IAreaItemBlockProps{
    color: string;
    $hoveredColor: string;
}

const Item = styled.div<IAreaItemBlockProps>`
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.56);
    padding: 1.3em;
    border-radius: 5px 5px 0 0;
    width: 100%;
    display: flex;
    gap: 1.3em;
    position: relative;
    cursor: pointer;
    background: ${ p => p.color};

    transition: 0.1s;

`

export default ShopSellItem;