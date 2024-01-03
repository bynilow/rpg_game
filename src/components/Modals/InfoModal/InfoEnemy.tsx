import { useState } from 'react';
import styled from 'styled-components'
import { useAppSelector } from '../../../hooks/redux';
import { IChangeInfo } from '../../../models/IArea';
import { getEnemyBackground, getHoveredEnemyBackground, getItemBackground, getItemHoveredBackground } from '../../../styles/backgrounds';
import Avatar from '../../Avatar/Avatar';

interface IEnemyInfo {
    id: string
    $countMin: number;
    $countMax: number;
    $levelMin?: number;
    $levelMax?: number;
    $spawnChance?: number;
    $dropChance?: number;
    $changeWhatInfo: Function;
}

function InfoEnemy({
    id, 
    $countMin, 
    $countMax, 
    $changeWhatInfo, 
    $spawnChance, 
    $dropChance,
    $levelMin, 
    $levelMax }:IEnemyInfo) {

    const {enemies} = useAppSelector(state => state.userReducer);

    const enemy = enemies.find(e => e.id === id)!;

    return ( 
        <Enemy 
            color={getEnemyBackground(enemy.type)}
            $hoveredColor={getHoveredEnemyBackground(enemy.type)} 
            onClick={() => $changeWhatInfo()}>
            <Avatar 
                $image={enemy.avatar}
                width={'80px'} 
                height={'80px'}  />
            <Info>
                <Title>
                    {
                        enemy.title
                    }
                </Title>
                <About>
                    <AboutText>
                        {
                            $levelMax
                                ? $levelMin !== $levelMax
                                    ? `УР: ${$levelMin} - ${$levelMax}`
                                    : `УР: ${$levelMax}`
                                : null
                        }

                    </AboutText>
                    <AboutText>
                        Шанс {
                            $spawnChance
                                ? 'спавна: '+ $spawnChance
                                : $dropChance
                                    ? 'дропа: '+ $dropChance
                                    : null
                        } %
                    </AboutText>
                    <Count>
                        {
                            $countMax !== $countMin
                                ? `Количество: ${$countMin} - ${$countMax}`
                                : `Количество: ${$countMax}`
                        }
                    </Count>
                </About>
            </Info>
        </Enemy>
     );
}

const AboutText = styled.p`
    
`

const About = styled.div`
    display: flex;
    flex-direction: column;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    transition: .1s;
`

const Count = styled.p`
    margin: 0;
`

const Title = styled.p`
    font-size: 20px;
    margin: 0;
    transition: .1s;
`

interface IEnemyProps {
    color: string;
    $hoveredColor: string;
}

const Enemy = styled.div<IEnemyProps>`
    
    width: 100%;
    min-height: 100px;
    height: auto;
    box-shadow: 0 0 5px black;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
    transition: .1s;

    background: ${p => p.color};

    &:hover{
        background: ${p => p.$hoveredColor};
        transform: scale(0.97);
    }

`

export default InfoEnemy;