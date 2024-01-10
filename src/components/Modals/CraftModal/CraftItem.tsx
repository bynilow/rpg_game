import styled, { keyframes } from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { stopMineItem, stopMoveToLocation } from '../../../store/reducers/ActionCreators';
import { ICraftItem, IFullItem } from '../../../models/IAreaItem';
import { useEffect, useRef, useState } from 'react';
import { getItemBackground, getItemHoveredBackground, getRareColor, getRareTimerBackgroundColor } from '../../../styles/backgrounds';
import Avatar from '../../Avatar/Avatar';
import NeedItem from './NeedItem';


interface ICraftItemProps {
    $fullItem: IFullItem;
    $itemToCraft: ICraftItem;
    $index: number;
    $craftingId: string;
    $isClickedSelectCount: boolean;
    $setIsCraftingId: Function;
    $craftItem: Function;
    $clearIsCraftingId: Function;
    $onClickSelectCount: Function;
    $onClickCancelCount: Function;
    $playerCraftingSpeed: number;
    $countCanCraft: number;
}

function CraftItem({ 
    $fullItem,
    $itemToCraft, 
    $craftItem, 
    $index, 
    $craftingId, 
    $countCanCraft,
    $isClickedSelectCount,
    $setIsCraftingId, 
    $clearIsCraftingId, 
    $onClickSelectCount,
    $onClickCancelCount,
    $playerCraftingSpeed}: ICraftItemProps) {

    const {areaItems, inventory} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch();

    const [isCrafting, setIsCrafting] = useState(false);
    const isCraftingRef = useRef(isCrafting);
    isCraftingRef.current = isCrafting;
    const [baseTimeToCrafting, setBaseTimeToCrafting] = useState($fullItem.timeToMining - $playerCraftingSpeed*-1);
    const [timeToMining, setTimeToMining] = useState(baseTimeToCrafting);

    const onClickStartMining = (e:React.MouseEvent<HTMLDivElement>) => {
        if(!isCrafting){
            setIsCrafting(true);
            $setIsCraftingId();
            startIntervalMine();
        }
    }

    const onClickStopMining = () => {
        dispatch(stopMineItem());
        setTimeToMining(baseTimeToCrafting);
        setIsCrafting(false);
        $clearIsCraftingId();
        
    }

    const startIntervalMine = () => {
        const interval = setInterval(() => {
            if(!isCraftingRef.current) clearInterval(interval);
            setTimeToMining(t => t - 0.05);
        }, 50);
        setTimeout(() => {
            clearInterval(interval);
            if(isCraftingRef.current) {
                $clearIsCraftingId();
                $craftItem();
            }
        }, baseTimeToCrafting*1000)
    }

    console.log($countCanCraft)
    const [rangeCount, setRangeCount] = useState(1);

    return (
        <Item 
            color={getItemBackground($fullItem.rare)} 
            $hoveredColor={getItemHoveredBackground($fullItem.rare)}
            $isMiningOther={false} >
            {/* <AreaItemBlockClickable onClick={e => onClickStartMining(e)} /> */}
            <Avatar 
                $image={$fullItem.avatar} 
                width={'120px'} 
                height={'120px'}
                $isDoSomething={isCrafting}
                $onClicked={() => onClickStopMining()} 
                $isMiningOther={false} />

            <InfoBlock>
                <Title>{$fullItem.title}</Title>
                <NeedList>
                    {
                        $itemToCraft.itemsNeed.map(i => 
                            <NeedItem 
                                key={i.id}
                                $id={i.id}
                                $title={areaItems.find(ai => ai.id === i.id)!.title}
                                $countNeed={i.count*rangeCount}
                                $countHave={inventory.find(pi => pi.item.id === i.id)?.count || 0} />)
                    }
                </NeedList>
                <CraftBlock>
                    {
                        $countCanCraft
                            ? <CraftButton onClick={() => $onClickSelectCount(true)}>
                                {
                                    $isClickedSelectCount
                                        ? '🗸'
                                        : '+'
                                }
                            </CraftButton>
                            : null
                    }
                    {
                        $isClickedSelectCount
                        ? <CraftButton onClick={() => $onClickCancelCount()}>
                            ✖
                        </CraftButton>
                        : null
                    }
                    {
                        $isClickedSelectCount && $countCanCraft > 1
                        ? <RangeBlock>
                            <CountRangeText>
                                x{rangeCount}
                            </CountRangeText>
                            <CountRange 
                                type='range' 
                                min={1} 
                                max={$countCanCraft} 
                                value={rangeCount}
                                onChange={e => setRangeCount(Number(e.target.value))} />
                            
                        </RangeBlock>
                        : null
                    }

                </CraftBlock>
            </InfoBlock>
            
            <Timer>
                {
                    isCrafting
                        ? timeToMining.toFixed(1)
                        : baseTimeToCrafting
                }s
            </Timer>
            <TimerLine 
                color={getRareColor($fullItem.rare)}
                $backgroundColor={getRareTimerBackgroundColor($fullItem.rare)}
                max={baseTimeToCrafting} 
                value={isCrafting ? timeToMining : baseTimeToCrafting} />
        </Item>
    );
}

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

const CraftButton = styled.div`
    font-size: 30px;
    line-height: 0;
    width: 40px;
    height: 40px;
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
    gap: 10px;
    width: fit-content;
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
`

const AreaItemBlockClickable = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`

const Timer = styled.p`
    position: absolute;
    color: #8b8b8b;
    bottom: 0;
    right: 0;
    margin: 10px;
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

const Title = styled.p`
    font-size: 20px;
    transition: .1s;
`

const StopMiningCross = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    padding: 30px;
    width: 50%;
    height: 50%;
    z-index: 99;
    line-height: 0;
    color: white;
    background-color: #00000050;
    border-radius: 50%;
    transition: 0.1s;

    &:hover{
        transform: scale(1.5);
        background-color: #00000084;
    }
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
    $isMiningOther: boolean;
    
}



const Item = styled.div<IAreaItemBlockProps>`
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.56);
    padding: 20px;
    border-radius: 5px 5px 0 0;
    width: 100%;
    min-height: 140px;
    display: flex;
    gap: 20px;
    position: relative;
    cursor: pointer;
    background: ${ p => p.color};

    ${
        p => p.$isMiningOther
            ? ` &::after{
                position: absolute;
                z-$index: 99;
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

    transition: 0.1s;

    &:hover{
        ${
            p => p.$isMiningOther
                ? null
                : `
                    transform: scale(1.01);`
        }
    }
`


export default CraftItem;