import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../hooks/redux';
import { IChangeInfo } from '../../../models/IArea';
import { getItemBackground, getItemHoveredBackground, getRareColor } from '../../../styles/backgrounds';
import { scrollBarX } from '../../../styles/scrollbars';
import Avatar from '../../Avatar/Avatar';
import CircleButton from '../../Buttons/CircleButton';
import Modal from '../Modal';
import InfoElem from './InfoElem';
import Section from '../../Section/Section';
import Title from '../../Title/Title';

interface IModalItem {
    $id: string;
    $closeModal: Function;

    $changeWhatInfo: Function;
}

function ItemModal({ $closeModal, $changeWhatInfo, $id }: IModalItem) {

    const { areaItems, areas, enemies } = useAppSelector(state => state.userReducer);

    const [thisItem, setThisItem] = useState(areaItems.find(i => i.id === $id)!);

    const backgroundColor = getItemBackground(thisItem.rare);
    const backgroundHoveredColor = getItemHoveredBackground(thisItem.rare);

    useEffect(() => {

    }, [$id])

    return (
        <>

            <Section>
                <Avatar
                    $image={thisItem.avatar}
                    width={'250px'}
                    height={'250px'}
                    $minWidth={'200px'}
                    $minHeight={'200px'} />
                <Title $size='2rem'>
                    "{thisItem.title}"
                </Title>
                <ColorText color={getRareColor(thisItem.rare)}>
                    {
                        thisItem.rare === 'common'
                            ? "Обычное"
                            : thisItem.rare === 'uncommon'
                                ? "Необычное"
                                : thisItem.rare === 'rare'
                                    ? "Редкое"
                                    : thisItem.rare === 'mythical'
                                        ? "Мифическое"
                                        : "Легендарное"

                    }
                </ColorText>
                <Cost>
                    {thisItem.cost}$
                </Cost>
                <Description>
                    {thisItem.description}
                </Description>
                {
                    thisItem.type === 'tree' || thisItem.type === 'ore'
                        ? <>
                            <Title>
                                Характеристики
                            </Title>
                            <Property>
                                <ProperyName>
                                    Скорость добычи:
                                </ProperyName> {thisItem.timeToMining}s
                            </Property>
                            <Property>
                                <ProperyName>
                                    Получаемый опыт:
                                </ProperyName> {thisItem.baseCountXP}
                            </Property>
                        </>
                        : null
                }

                {
                    thisItem.type === 'armor'
                        ? <>
                            <Title>
                                Характеристики
                            </Title>
                            <Property>
                                <ProperyName>
                                    Скорость создания:
                                </ProperyName> {thisItem.timeToMining}s
                            </Property>
                            <Property>
                                <ProperyName>
                                    Опыт создания:
                                </ProperyName> {thisItem.baseCountXP}
                            </Property>
                            <Property>
                                <ProperyName>
                                    Множитель ОЗ:
                                </ProperyName> +x{thisItem.armorStats?.healthMultiplier}
                            </Property>
                            <Property>
                                <ProperyName>
                                    Шанс промаха:
                                </ProperyName> {thisItem.armorStats!.missChance > 0
                                    ? '+' + thisItem.armorStats?.missChance
                                    : thisItem.armorStats?.missChance}%
                            </Property>
                            <Property>
                                <ProperyName>
                                    Шанс уклонения:
                                </ProperyName> {thisItem.armorStats!.dodgeChance > 0
                                    ? '+' + thisItem.armorStats!.dodgeChance
                                    : thisItem.armorStats!.dodgeChance}%
                            </Property>
                            <Property>
                                <ProperyName>
                                    Скорость передвижения:
                                </ProperyName> {thisItem.armorStats!.speedMovement > 0
                                    ? '+' + thisItem.armorStats!.speedMovement
                                    : thisItem.armorStats!.speedMovement}s
                            </Property>
                            <Property>
                                <ProperyName>
                                    Скорость атаки:
                                </ProperyName> {thisItem.armorStats!.speedAttack > 0
                                    ? '+' + thisItem.armorStats?.speedAttack
                                    : thisItem.armorStats?.speedAttack}s
                            </Property>
                        </>
                        : null
                }

                {
                    thisItem.type === 'tool'
                        ? <>
                            <Title>
                                Характеристики
                            </Title>
                            <Property>
                                <ProperyName>
                                    Скорость создания:
                                </ProperyName> {thisItem.timeToMining}s
                            </Property>
                            <Property>
                                <ProperyName>
                                    Опыт создания:
                                </ProperyName> {thisItem.baseCountXP}
                            </Property>
                            <Property>
                                <ProperyName>
                                    Скорость добычи:
                                </ProperyName> {thisItem.toolStats?.miningSpeed}s
                            </Property>
                            <Property>
                                <ProperyName>
                                    Шанс дополнительного лута:
                                </ProperyName> +{thisItem.toolStats!.doubleChancePercent}%
                            </Property>
                        </>
                        : null
                }

                {
                    thisItem.type === 'material'
                        ? <>
                            <Title>
                                Характеристики
                            </Title>
                            <Property>
                                <ProperyName>
                                    Скорость создания:
                                </ProperyName> {thisItem.timeToMining}s
                            </Property>
                            <Property>
                                <ProperyName>
                                    Опыт создания:
                                </ProperyName> {thisItem.baseCountXP}
                            </Property>

                        </>
                        : null
                }

                {
                    thisItem.type === 'weapon'
                        ? <>
                            <Title $size='2rem'>
                                Характеристики
                            </Title>
                            <Property>
                                <ProperyName>
                                    Скорость создания:
                                </ProperyName> {thisItem.timeToMining}s
                            </Property>
                            <Property>
                                <ProperyName>
                                    Опыт создания:
                                </ProperyName> {thisItem.baseCountXP}
                            </Property>
                            <Property>
                                <ProperyName>
                                    Урон:
                                </ProperyName> +{thisItem.weaponStats?.damage}
                            </Property>
                            <Property>
                                <ProperyName>
                                    Шанс промаха:
                                </ProperyName> {thisItem.weaponStats!.missChance > 0
                                    ? '+' + thisItem.weaponStats?.missChance
                                    : thisItem.weaponStats?.missChance}%
                            </Property>
                            <Property>
                                <ProperyName>
                                    Шанс блокирования:
                                </ProperyName> {thisItem.weaponStats!.blockingChancePercent > 0
                                    ? '+' + thisItem.weaponStats!.blockingChancePercent
                                    : thisItem.weaponStats!.blockingChancePercent}%
                            </Property>
                            <Property>
                                <ProperyName>
                                    Множитель блокирования:
                                </ProperyName> +x{thisItem.weaponStats?.blockingMultiplier}
                            </Property>
                            <Property>
                                <ProperyName>
                                    Шанс крит. атаки:
                                </ProperyName> {thisItem.weaponStats!.critChance > 0
                                    ? '+' + thisItem.weaponStats!.critChance
                                    : thisItem.weaponStats!.critChance}%
                            </Property>
                            <Property>
                                <ProperyName>
                                    Множитель крит. атаки:
                                </ProperyName> +x{thisItem.weaponStats?.critDamageMultiplier}
                            </Property>
                            <Property>
                                <ProperyName>
                                    Скорость атаки:
                                </ProperyName> {thisItem.weaponStats!.speedAttack > 0
                                    ? '+' + thisItem.weaponStats?.speedAttack
                                    : thisItem.weaponStats?.speedAttack}s
                            </Property>
                        </>
                        : null
                }
            </Section>

            <Section>
                <Title $size='2rem'>
                    Где найти
                </Title>
                <List>
                    {
                        areas.filter(a => a.areaItems.findIndex(i => i.id === $id) !== -1)
                            .map(a =>
                                <InfoElem
                                    key={a.id}
                                    id={a.id}
                                    $type={'area'}
                                    $countMax={a.areaItems.find(i => i.id === $id)!.countMax}
                                    $countMin={a.areaItems.find(i => i.id === $id)!.countMin}
                                    $changeWhatInfo={() => $changeWhatInfo({
                                        whatInfo: 'area',
                                        id: a.id
                                    })} />)
                    }
                    {
                        enemies.filter(e => e.possibleLoot.findIndex(i => i.id === $id) !== -1)
                            .map(ef =>
                                <InfoElem
                                    key={ef.id}
                                    id={ef.id}
                                    $type={'enemy'}
                                    $isTraderItem={ef.type === 'trader'}
                                    $dropChance={ef.possibleLoot.find(pl => pl.id === $id)!.dropChance}
                                    $countMax={ef.possibleLoot.find(pl => pl.id === $id)!.countMax}
                                    $countMin={ef.possibleLoot.find(pl => pl.id === $id)!.countMin}
                                    $changeWhatInfo={() => $changeWhatInfo({
                                        whatInfo: 'enemy',
                                        id: ef.id
                                    })} />)
                    }
                    
                    {
                        thisItem.itemsToCraft
                            ? <InfoElem
                                key={$id}
                                id={$id}
                                $type={'item'}
                                $itemsToCraft={thisItem.itemsToCraft}
                                $isCrafting
                                $changeWhatInfo={() => $changeWhatInfo({
                                    whatInfo: 'item',
                                    id: $id
                                })} />
                            : null
                    }
                    
                </List>
            </Section>

            <Section>
                <Title $size='2rem'>
                    Используется
                </Title>
                <List>
                    {
                        areaItems.filter(i => i.itemsToCraft).filter(i => i.itemsToCraft!.find(fi => fi.id === $id))
                            .map(i => <InfoElem
                                key={i.id}
                                id={i.id}
                                $type={'item'}
                                $count={i.itemsToCraft!.find(i => i.id === $id)!.count}
                                $changeWhatInfo={() => $changeWhatInfo({
                                    whatInfo: 'item',
                                    id: i.id
                                })} />)
                    }
                </List>
            </Section>
        </>

    );
}

const ProperyName = styled.span`
    color: black;
`

const Property = styled.p`
    font-size: 1rem;
`

const Cost = styled.p`
    color: black;
    width: min-content;
    background-color: #dddddd;
    border-radius: 5px;
    padding: 5px;
    margin: 0;
    font-size: 1rem;
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
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


export default ItemModal;