import styled, { keyframes } from 'styled-components';
import { useAppSelector } from '../../../../../hooks/redux';
import { getEnemyBackground, getHoveredEnemyBackground } from '../../../../../styles/backgrounds';
import Avatar from '../../../../Avatar/Avatar';
import AreaMapped from './AreaMapped';


interface IAreaEnemyProps {
    id: string;
    $idInArea: string;
    $level: number;
    $index: number;
    $onClick: Function;
    $isBlocked: boolean;
}

function AreaEnemy({ id, $idInArea, $level, $index, $onClick, $isBlocked }: IAreaEnemyProps) {

    const {enemies} = useAppSelector(state => state.userReducer);

    const enemy = enemies.find(e => e.id === id)!;

    return (
        <AreaEnemyBlock 
            color={getEnemyBackground(enemy.type)} 
            $hoveredColor={getHoveredEnemyBackground(enemy.type)}
            $isBlocked={$isBlocked}
            $index={$index} >
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
        </AreaEnemyBlock>
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

interface IAreaItemBlockProps{
    color: string;
    $hoveredColor: string;
    $index: number;
    $isBlocked: boolean;
}

const AreaEnemyBlock = styled(AreaMapped)<IAreaItemBlockProps>`
    background: ${ p => p.color};
    
    &:hover{
        ${p => p.$isBlocked 
            ? null 
            : `background: ${p.$hoveredColor};
                transform: scale(0.97);`
        }
        
    }
`


export default AreaEnemy;