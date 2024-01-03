import styled from 'styled-components';
import { useAppSelector } from '../../../hooks/redux';
import { IArea } from '../../../models/IArea';
import { IFullItem } from '../../../models/IAreaItem';
import { IEnemy } from '../../../models/IEnemy';
import { getAreaBackground, getEnemyBackground, getHoveredAreaBackground, getHoveredEnemyBackground, getItemBackground, getItemHoveredBackground } from '../../../styles/backgrounds';
import Avatar from '../../Avatar/Avatar';
import { useEffect } from 'react';

interface IInfoElem {
    id: string
    $countMin: number;
    $countMax: number;
    $type: 'area' | 'item' | 'enemy';
    $levelMin?: number;
    $levelMax?: number;
    $dropChance?: number;
    $spawnChance?: number;
    $changeWhatInfo: Function;
}

function InfoElem({
    id, 
    $type,
    $countMin, 
    $countMax, 
    $changeWhatInfo, 
    $dropChance,
    $spawnChance,
    $levelMin,
    $levelMax}:IInfoElem) {

    const {areas, areaItems, enemies} = useAppSelector(state => state.userReducer);

    let thisObject: IArea | IFullItem | IEnemy | null = null;
    let color = '';
    let hoveredColor = '';

    switch ($type){
        case 'item':
            thisObject = areaItems.find(i => i.id === id)!;
            color = getItemBackground(thisObject.rare);
            hoveredColor = getItemHoveredBackground(thisObject.rare);
            break;
        case 'enemy':
            thisObject = enemies.find(e => e.id === id)!;
            color = getEnemyBackground(thisObject.type);
            hoveredColor = getHoveredEnemyBackground(thisObject.type);
            break;
        case 'area':
            thisObject = areas.find(a => a.id === id)!;
            color = getAreaBackground(thisObject.color);
            hoveredColor = getHoveredAreaBackground(thisObject.color);
            break;
    }

    useEffect(() => {

    }, [$type])



    return ( 
        <Item 
            color={color}
            $hoveredColor={hoveredColor} 
            onClick={() => $changeWhatInfo()}>
            <Avatar 
                $image={thisObject.avatar}
                width={'80px'} 
                height={'80px'}  />
            <Info>
                <Title>
                    {
                        thisObject.title
                    }
                </Title>
                <About>
                    <AboutText>
                        {
                            $levelMin
                                ? $levelMin === $levelMax
                                    ? `УР: ${$levelMax}`
                                    : `УР: ${$levelMin} - ${$levelMax}`
                                : null
                        }
                    </AboutText>
                    <AboutText>
                        {
                            $dropChance
                                ? `Шанс дропа: ${$dropChance}%`
                                : null
                        }
                    </AboutText>
                    <AboutText>
                        {
                            $spawnChance
                                ? `Шанс спавна: ${$spawnChance}%`
                                : null
                        }
                    </AboutText>
                    <AboutText>
                        {
                            $countMax !== $countMin
                                ? `Количество: ${$countMin} - ${$countMax}`
                                : `Количество: ${$countMax}`
                        }
                    </AboutText>
                </About>
            </Info>
        </Item>
     );
}

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

const AboutText = styled.p`
    margin: 0;
`

const Title = styled.p`
    font-size: 20px;
    margin: 0;
    transition: .1s;
`

interface IItemProps {
    color: string;
    $hoveredColor: string;
}

const Item = styled.div<IItemProps>`
    
    width: 100%;
    min-height: 70px;
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

export default InfoElem;