import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IChangeInfo } from '../../../models/IArea';
import { IFullItem, IFullItemWithCount } from '../../../models/IAreaItem';
import { getItemBackground, getItemHoveredBackground, getRareColor, getRareTimerBackgroundColor } from '../../../styles/backgrounds';
import Avatar from '../../Avatar/Avatar';
import CircleButton from '../../Buttons/CircleButton';

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

    const {areaItems, inventory} = useAppSelector(state => state.userReducer);

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
                width={'100px'} 
                height={'100%'}
                $isMiningOther={false} />

            <InfoBlock>
                <Title>
                    {$fullItem.title} ({$count})
                </Title>
                <CraftBlock>
                    <Button onClick={
                        $isSelected
                            ? () => $onClickSellItem(rangeCount)
                            : () => $setSelectedId()}>
                        {
                            $isSelected
                                ? '🗸'
                                : '+'
                        }
                    </Button>


                    {
                        $isSelected 
                        ? <Button onClick={() => onClickCancelSelect()}>
                            ✖
                        </Button>
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
    font-size: 16px;
    background: #cfcfcf;
    padding: 5px 10px;
    border-radius: 10px;
`

const CountRangeText = styled.p`
    font-size: 20px;
    width: 50px;
`

const RangeBlock = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 5px 10px;
    box-shadow: 0 0 5px black;
    border-radius: 5px;
`

const CountRange = styled.input`
    min-width: 200px;
    max-width: 200px;
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

`

const Button = styled.div`
    font-size: 30px;
    line-height: 0;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 5px black;
    border-radius: 5px;
    user-select: none;

    cursor: pointer;
    transition: 0.1s;

    &:hover{
        transform: scale(0.95);
    }
`

const CraftBlock = styled.div`
    margin-top: auto;
    display: flex;
    gap: 10px;
    width: fit-content;
`

const InfoBlock = styled.div`
    display: flex;
    gap: 15px;
    height: 100%;
    flex-direction: column;
    justify-content: baseline;
`

const AreaItemBlockClickable = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
`

const Title = styled.p`
    font-size: 20px;
    transition: .1s;
`


const AreaItemBlockAnim = keyframes`
    from{
        transform: scale(0) rotate(-50deg);
    }
    to{
        transform: scale(1) rotate(0deg);
    }
`

interface IAreaItemBlockProps{
    color: string;
    $hoveredColor: string;
}



const Item = styled.div<IAreaItemBlockProps>`
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.56);
    padding: 20px;
    border-radius: 5px 5px 0 0;
    width: 100%;
    height: 130px;
    display: flex;
    gap: 20px;
    position: relative;
    cursor: pointer;
    background: ${ p => p.color};

    transition: 0.1s;

`


export default ShopSellItem;