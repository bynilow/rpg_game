import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAppDispatch } from '../../../../../hooks/redux';
import Avatar from '../../../../Avatar/Avatar';
import { IArea } from '../../../../../models/IArea';
import TimerLine from '../../../../TimerLine/TimerLine';
import AreaMapped from './AreaMapped';
import { palette } from '../../../../../styles/palette';

interface IAreaPathProps {
    $area: IArea;
    $timeToMove: number;
    $goLevel: Function;
    $index: number;
    $moveAreaId: string;
    $setMoveAreaId: Function;
    $clearMoveAreaId: Function;
    $playerMovementSpeed: number;
    $playerInventoryWeight: number;
    $playerInventoryMaxWeight: number;
    $isBlocked: boolean;
}



function AreaPath({ 
    $area, 
    $timeToMove, 
    $goLevel, 
    $index, 
    $moveAreaId,
    $setMoveAreaId,
    $clearMoveAreaId,
    $playerMovementSpeed,
    $playerInventoryWeight,
    $isBlocked,
    $playerInventoryMaxWeight }: IAreaPathProps) {

    const dispatch = useAppDispatch();

    const [isMoving, setIsMoving] = useState(false);
    const isMovingRef = useRef(isMoving);
    isMovingRef.current = isMoving;
    const [overweight, setOverweight] = useState(
        $playerInventoryMaxWeight >= $playerInventoryWeight
            ? 0
            : ($playerInventoryMaxWeight - $playerInventoryWeight) / 10 * -1);
    const [baseTimeToMovement, setBaseTimeToMovement] = useState(($timeToMove + $playerMovementSpeed) + overweight);
    const [currentTimeToMove, setCurrentTimeToMove] = useState(baseTimeToMovement);

    const onClickLevel = (e:React.MouseEvent<HTMLDivElement>) => {
        if(!isMoving && !$isBlocked){
            setIsMoving(true);
            startIntervalMove();
            setCurrentTimeToMove(baseTimeToMovement);
            $setMoveAreaId();
        }

    }
    
    const onClickStopMove = () => {
        setIsMoving(false);
        $clearMoveAreaId();

        var highestTimeoutId = setTimeout(";");
        for (var i = 0; i < highestTimeoutId; i++) {
            clearTimeout(i);
        }
    }

    const startIntervalMove = () => {
        const interval = setInterval(() => {
            if(!isMovingRef.current) clearInterval(interval);
            setCurrentTimeToMove(t => t - 0.05);
        }, 50);
        setTimeout(() => {
            clearInterval(interval);
            if(isMovingRef.current) {
                $clearMoveAreaId();
                $goLevel();
            };
        }, baseTimeToMovement*1000)
    }

    useEffect(() => {
        setBaseTimeToMovement(baseTimeToMovement < 0 ? 0.1 : baseTimeToMovement);
    }, [$playerInventoryWeight])

    return (
        <AreaMapped
            $backgroundColor={'white'}
            $hoveredColor={palette.backgroundColor}
            $isBlocked={!isMoving && $isBlocked} >
            <AreaBlockClickable onClick={e => onClickLevel(e)} />
            <Avatar 
                $image={$area.avatar}
                width='100px'
                height='150%'
                $onClicked={() => onClickStopMove()} 
                $isBlocked={$isBlocked && !isMoving}
                $isDoSomething={isMoving} />
                
            <Name>{$area.title}</Name>
            
            <TimerLine 
                $isOverweight={overweight > 0}
                $color='#4682B4'
                $backgroundColor='#A9A9A9'
                $currentTime={currentTimeToMove}
                $maxTime={baseTimeToMovement}
                $isActive={isMoving} />
        </AreaMapped>
    );
}

const AreaBlockClickable = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`

const Name = styled.p`
    cursor: pointer;
    transition: .2s;
`

export default AreaPath;