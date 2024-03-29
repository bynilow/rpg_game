import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IFullItem } from '../../../../../models/IAreaItem';
import { getItemBackground, getItemHoveredBackground, getRareColor, getRareTimerBackgroundColor } from '../../../../../styles/backgrounds';
import Avatar from '../../../../Avatar/Avatar';
import TimerLine from '../../../../TimerLine/TimerLine';
import AreaMapped, { AreaThing } from './AreaMapped';
import { getStats } from '../../../../../functions/Stats';
import { useAppSelector } from '../../../../../hooks/redux';


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

    const {playerSkills, player} = useAppSelector(state => state.userReducer)

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
        <AreaMapped 
            $backgroundColor={getItemBackground($item.rare)} 
            $hoveredColor={getItemHoveredBackground($item.rare)}
            $isBlocked={!isMining && $isBlocked} >
            <AreaItemBlockClickable onClick={e => onClickStartMining(e)} />
            <Avatar 
                $image={$item.avatar} 
                width='100px'
                height='150%'
                $isBlocked={$isBlocked && !isMining}
                $isDoSomething={isMining}
                $onClicked={() => onClickStopMining()} />

            <Title>{$item.title}</Title>

            <TimerLine  
                $color={getRareColor($item.rare)}
                $backgroundColor={getRareTimerBackgroundColor($item.rare)}
                $isActive={isMining}
                $maxTime={baseTimeToMining}
                $currentTime={timeToMining}  />
        </AreaMapped>
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

export default Area;