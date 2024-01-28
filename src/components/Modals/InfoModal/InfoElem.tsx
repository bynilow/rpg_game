import styled from 'styled-components';
import { useAppSelector } from '../../../hooks/redux';
import { IArea } from '../../../models/IArea';
import { ICraftItem, IFullItem } from '../../../models/IAreaItem';
import { IEnemy } from '../../../models/IEnemy';
import { getAreaBackground, getEnemyBackground, getHoveredAreaBackground, getHoveredEnemyBackground, getItemBackground, getItemHoveredBackground } from '../../../styles/backgrounds';
import Avatar from '../../Avatar/Avatar';
import { useEffect, useState } from 'react';
import Title from '../../Title/Title';

interface IInfoElem {
    id: string
    $countMin?: number;
    $countMax?: number;
    $count?: number;
    $type: 'area' | 'item' | 'enemy';
    $levelMin?: number;
    $levelMax?: number;
    $dropChance?: number;
    $spawnChance?: number;
    $itemsToCraft?: ICraftItem[];
    $isCrafting?: boolean;
    $changeWhatInfo: Function;
    $isTraderItem?: boolean;
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
    $levelMax,
    $count,
    $itemsToCraft,
    $isCrafting = false,
    $isTraderItem = false}:IInfoElem) {

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

    const [countText, setCountText] = useState(
        $countMax && !$count
            ? $countMax === $countMin  
                ? `Количество: ${$countMax}`
                : `Количество: ${$countMin} - ${$countMax}`
            : $count
                ? `Количество: ${$count}`
                : ``
    )

    useEffect(() => {

    }, [$type])

    

    return ( 
        <Item 
            color={color}
            $hoveredColor={hoveredColor} 
            onClick={() => $changeWhatInfo()}>
            <Avatar
                $image={thisObject.avatar}
                width='5rem'
                height='5rem'
                $minWidth='5rem'
                $minHeight='5rem' >
                {
                    $isCrafting
                        ? <Crafting>🔨</Crafting>
                        : null
                }
            </Avatar>
            <Info>
                <Title $size='1.3rem'>
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
                                ? `Шанс ${$isTraderItem ? 'наличия' : 'дропа'}: ${$dropChance}%`
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
                        { countText }
                    </AboutText>
                    <AboutText>
                        {
                            $itemsToCraft
                                ? $itemsToCraft.map(i => 
                                    <p>
                                        x{i.count} {areaItems.find(fi => fi.id === i.id)?.title}
                                    </p>)
                                : null
                        }
                    </AboutText>
                </About>
            </Info>
        </Item>
     );
}

const Crafting = styled.div`
    font-size: 3rem;
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

const AboutText = styled.p`
    margin: 0;
`

interface IItemProps {
    color: string;
    $hoveredColor: string;
}

const Item = styled.div<IItemProps>`
    width: 100%;
    min-height: 7rem;
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