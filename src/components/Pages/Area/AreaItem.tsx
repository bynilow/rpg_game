import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAppDispatch } from '../../../hooks/redux';
import { IFullItem } from '../../../models/IAreaItem';
import { getItemBackground, getItemHoveredBackground, getRareColor, getRareTimerBackgroundColor } from '../../../styles/backgrounds';
import Avatar from '../../Avatar/Avatar';


interface IAreaItemProps {
    $item: IFullItem;
    $index: number;
    $miningId: string;
    $setIsMiningId: Function;
    $mineItem: Function;
    $clearIsMiningId: Function;
    $playerSpeedMining: number;
}

function Area({ 
    $item, 
    $mineItem, 
    $index, 
    $miningId, 
    $setIsMiningId, 
    $clearIsMiningId, 
    $playerSpeedMining}: IAreaItemProps) {

    const dispatch = useAppDispatch();

    const [isMining, setIsMining] = useState(false);
    const isMiningRef = useRef(isMining);
    isMiningRef.current = isMining;
    const [baseTimeToMining, setBaseTimeToMining] = useState(Number(($item.timeToMining + $playerSpeedMining).toFixed(2)));
    const [timeToMining, setTimeToMining] = useState(baseTimeToMining);

    const onClickStartMining = (e:React.MouseEvent<HTMLDivElement>) => {
        if(!isMining){
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
            $$index={$index} 
            $isMiningOther={($miningId !== $item.idInArea && $miningId !== '')} >
            <AreaItemBlockClickable onClick={e => onClickStartMining(e)} />
            <Avatar 
                $image={$item.avatar} 
                width={'90px'} 
                height={'90px'}
                $isDoSomething={isMining}
                $onClicked={() => onClickStopMining()} 
                $isMiningOther={($miningId !== $item.idInArea && $miningId !== '')} />

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
    $$index: number;
    $isMiningOther: boolean;
    
}



const AreaItemBlock = styled.div<IAreaItemBlockProps>`
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.56);
    padding: 20px;
    border-radius: 5px 5px 0 0;
    width: 100%;
    height: 70px;
    display: flex;
    gap: 20px;
    align-items: center;
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

    transform: scale(0) rotate(-45deg);
    animation: ${AreaItemBlockAnim} .5s ease;
    animation-delay: ${p => p.$$index/3}s;
    animation-fill-mode: forwards;
    
    transition: 1s;

    &:hover ${Title} {
        ${p => p.$isMiningOther 
            ? null 
            : `padding: 20px;`
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