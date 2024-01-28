import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IFullItem } from '../../../../../models/IAreaItem';
import { getItemBackground, getItemHoveredBackground, getRareColor, getRareTimerBackgroundColor } from '../../../../../styles/backgrounds';
import Avatar from '../../../../Avatar/Avatar';


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
            <Timer>
                {
                    isMining
                        ? timeToMining.toFixed(1)
                        : baseTimeToMining
                }s
            </Timer>
            <TimerLine 
                color={getRareColor($item.rare)}
                $backgroundColor={getRareTimerBackgroundColor($item.rare)}
                max={baseTimeToMining} 
                value={isMining ? timeToMining : baseTimeToMining} />
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
    cursor: pointer;
    z-index: -1;
    transition: .2s;
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

    ${
        p => p.$isMiningOther
            ? ` &::after{
                position: absolute;
                z-$index: 99;
                border-radius: 10px 10px 0 0;
                top: 0;
                left: 0;
                content: '';
                width: 100%;
                height: 100%;
                background: #00000081;
            };`
            : null
    }

    transform: scale(0) rotate(-45deg);
    animation: ${AreaItemBlockAnim} .5s ease;
    animation-delay: ${p => p.$index/3}s;
    animation-fill-mode: forwards;
    
    transition: 1s;

    &:hover ${Title} {
        ${p => p.$isMiningOther 
            ? null 
            : `padding-left: 1rem;
            transform: scale(1.2);`
        }
    }

    &:hover{
        ${
            p => p.$isMiningOther
                ? null
                : `background: ${p.$hoveredColor};`
        }
    }
`


export default Area;