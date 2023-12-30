import styled, { keyframes } from 'styled-components'
import { useAppDispatch } from '../../hooks/redux';
import { stopMoveToLocation } from '../../store/reducers/ActionCreators';
import { useEffect, useRef, useState } from 'react';

interface IArea {
    title: string;
    timeToMove: number;
    goLevel: Function;
    avatarUrl: string;
    index: number;
}



function Area({ title, timeToMove, goLevel, avatarUrl = '', index }: IArea) {

    const dispatch = useAppDispatch();

    console.log(title, avatarUrl);

    const [isMoving, setIsMoving] = useState(false);
    const isMovingRef = useRef(isMoving);
    isMovingRef.current = isMoving;
    const [currentTimeToMove, setCurrentTimeToMove] = useState(timeToMove);

    const onClickLevel = (e:React.MouseEvent<HTMLDivElement>) => {
        setIsMoving(true);
        startIntervalMove();
        setCurrentTimeToMove(timeToMove); 
    }
    
    const onClickStopMove = () => {
        setIsMoving(false);
        dispatch(stopMoveToLocation());
    }

    const startIntervalMove = () => {
        const interval = setInterval(() => {
            if(!isMovingRef.current) clearInterval(interval);
            setCurrentTimeToMove(t => t - 0.05);
        }, 50);
        setTimeout(() => {
            clearInterval(interval);
            if(isMovingRef.current) goLevel();
        }, timeToMove*1000)
    }

    return (
        <AreaBlock index={index} >
            <AreaBlockClickable onClick={e => onClickLevel(e)} />
            <Avatar image={avatarUrl}>
                {
                    isMoving
                        ? <StopMoveCross id='stopmove' onClick={() => onClickStopMove()}>
                            ✕
                        </StopMoveCross>
                        : null
                }
                
            </Avatar>
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

interface IAvatarProps{
    image: string;
}

const Avatar = styled.div<IAvatarProps>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    width: 90px;
    height: 90px;
    /* box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 1); */
    /* background-color: #A9A9A9; */
    background-image: url(${p => require('../../' + p.image)});
    background-size: cover;
    border-radius: 50%;
    transition: 0.1s;

    &:hover{
        transform: scale(1);
    }
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

const StopMoveCross = styled.div`
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
    box-sizing: border-box;

    &:hover{
        transform: scale(1.5);
        background-color: #00000084;
    }
`

interface IAreaBlockProps {
    index: number;
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
    width: 350px;
    height: 70px;
    display: flex;
    gap: 20px;
    align-items: center;
    position: relative;
    cursor: pointer;

    transform: scale(0) rotate(-45deg);
    animation: ${AreaBlockAnim} 1s ease;
    animation-delay: ${p => p.index/3}s;
    animation-fill-mode: forwards;
    transition: 0.1s;

    box-sizing: border-box;

    &:hover ${Name} {
        padding: 20px;
    }

    &:hover{
        background-color: #e7e7e7;
    }
`

export default Area;