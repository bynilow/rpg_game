import styled, { keyframes } from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { stopMineItem, stopMoveToLocation } from '../../store/reducers/ActionCreators';
import { IFullItem } from '../../models/IAreaItem';
import { useRef, useState } from 'react';
import { getEnemyBackground, getHoveredEnemyBackground, getItemBackground, getItemHoveredBackground, getRareColor, getRareTimerBackgroundColor } from '../../styles/backgrounds';
import Avatar from '../Avatar/Avatar';


interface IAreaEnemyProps {
    id: string;
    $idInArea: string;
    $level: number;
    $index: number;
    $onClickStartBattle: Function;
}

function AreaEnemy({ id, $idInArea, $level, $index, $onClickStartBattle }: IAreaEnemyProps) {

    const {enemies} = useAppSelector(state => state.userReducer);

    const enemy = enemies.find(e => e.id === id)!;

    return (
        <AreaEnemyBlock 
            color={getEnemyBackground(enemy.type)} 
            $hoveredColor={getHoveredEnemyBackground(enemy.type)}
            $index={$index} >
            <EnemyClickableBlock onClick={() => $onClickStartBattle()} />
            <Avatar 
                $image={enemy.avatar} 
                width={'90px'} 
                height={'90px'} />

            <Title>{enemy.title}</Title>
            <Level>
                УР: {$level}
            </Level>
        </AreaEnemyBlock>
    );
}

const Level = styled.p`
    color: #888888;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 10px;
`

const EnemyClickableBlock = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    /* #b6b6b6 */
    /* #70b5d1 */
    /* #cf6060 */

`

const Title = styled.p`
    cursor: pointer;
    transition: .1s;
`

const EnemyStartAnim = keyframes`
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
}



const AreaEnemyBlock = styled.div<IAreaItemBlockProps>`
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

    transform: scale(0) rotate(-45deg);
    animation: ${EnemyStartAnim} .5s ease;
    animation-delay: ${p => p.$index/3}s;
    animation-fill-mode: forwards;
    
    transition: 1s;

    &:hover{
        background: ${p => p.$hoveredColor};
    }

    &:hover ${Title} {
        padding: 20px;
    }
`


export default AreaEnemy;