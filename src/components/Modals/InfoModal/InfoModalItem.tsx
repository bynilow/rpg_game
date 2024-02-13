import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../hooks/redux';
import { getItemBackground, getItemHoveredBackground, getRareColor } from '../../../styles/backgrounds';
import Avatar from '../../Avatar/Avatar';
import Section from '../../Section/Section';
import Title from '../../Title/Title';
import Characteristics from './Characteristics/Characteristics';
import InfoElem from './InfoElem';

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

            <Section $haveScroll>
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

                <Title $size='1.5rem'> 
                    Характеристики
                </Title>
                <Characteristics item={thisItem} />

            </Section>

            <Section $haveScroll>
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

            <Section $haveScroll>
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