import styled, { keyframes } from 'styled-components';
import { useAppSelector } from '../../../../../hooks/redux';
import { getEnemyBackground, getHoveredEnemyBackground } from '../../../../../styles/backgrounds';
import Avatar from '../../../../Avatar/Avatar';
import AreaMapped, { AreaThing } from './AreaMapped';
import { Enemies } from '../../../../../data/Enemies';


interface IAreaEnemyProps {
    id: string;
    $idInArea: string;
    $level: number;
    $index: number;
    $onClick: Function;
    $isBlocked: boolean;
}

function AreaEnemy({ id, $idInArea, $level, $index, $onClick, $isBlocked }: IAreaEnemyProps) {

    const enemy = Enemies.find(e => e.id === id)!;

    return (
        <AreaMapped 
            $backgroundColor={getEnemyBackground(enemy.type)} 
            $hoveredColor={getHoveredEnemyBackground(enemy.type)}
            $isBlocked={$isBlocked} >
            <EnemyClickableBlock onClick={() => $onClick()} />
            <Avatar 
                $image={enemy.avatar} 
                $isBlocked={$isBlocked}
                width='100px'
                height='150%' />

            <Title>{enemy.title}</Title>
            {
                enemy.type !== 'trader'
                    ? <Level>
                        УР: {$level}
                    </Level>
                    : null
            }
        </AreaMapped>
    );
}

const Level = styled.p`
    color: #888888;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 10px;
    font-size: 1rem;
`

const EnemyClickableBlock = styled.div`
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

export default AreaEnemy;