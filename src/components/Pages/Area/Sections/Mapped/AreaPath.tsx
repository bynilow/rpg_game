import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAppDispatch } from '../../../../../hooks/redux';
import Avatar from '../../../../Avatar/Avatar';
import { IArea } from '../../../../../models/IArea';
import TimerLine from '../../../../TimerLine/TimerLine';

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
        <Area
            $index={$index} 
            $isMovingOther={($moveAreaId !== $area.id && $moveAreaId !== '') || $isBlocked}>
            <AreaBlockClickable onClick={e => onClickLevel(e)} />
            <Avatar 
                $image={$area.avatar}
                width='6rem' 
                height='6rem' 
                $onClicked={() => onClickStopMove()} 
                $isDoSomething={isMoving}
                $isMovingOther={($moveAreaId !== $area.id && $moveAreaId !== '') || $isBlocked} />
                
            <Name>{$area.title}</Name>
            
            <TimerLine 
                $isOverweight={overweight > 0}
                $color='#4682B4'
                $backgroundColor='#A9A9A9'
                $currentTime={currentTimeToMove}
                $maxTime={baseTimeToMovement}
                $isActive={isMoving} />
        </Area>
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


interface IAreaBlockProps {
    $index: number;
    $isMovingOther: boolean;
}

const Area = styled.div<IAreaBlockProps>`
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.56);
    background-color: white;
    padding: 1.3em;
    border-radius: 10px 10px 0 0;
    width: 100%;
    height: 4.5rem;
    display: flex;
    gap: 1.3em;
    align-items: center;
    position: relative;
    cursor: pointer;

    transition: 0.1s;

    ${
        p => p.$isMovingOther
            ? `&::after{
                position: absolute;
                z-$index: 99;
                border-radius: 10px 10px 0 0;
                top: 0;
                left: 0;
                content: '';
                width: 100%;
                height: 100%;
                background: #00000071;
            };`
            : null
    }

    &:hover{
        ${p => p.$isMovingOther 
            ? null 
            : `background-color: #d8d8d8;`
        }
        transform: scale(0.97);
    }
`

export default AreaPath;