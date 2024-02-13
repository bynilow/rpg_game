import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IFullItem } from '../../../../../models/IAreaItem';
import { getItemBackground, getItemHoveredBackground, getRareColor, getRareTimerBackgroundColor } from '../../../../../styles/backgrounds';
import Avatar from '../../../../Avatar/Avatar';
import TimerLine from '../../../../TimerLine/TimerLine';


interface IAreaItemProps {
    $item: IFullItem;
    $index: number;
    $miningId: string;
    $setIsMiningId: Function;
    $mineItem: Function;
    $clearIsMiningId: Function;
    $playerSpeedMining: number;
    $isBlocked: boolean;
}

function Area({ 
    $item, 
    $mineItem, 
    $index, 
    $isBlocked,
    $miningId, 
    $setIsMiningId, 
    $clearIsMiningId, 
    $playerSpeedMining}: IAreaItemProps) {

    const [isMining, setIsMining] = useState(false);
    const isMiningRef = useRef(isMining);
    isMiningRef.current = isMining;
    const [baseTimeToMining, setBaseTimeToMining] = useState(Number(($item.timeToMining + $playerSpeedMining).toFixed(2)));
    const [timeToMining, setTimeToMining] = useState(baseTimeToMining);

    const onClickStartMining = (e:React.MouseEvent<HTMLDivElement>) => {
        if(!isMining && !$isBlocked){
            setIsMining(true);
            $setIsMiningId();
            startIntervalMine();
        }
    }

    const onClickStopMining = () => {
        setTimeToMining(baseTimeToMining);
        setIsMining(false);
        $clearIsMiningId();

        var highestTimeoutId = setTimeout(";");
        for (var i = 0; i < highestTimeoutId; i++) {
            clearTimeout(i);
        }
    }

    const startIntervalMine = () => {
        const interval = setInterval(() => {
            if(!isMiningRef.current) clearInterval(interval);
            setTimeToMining(t => t - 0.05);
        }, 50);
        setTimeout(() => {
            clearInterval(interval);
            if(isMiningRef.current) {
                $clearIsMiningId();
                $mineItem();
            }
        }, baseTimeToMining*1000)
    }

    useEffect(() => {
        setBaseTimeToMining(baseTimeToMining < 0 ? 0.1 : baseTimeToMining)
    })

    return (
        <AreaItemBlock 
            color={getItemBackground($item.rare)} 
            $hoveredColor={getItemHoveredBackground($item.rare)}
            $index={$index} 
            $isMiningOther={($miningId !== $item.idInArea && $miningId !== '') || $isBlocked} >
            <AreaItemBlockClickable onClick={e => onClickStartMining(e)} />
            <Avatar 
                $image={$item.avatar} 
                width='6rem' 
                height='6rem' 
                $isDoSomething={isMining}
                $onClicked={() => onClickStopMining()} 
                $isMiningOther={($miningId !== $item.idInArea && $miningId !== '') || $isBlocked} />

            <Title>{$item.title}</Title>

            <TimerLine  
                $color={getRareColor($item.rare)}
                $backgroundColor={getRareTimerBackgroundColor($item.rare)}
                $isActive={isMining}
                $maxTime={baseTimeToMining}
                $currentTime={timeToMining}  />
        </AreaItemBlock>
    );
}



const AreaItemBlockClickable = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`

const Title = styled.p`
    cursor: pointer;
    transition: .2s;
`

interface IAreaItemBlockProps{
    color: string;
    $hoveredColor: string;
    $index: number;
    $isMiningOther: boolean;
    
}

const AreaItemBlock = styled.div<IAreaItemBlockProps>`
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.56);
    padding: 1.3rem;
    border-radius: 10px 10px 0 0;
    width: 100%;
    height: 4.5rem;
    display: flex;
    gap: 1.3rem;
    align-items: center;
    position: relative;
    cursor: pointer;
    background: ${ p => p.color};
    transition: 0.1s;

    &::after{
        position: absolute;
        content: '';
        z-index: 99;
        border-radius: 10px 10px 0 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${p => p.$isMiningOther ? '#00000081' : 'rgba(0,0,0,0)'};
        pointer-events: ${p => p.$isMiningOther ? 'all' : 'none'};
        transition: 0.3s;
    };

    

    &:hover{
        ${
            p => p.$isMiningOther
                ? null
                : `background: ${p.$hoveredColor};`
        }
        transform: scale(0.97);
    }
`


export default Area;