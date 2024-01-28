import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAppDispatch } from '../../../../../hooks/redux';
import Avatar from '../../../../Avatar/Avatar';
import { IArea } from '../../../../../models/IArea';

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
            <Timer $isOverweight={overweight > 0}>
                {
                    isMoving
                        ? currentTimeToMove.toFixed(1) + 's'
                        : baseTimeToMovement.toFixed(1) + 's'
                }
            </Timer>
            <TimerLine max={baseTimeToMovement} value={isMoving ? currentTimeToMove : baseTimeToMovement} />
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

interface ITimerProps{
    $isOverweight: boolean;
}

const Timer = styled.p<ITimerProps>`
    position: absolute;
    color: ${p => p.$isOverweight ? '#bb3a3a' : '#A9A9A9'};
    bottom: 0;
    right: 0;
    margin: 10px;
`

const TimerLine = styled.progress`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;

    -webkit-appearance: none;
   appearance: none;

   transition: 0.1s;

   &::-webkit-progress-value {
    background-color: #4682B4;
    transition: 0.2s;
   }
   &::-webkit-progress-bar {
    background-color: #A9A9A9;
   }
`

const Name = styled.p`
    cursor: pointer;
    transition: .2s;
`


interface IAreaBlockProps {
    $index: number;
    $isMovingOther: boolean;
}

const AreaBlockAnim = keyframes`
    from{
        transform: scale(0) rotate(-90deg);
    }
    to{
        transform: scale(1) rotate(0deg);
    }
`

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

    transform: scale(0) rotate(-45deg);
    animation: ${AreaBlockAnim} 1s ease;
    animation-delay: ${p => p.$index/3}s;
    animation-fill-mode: forwards;
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

    &:hover ${Name} {
        ${p => p.$isMovingOther 
            ? null 
            : `padding-left: 1rem;
            transform: scale(1.2);`
        }
    }

    &:hover{
        ${p => p.$isMovingOther 
            ? null 
            : `background-color: #d8d8d8`
        }
    }
`

export default AreaPath;