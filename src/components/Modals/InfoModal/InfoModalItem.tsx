import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../hooks/redux';
import { IChangeInfo } from '../../../models/IArea';
import { getItemBackground, getItemHoveredBackground, getRareColor } from '../../../styles/backgrounds';
import { scrollBarX } from '../../../styles/scrollbars';
import Avatar from '../../Avatar/Avatar';
import CircleButton from '../../Buttons/CircleButton';
import Modal from '../Modal';
import InfoElem from './InfoElem';

interface IModalItem {
    $itemId: string;
    $closeModal: Function;

    $changeWhatInfo: (item: IChangeInfo) => void;
}

function ItemModal({ $closeModal, $changeWhatInfo, $itemId }: IModalItem) {

    const { areaItems, areas, enemies } = useAppSelector(state => state.userReducer);

    const item = areaItems.find(i => i.id === $itemId)!;

    const backgroundColor = getItemBackground(item.rare);
    const backgroundHoveredColor = getItemHoveredBackground(item.rare);

    useEffect(() => {

    }, [])

    return (
        <Modal
            color={backgroundColor}
            $flexDirection={"row"}>
            <CircleButton symbol='✕' click={() => $closeModal()} />

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
                        areas.filter(a => a.areaItems.findIndex(i => i.id === $itemId) !== -1)
                            .map(a =>
                                <InfoElem
                                    key={a.id}
                                    id={a.id}
                                    $type={'area'}
                                    $countMax={a.areaItems.find(i => i.id === $itemId)!.countMax}
                                    $countMin={a.areaItems.find(i => i.id === $itemId)!.countMin}
                                    $changeWhatInfo={() => $changeWhatInfo({
                                        whatInfo: 'area',
                                        area: a
                                    })} />)
                    }
                    {
                        enemies.filter(e => e.possibleLoot.findIndex(i => i.id === $itemId) !== -1)
                            .map(ef =>
                                <InfoElem
                                    key={ef.id}
                                    id={ef.id}
                                    $type={'enemy'}
                                    $dropChance={ef.possibleLoot.find(pl => pl.id === $itemId)!.dropChance}
                                    $countMax={ef.possibleLoot.find(pl => pl.id === $itemId)!.countMax}
                                    $countMin={ef.possibleLoot.find(pl => pl.id === $itemId)!.countMin}
                                    $changeWhatInfo={() => $changeWhatInfo({
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
        </Modal>

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

    ${scrollBarX
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

interface IInfoProps {
    color: string;
}

export default ItemModal;