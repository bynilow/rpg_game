import styled, { keyframes } from 'styled-components';
import { useAppSelector } from '../../../../../hooks/redux';
import { getEnemyBackground, getHoveredEnemyBackground } from '../../../../../styles/backgrounds';
import Avatar from '../../../../Avatar/Avatar';


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
                $isMiningOther={$isBlocked}
                width='6rem' 
                height='6rem' />

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

const AreaEnemyBlock = styled.div<IAreaItemBlockProps>`
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.56);
    padding: 1.3rem;
    border-radius: 10px;
    width: 100%;
    height: 4.5rem;
    display: flex;
    gap: 1.3rem;
    align-items: center;
    position: relative;
    cursor: pointer;
    background: ${ p => p.color};
    
    transition: 0.1s;

    &:hover{
        ${p => p.$isBlocked 
            ? null 
            : `background: ${p.$hoveredColor};`
        }
        transform: scale(0.97);
    }

    ${
        p => p.$isBlocked
            ? ` &::after{
                position: absolute;
                z-$index: 99;
                border-radius: 10px;
                top: 0;
                left: 0;
                content: '';
                width: 100%;
                height: 100%;
                background: #00000081;
            };`
            : null
    }
`


export default AreaEnemy;