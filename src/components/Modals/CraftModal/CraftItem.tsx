import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IChangeInfo } from '../../../models/IArea';
import { IFullItem, IFullItemWithCount } from '../../../models/IAreaItem';
import { getItemBackground, getItemHoveredBackground, getRareColor, getRareTimerBackgroundColor } from '../../../styles/backgrounds';
import Avatar from '../../Avatar/Avatar';
import CircleButton from '../../Buttons/CircleButton';
import NeedItem from './NeedItem';
import Title from '../../Title/Title';


interface ICraftItemProps {
    $fullItem: IFullItem;
    $index: number;
    $craftingId: string;
    $isSelected: boolean;
    $setCraftingId: Function;
    $clearCraftingId: Function;
    $craftItem: (count: number, removeItems: IFullItemWithCount[]) => void;
    $setSelectedId: Function;
    $clearSelectedId: Function;
    $openInfoModal: (info: IChangeInfo) => void;
    $playerCraftingSpeed: number;
    $countCanCraft: number;
}

function CraftItem({ 
    $fullItem,
    $craftItem, 
    $index, 
    $craftingId, 
    $countCanCraft,
    $setCraftingId, 
    $clearCraftingId, 
    $playerCraftingSpeed,
    $isSelected,
    $setSelectedId,
    $clearSelectedId,
    $openInfoModal}: ICraftItemProps) {

    const {areaItems, inventory} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch();

    const [isCrafting, setIsCrafting] = useState(false);
    const isCraftingRef = useRef(isCrafting);
    isCraftingRef.current = isCrafting;
    const [baseTimeToCrafting, setBaseTimeToCrafting] = useState($fullItem.timeToMining - $playerCraftingSpeed);
    const [timeToCrafting, setTimeToCrafting] = useState(baseTimeToCrafting);

    const onClickStartMining = () => {
        if(!isCrafting){
            setIsCrafting(true);
            isCraftingRef.current = true;
            $setCraftingId();
            setBaseTime();
            startIntervalMine();
        }
    }

    const onClickCancelCrafting = () => {
        $clearCraftingId();
        setIsCrafting(false);
        isCraftingRef.current = false;
        setBaseTime();
        
        var highestTimeoutId = setTimeout(";");
        for (var i = 0; i < highestTimeoutId; i++) {
            clearTimeout(i);
        }
    }

    const startIntervalMine = () => {
        setBaseTime(rangeCount);
        const interval = setInterval(() => {
            if(!isCraftingRef.current) clearInterval(interval);
            setTimeToCrafting(t => t - 0.05);
        }, 50);
        
        setTimeout(() => {
            clearInterval(interval);
            const itemsToRemove: IFullItemWithCount[] = 
                $fullItem.itemsToCraft!.map(i => {
                    return { 
                        ...areaItems.find(fi => fi.id === i.id)!, 
                        count: i.count*rangeCount }
                        });

            if(isCraftingRef.current) {
                $clearCraftingId();
                $craftItem(rangeCount, itemsToRemove);
            }
            setRangeCount(1);
            setIsCrafting(false);
            setBaseTime(1);
        }, baseTimeToCrafting*1000)
    }

    const [rangeCount, setRangeCount] = useState(1);

    const onChangeRange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRangeCount(Number(e.currentTarget.value));
        setBaseTime(Number(e.currentTarget.value));
    }

    const setBaseTime = (changedRange = rangeCount) => {
        setBaseTimeToCrafting(($fullItem.timeToMining - $playerCraftingSpeed*-1)*changedRange);
        setTimeToCrafting(($fullItem.timeToMining - $playerCraftingSpeed*-1)*changedRange);

    }

    useEffect(() => {

    }, [$countCanCraft])

    if(!$fullItem.title){
        return (<></>)
    }

    return (
        <Item 
            color={getItemBackground($fullItem.rare)} 
            $hoveredColor={getItemHoveredBackground($fullItem.rare)}
            $isMiningOther={$craftingId !== $fullItem.id && $craftingId !== ''} >
            <AreaItemBlockClickable />
            <InfoButton>
                <CircleButton
                    symbol='?'
                    click={() => $openInfoModal({ id: $fullItem.id, whatInfo: 'item' })} />
            </InfoButton>
            <Avatar 
                $image={$fullItem.avatar} 
                width='8rem'
                height='8rem'
                $isDoSomething={isCrafting}
                $onClicked={() => onClickCancelCrafting()} 
                $isMiningOther={false} />

            <InfoBlock>
                <Title $size='1.3rem'>
                    {$fullItem.title} ({inventory.find(i => $fullItem.id === i.item.id)?.count || 0})
                </Title>
                <NeedList>
                    {
                        $fullItem.itemsToCraft!.map(i => 
                            <NeedItem 
                                key={i.id}
                                $id={i.id}
                                $title={areaItems.find(ai => ai.id === i.id)?.title || ''}
                                $countNeed={i.count*rangeCount}
                                $countHave={inventory.find(pi => pi.item.id === i.id)?.count || 0} />)
                    }
                </NeedList>
                <CraftBlock>
                    {
                        $countCanCraft && $craftingId === ''
                            ? <Button onClick={
                                $isSelected
                                ? () => onClickStartMining()
                                : () => $setSelectedId() }>
                                {
                                    $isSelected
                                        ? '🗸'
                                        : '+'
                                }
                            </Button>
                            : null
                    }
                    {
                        $isSelected && $craftingId === '' && $countCanCraft
                        ? <Button onClick={() => $clearSelectedId()}>
                            ✖
                        </Button>
                        : null
                    }
                    {
                        $isSelected && $craftingId === '' && $countCanCraft > 1
                        ? <RangeBlock>
                            <CountRangeText>
                                x{rangeCount}
                            </CountRangeText>
                            <CountRange 
                                type='range' 
                                min={1} 
                                max={$countCanCraft} 
                                value={rangeCount}
                                onChange={e => onChangeRange(e)} />
                            
                        </RangeBlock>
                        : null
                    }

                </CraftBlock>
            </InfoBlock>
            <InfoCrafting>
                {
                    isCrafting
                        ? <CountCrafting>
                            x{rangeCount}
                        </CountCrafting>
                        : null
                }
                <Timer>
                    {
                        isCrafting
                            ? Number(timeToCrafting.toFixed(1))
                            : baseTimeToCrafting
                    }s
                </Timer>
            </InfoCrafting> 
            
            <TimerLine 
                color={getRareColor($fullItem.rare)}
                $backgroundColor={getRareTimerBackgroundColor($fullItem.rare)}
                max={baseTimeToCrafting} 
                value={isCrafting ? timeToCrafting : baseTimeToCrafting} />
        </Item>
    );
}

const InfoButton = styled.div`
    position: absolute;
    top: 0;
    right: -20%;

    transition: .3s;
`

const InfoCrafting = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
`

const CountCrafting = styled.p`
    color: gray;
`

const CountRangeText = styled.p`
    font-size: 1.3rem;
    width: 2rem;
`

const RangeBlock = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 5px 10px;
    box-shadow: 0 0 5px black;
    border-radius: 5px;
    width: 60%;

    @media (max-width: 769px) {
        min-width: 80%;
    }
    @media (max-width: 426px) {
        min-width: 90%;
    }
`

const CountRange = styled.input`
    width: 90%;
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
    font-size: 1.5em;
    line-height: 0;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 5px black;
    border-radius: 5px;

    cursor: pointer;
    transition: 0.1s;

    &:hover{
        transform: scale(0.95);
    }
`

const CraftBlock = styled.div`
    margin-top: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
`

const NeedList = styled.div`
    display: flex;
    padding-left: 10px;
    flex-direction: column;
    gap: 10px;
`

const InfoBlock = styled.div`
    display: flex;
    gap: 15px;
    height: 100%;
    flex-direction: column;
    justify-content: baseline;
    width: 100%;


`

const AreaItemBlockClickable = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
`

const Timer = styled.p`
    color: #8b8b8b;
`

interface ITimerLineProps{
    color: string;
    $backgroundColor: string;
}

const TimerLine = styled.progress<ITimerLineProps>`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    border-radius: 5px;
    -webkit-appearance: none;
    appearance: none;

    transition: 0.1s;

    &::-webkit-progress-value {
        background-color: ${p => p.color};
        transition: 0.2s;
    }
    &::-webkit-progress-bar {
        background-color: ${p => p.$backgroundColor};
    }
`


interface IAreaItemBlockProps{
    color: string;
    $hoveredColor: string;
    $isMiningOther: boolean;
    
}

const Item = styled.div<IAreaItemBlockProps>`
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.56);
    padding: 1rem;
    border-radius: 5px 5px 0 0;
    width: 100%;
    display: flex;
    gap: 1.3rem;
    position: relative;
    cursor: pointer;
    background: ${ p => p.color};
    overflow: hidden;

    transition: 0.1s;

    ${
        p => p.$isMiningOther
            ? ` &::after{
                position: absolute;
                z-index: 99;
                border-radius: 5px;
                top: 0;
                left: 0;
                content: '';
                width: 100%;
                height: 100%;
                background: #00000081;
            };`
            : null
    }

    &:hover{
        ${
            p => p.$isMiningOther
                ? null
                : `
                    transform: scale(1.01);`
        }
    }

    &:hover ${InfoButton} {
        right: 0%;
    }

    @media (max-width: 426px) {
        flex-direction: column;
    }
`


export default CraftItem;