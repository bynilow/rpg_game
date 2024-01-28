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
}

function AreaEnemy({ id, $idInArea, $level, $index, $onClick }: IAreaEnemyProps) {

    const {enemies} = useAppSelector(state => state.userReducer);

    const enemy = enemies.find(e => e.id === id)!;

    return (
        <AreaEnemyBlock 
            color={getEnemyBackground(enemy.type)} 
            $hoveredColor={getHoveredEnemyBackground(enemy.type)}
            $index={$index} >
            <EnemyClickableBlock onClick={() => $onClick()} />
            <Avatar 
                $image={enemy.avatar} 
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
    padding: 1.3rem;
    border-radius: 5px 5px 0 0;
    width: 100%;
    height: 4rem;
    display: flex;
    gap: 1.3rem;
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
        padding: 0.5rem;
    }
`


export default AreaEnemy;