import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../hooks/redux';
import { IChangeInfo } from '../../../models/IArea';
import { IFullItem } from '../../../models/IAreaItem';
import { getEnemyBackground, getEnemyColor, getHoveredEnemyBackground } from '../../../styles/backgrounds';
import { scrollBarX } from '../../../styles/scrollbars';
import Avatar from '../../Avatar/Avatar';
import CircleButton from '../../Buttons/CircleButton';
import Modal from '../Modal';
import InfoElem from './InfoElem';
import Section from '../../Section/Section';
import Title from '../../Title/Title';

interface IEnemyModal {
    $id: string;
    $closeModal: Function;

    $changeWhatInfo: Function;
}

function EnemyModal({ $closeModal, $changeWhatInfo, $id }: IEnemyModal) {

    const { areaItems, areas, enemies } = useAppSelector(state => state.userReducer);


    const [thisEnemy, setThisEnemy] = useState(enemies.find(e => e.id === $id)!)
    let enemyItems: IFullItem[] = [];

    if (thisEnemy.possibleLoot.length) {
        enemyItems = thisEnemy.possibleLoot.map(i => areaItems.find(ai => ai.id === i.id)!)!;
    }
    const backgroundColor = getEnemyBackground(thisEnemy.type);
    const backgroundHoveredColor = getHoveredEnemyBackground(thisEnemy.type);

    useEffect(() => {

    }, [])

    if(thisEnemy.title) return (
        <>

            <Section>
                <Avatar
                    $image={thisEnemy.avatar}
                    width={'150px'}
                    height={'150px'}
                    $minWidth={'200px'}
                    $minHeight={'200px'} />
                <Title $size='2rem'>
                    "{thisEnemy.title}"
                </Title>
                <ColorText color={getEnemyColor(thisEnemy.type)}>
                    {
                        thisEnemy.type === 'enemy'
                            ? "Враг"
                            : thisEnemy.type === 'neutral'
                                ? "Нейтральный"
                                : thisEnemy.type === 'trader'
                                    ? 'Торговец'
                                    : 'Босс'

                    }
                </ColorText>
                <Description>
                    {thisEnemy.description}
                </Description>
                {
                    thisEnemy.type === 'enemy' || thisEnemy.type === 'boss'
                        ? <>
                            <Title $size='1.5rem'>
                                Характеристики
                            </Title>
                            <Property>
                                <ProperyName>
                                    Жизни:
                                </ProperyName> {thisEnemy.maxHealth}
                            </Property>
                            <Property>
                                <ProperyName>
                                    Скорость атаки:
                                </ProperyName> {thisEnemy.attackSpeed}s
                            </Property>
                            <Property>
                                <ProperyName>
                                    Урон:
                                </ProperyName> {thisEnemy.damage}
                            </Property>
                            <Property>
                                <ProperyName>
                                    Множитель крит. урона:
                                </ProperyName> x{thisEnemy.critDamageMultiplier}
                            </Property>
                            <Property>
                                <ProperyName>
                                    Шанс крит. урона:
                                </ProperyName> {thisEnemy.critChance}%
                            </Property>
                            <Property>
                                <ProperyName>
                                    Шанс промаха:
                                </ProperyName> {thisEnemy.missChance}%
                            </Property>
                            <Property>
                                <ProperyName>
                                    Шанс уклонения:
                                </ProperyName> {thisEnemy.dodgeChance}%
                            </Property>
                            <Property>
                                <ProperyName>
                                    Шанс блокирования:
                                </ProperyName> {thisEnemy.blockingChance}%
                            </Property>
                            <Property>
                                <ProperyName>
                                    Множитель блокирования:
                                </ProperyName> x{thisEnemy.blockingMultiplier}
                            </Property>
                        </>
                        : null
                }
            </Section>

            <Section>
                <Title $size='2rem'>
                    {
                        thisEnemy.type === 'boss' || thisEnemy.type === 'enemy'
                            ? 'Возможный лут'
                            : thisEnemy.type === 'trader'
                                ? 'Возможные товары'
                                : 'Предметы'
                    }
                </Title>
                <List>
                    {
                        enemyItems.map(i =>
                            <InfoElem
                                key={i.id}
                                id={i.id}
                                $type={'item'}
                                $isTraderItem={thisEnemy.type === 'trader'}
                                $countMax={thisEnemy.possibleLoot.find(pl => pl.id === i.id)!.countMax}
                                $countMin={thisEnemy.possibleLoot.find(pl => pl.id === i.id)!.countMin}
                                $dropChance={thisEnemy.possibleLoot.find(pl => pl.id === i.id)!.dropChance}
                                $changeWhatInfo={() => $changeWhatInfo({
                                    whatInfo: 'item',
                                    id: i.id
                                })} />)
                    }
                </List>
            </Section>

            <Section>
                <Title $size='2em'>
                    Где найти
                </Title>
                <List>
                    {
                        areas.filter(a => a.enemies.findIndex(e => e.id === $id) !== -1)
                            .map(a =>
                                <InfoElem
                                    key={a.id}
                                    id={a.id}
                                    $type={'area'}
                                    $spawnChance={a.enemies.find(i => i.id === $id)!.spawnChance}
                                    $countMax={a.enemies.find(e => e.id === $id)!.countMax}
                                    $countMin={a.enemies.find(e => e.id === $id)!.countMin}
                                    $changeWhatInfo={() => $changeWhatInfo({
                                        whatInfo: 'area',
                                        id: a.id
                                    })} />)
                    }
                </List>
            </Section>
        </>

    );
    else return (<></>)
}

const ProperyName = styled.span`
    color: black;
    font-size: 1rem;
`

const Property = styled.p`
    font-size: 1rem;
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
    font-size: 1rem;
    margin: 0;
    color: ${props => props.color};
`

const Description = styled.p`
    font-size: 1.3rem;
    margin: 0;
`

export default EnemyModal;