import styled, { keyframes } from 'styled-components'
import { useAppDispatch } from '../../hooks/redux';
import { stopMoveToLocation } from '../../store/reducers/ActionCreators';
import { useEffect, useRef, useState } from 'react';
import Avatar from '../Avatar/Avatar';

interface IArea {
    title: string;
    timeToMove: number;
    areaId: string;
    goLevel: Function;
    avatarUrl: string;
    index: number;
    moveAreaId: string;
    setMoveAreaId: Function;
    clearMoveAreaId: Function;
}



function Area({ 
    title, 
    timeToMove, 
    goLevel, 
    avatarUrl = '', 
    index, 
    moveAreaId,
    setMoveAreaId,
    clearMoveAreaId,
    areaId }: IArea) {

    const dispatch = useAppDispatch();

    console.log(title, avatarUrl);

    const [isMoving, setIsMoving] = useState(false);
    const isMovingRef = useRef(isMoving);
    isMovingRef.current = isMoving;
    const [currentTimeToMove, setCurrentTimeToMove] = useState(timeToMove);

    const onClickLevel = (e:React.MouseEvent<HTMLDivElement>) => {
        if(!isMoving){
            setIsMoving(true);
            startIntervalMove();
            setCurrentTimeToMove(timeToMove);
            setMoveAreaId();
        }

    }
    
    const onClickStopMove = () => {
        setIsMoving(false);
        dispatch(stopMoveToLocation());
        clearMoveAreaId();
    }

    const startIntervalMove = () => {
        const interval = setInterval(() => {
            if(!isMovingRef.current) clearInterval(interval);
            setCurrentTimeToMove(t => t - 0.05);
        }, 50);
        setTimeout(() => {
            clearInterval(interval);
            if(isMovingRef.current) {
                clearMoveAreaId();
                goLevel();
            };
        }, timeToMove*1000)
    }
    return (
        <AreaBlock 
            $index={index} 
            $isMovingOther={(moveAreaId !== areaId && moveAreaId !== '')}>
            <AreaBlockClickable onClick={e => onClickLevel(e)} />
            <Avatar 
                $image={avatarUrl}
                width={'90px'} 
                height={'90px'}
                $onClicked={() => onClickStopMove()} 
                $isDoSomething={isMoving}
                $isMovingOther={(moveAreaId !== areaId && moveAreaId !== '')} />
                
            <Name>{title}</Name>
            <Timer>
                {
                    isMoving
                        ? currentTimeToMove.toFixed(1) + 's'
                        : timeToMove + 's'
                }
            </Timer>
            <TimerLine max={timeToMove} value={isMoving ? currentTimeToMove : timeToMove} />
        </AreaBlock>
    );
}

const AvatarImg = styled.img`
    width: 120%;
    top: -10%;
    left: -10%;
    position: absolute;
    z-index: 1;
`

const AreaBlockClickable = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`

const Timer = styled.p`
    position: absolute;
    color: #A9A9A9;
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
    transition: .1s;
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

const AreaBlock = styled.div<IAreaBlockProps>`
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.56);
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 100%;
    height: 70px;
    display: flex;
    gap: 20px;
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
                z-index: 99;
                border-radius: 5px;
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
            : `padding: 20px;`
        }
    }

    &:hover{
        ${p => p.$isMovingOther 
            ? null 
            : `background-color: #d8d8d8`
        }
    }
`

export default Area;