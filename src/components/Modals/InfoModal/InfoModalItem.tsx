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
                <Title>
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
                                    Опыт:
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
                                    Опыт:
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
            </Section>

            <Section>
                <Title>
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
                <Title>
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

const Description = styled.p`
    font-size: 18px;
    margin: 0;
`

const Title = styled.p`
    font-size: 30px;
    margin: 0;
`

interface IInfoProps {
    color: string;
}

export default ItemModal;