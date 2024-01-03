import styled from 'styled-components'
import ModalBackground from '../Other/ModalBackground';
import CircleButton from '../../Buttons/CircleButton';
import { useAppSelector } from '../../../hooks/redux';
import InfoItem from './InfoItem';
import { idText } from 'typescript';
import { IArea, IChangeInfo } from '../../../models/IArea';
import { useEffect, useState } from 'react';
import InfoArea from './InfoArea';
import { getAreaBackground, getAreaColor, getEnemyBackground, getEnemyColor, getItemBackground, getRareColor } from '../../../styles/backgrounds';
import Avatar from '../../Avatar/Avatar';
import { scrollBarX } from '../../../styles/scrollbars';
import InfoEnemy from './InfoEnemy';
import { IFullItem } from '../../../models/IAreaItem';

interface IInfoModal {
    area: IArea;
    itemId: string;
    enemyId: string;
    closeModal: Function;
    whatInfo: string;
    
    changeWhatInfo: (item: IChangeInfo) => void;
}

function InfoModal({area, closeModal, whatInfo, changeWhatInfo, itemId, enemyId}:IInfoModal) {

    const {areaItems, areas, enemies} = useAppSelector(state => state.userReducer);

    const item = areaItems.find(i => i.id === itemId)!;
    const enemy = enemies.find(e => e.id === enemyId)!;
    let enemyItems:IFullItem[] = [];
    console.log(enemy)
    if(enemy){
        enemyItems = enemy.possibleLoot.map(i => areaItems.find(ai => ai.id === i.id)!)!;
    }

    useEffect(() => {

    }, [item])

    return ( 
        <>
            <ModalBackground />
            {
                whatInfo === 'area'
                    ? <Info color={getAreaBackground(area.color)}>

                        <CircleButton symbol='✕' click={() => closeModal()} />
                        <Section>
                            <Avatar
                                $image={area.avatar}
                                width={'150px'}
                                height={'150px'} />
                            <Title>
                                "{area.title}"
                            </Title>
                            <ColorText color={getAreaColor(area.color)}>
                                {
                                    area.color === 'green'
                                        ? 'Зеленная зона'
                                        : area.color === 'yellow'
                                            ? 'Желтая зона'
                                            : 'Красная зона'

                                }
                            </ColorText>
                            <Description>
                                {
                                    area.description
                                }

                            </Description>
                        </Section>

                        <Section>
                            <Title>
                                Местность
                            </Title>
                            <UpdateText>
                                Обновляется каждые {area.timeToRespawnAreaItems} минут
                            </UpdateText>
                            <List>
                                {
                                    area.areaItems.map(i =>
                                        <InfoItem
                                            id={i.id}
                                            $countMax={i.countMax}
                                            $countMin={i.countMin}
                                            $changeWhatInfo={() => changeWhatInfo({
                                                whatInfo: 'item',
                                                itemId: i.id
                                            })} />)
                                }

                            </List>
                        </Section>

                        <Section>
                            <Title>
                                Враги
                            </Title>
                            <UpdateText>
                                Обновляются каждые {area.timeToRespawnAreaEnemies} минут
                            </UpdateText>
                            <List>
                                {
                                    area.enemies.map(e =>
                                        <InfoEnemy
                                            id={e.id}
                                            $countMax={e.countMax}
                                            $countMin={e.countMin}
                                            $levelMin={e.levelMin}
                                            $levelMax={e.levelMax}
                                            $spawnChance={e.spawnChance}
                                            $changeWhatInfo={() => changeWhatInfo({
                                                whatInfo: 'enemy',
                                                enemyId: e.id
                                            })} />)
                                }
                            </List>
                        </Section>

                    </Info>
                    : whatInfo === 'item' 
                    ? <Info color={getItemBackground(item.rare)}>
                        <CircleButton symbol='✕' click={() => closeModal()} />

                        <Section>
                            <Avatar
                                $image={item.avatar}
                                width={'150px'}
                                height={'150px'} />
                            <Title>
                                "{item.title}"
                            </Title>
                            <ColorText color={getRareColor(item.rare)}>
                                {
                                    item.rare === 'common'
                                        ? "Обычное"
                                        : item.rare === 'uncommon'
                                            ? "Необычное"
                                            : item.rare === 'rare'
                                                ? "Редкое"
                                                : item.rare === 'mythical'
                                                    ? "Мифическое"
                                                    : "Легендарное"

                                }
                            </ColorText>
                            <Cost>
                                {item.cost}$
                            </Cost>
                            <Description>
                                {item.description}
                            </Description>
                        </Section>

                        <Section>
                            <Title>
                                Где найти
                            </Title>
                            <List>
                                {
                                    areas.filter(a => a.areaItems.findIndex(i => i.id === itemId) !== -1)
                                        .map(a =>
                                            <InfoArea
                                                key={a.id}
                                                areaId={a.id}
                                                countMax={a.areaItems.find(i => i.id === itemId)!.countMax}
                                                countMin={a.areaItems.find(i => i.id === itemId)!.countMin}
                                                changeWhatInfo={() => changeWhatInfo({
                                                    whatInfo: 'area',
                                                    area: a
                                                })} />)
                                }
                                {
                                    enemies.filter(e => e.possibleLoot.findIndex(i => i.id === itemId) !== -1)
                                        .map(ef =>
                                            <InfoEnemy
                                                key={ef.id}
                                                id={ef.id}
                                                $dropChance={ef.possibleLoot.find(pl => pl.id === itemId)!.dropChance}
                                                $countMax={ef.possibleLoot.find(pl => pl.id === itemId)!.countMax}
                                                $countMin={ef.possibleLoot.find(pl => pl.id === itemId)!.countMin}
                                                $changeWhatInfo={() => changeWhatInfo({
                                                    whatInfo: 'enemy',
                                                    enemyId: ef.id
                                                })} />)
                                }
                            </List>
                        </Section>

                        <Section>
                            <Title>
                                Используется
                            </Title>
                            <List>
                                
                            </List>
                        </Section>
                    </Info>
                    : <Info color={getEnemyBackground(enemy.type)}>
                    <CircleButton symbol='✕' click={() => closeModal()} />

                    <Section>
                        <Avatar
                            $image={enemy.avatar}
                            width={'150px'}
                            height={'150px'} />
                        <Title>
                            "{enemy.title}"
                                </Title>
                                <ColorText color={getEnemyColor(enemy.type)}>
                                    {
                                        enemy.type === 'enemy'
                                            ? "Враг"
                                            : enemy.type === 'neutral'
                                                ? "Нейтральный"
                                                : "Босс"

                                    }
                                </ColorText>
                                <Description>
                                    {enemy.description}
                                </Description>
                                <Title>
                                    Характеристики
                                </Title>
                                <Property>
                                        <ProperyName>
                                            Жизни:
                                        </ProperyName> {enemy.maxHealth}
                                    </Property>
                                    <Property>
                                        <ProperyName>
                                            Скорость атаки: 
                                        </ProperyName> {enemy.attackSpeed}s
                                    </Property>
                                    <Property>
                                        <ProperyName>
                                            Урон: 
                                        </ProperyName> {enemy.damage}
                                    </Property>
                                    <Property>
                                        <ProperyName>
                                            Множитель крит. урона: 
                                        </ProperyName> x{enemy.critDamageMultiplier}
                                    </Property>
                                    <Property>
                                        <ProperyName>
                                            Шанс крит. урона: 
                                        </ProperyName> {enemy.critChance}%
                                    </Property>
                                    <Property>
                                        <ProperyName>
                                            Шанс промаха: 
                                        </ProperyName> {enemy.missChance}%
                                    </Property>
                                    <Property>
                                        <ProperyName>
                                            Шанс уклонения: 
                                        </ProperyName> {enemy.dodgeChance}%
                                    </Property>
                                    <Property>
                                        <ProperyName>
                                            Шанс блокирования: 
                                        </ProperyName> {enemy.blockingChance}%
                                    </Property>
                                    <Property>
                                        <ProperyName>
                                            Множитель блокирования: 
                                        </ProperyName> x{enemy.blockingMultiplier}
                                    </Property>
                    </Section>

                            <Section>
                                <Title>
                                    Возможный лут
                                </Title>
                                <List>
                                    {
                                        enemyItems.map(i => 
                                            <InfoItem 
                                                key={i.id}
                                                id={i.id}
                                                $countMax={enemy.possibleLoot.find(pl => pl.id === i.id)!.countMax}
                                                $countMin={enemy.possibleLoot.find(pl => pl.id === i.id)!.countMin}
                                                $dropChance={enemy.possibleLoot.find(pl => pl.id === i.id)!.dropChance}
                                                $changeWhatInfo={() => changeWhatInfo({
                                                    whatInfo: 'item',
                                                    itemId: i.id
                                                })} />)
                                    }
                                </List>
                            </Section>

                            <Section>
                        <Title>
                            Где найти
                        </Title>
                        <List>
                            {
                                areas.filter(a => a.enemies.findIndex(e => e.id === enemyId) !== -1)
                                    .map(a =>
                                        <InfoArea
                                            key={a.id}
                                            areaId={a.id}
                                            countMax={a.enemies.find(e => e.id === enemyId)!.countMax}
                                            countMin={a.enemies.find(e => e.id === enemyId)!.countMin}
                                            changeWhatInfo={() => changeWhatInfo({
                                                whatInfo: 'area',
                                                area: a
                                            })} />)
                            }
                        </List>
                    </Section>
                </Info>
            }
        </>
    );
}

const ProperyName = styled.span`
    color: black;
`

const Property = styled.p`
    
`

const Cost = styled.p`
    color: black;
    width: min-content;
    background-color: #dddddd;
    border-radius: 5px;
    padding: 5px;
    margin: 0;
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

interface IColorText {
    color: string;
}

const ColorText = styled.p<IColorText>`
    font-size: 16px;
    margin: 0;
    color: ${props => props.color};
`

const UpdateText = styled.p`
    font-size: 16px;
    margin: 0;
`

const Section = styled.div`
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    gap: 10px;

    ${
        scrollBarX
    }
`

const Description = styled.p`
    font-size: 18px;
    margin: 0;
`

const Title = styled.p`
    font-size: 30px;
    margin: 0;
`

interface IInfoProps{
    color: string;
}

const Info = styled.div<IInfoProps>`
    z-index: 9999;
    position: absolute;
    width: 70vw;
    height: 80vh;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: white;
    box-shadow: 0 0 10px #00000050;
    border-radius: 15px;
    display: flex;
    justify-content: space-around;
    gap: 20px;

    transition: .1s;

    background: ${p => p.color};
`

export default InfoModal;