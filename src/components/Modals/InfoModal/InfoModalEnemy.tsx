import { useEffect } from 'react';
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

interface IEnemyModal {
    $enemyId: string;
    $closeModal: Function;

    $changeWhatInfo: (item: IChangeInfo) => void;
}

function EnemyModal({ $closeModal, $changeWhatInfo, $enemyId }: IEnemyModal) {

    const { areaItems, areas, enemies } = useAppSelector(state => state.userReducer);

    const enemy = enemies.find(e => e.id === $enemyId)!;
    let enemyItems: IFullItem[] = [];

    if (enemy) {
        enemyItems = enemy.possibleLoot.map(i => areaItems.find(ai => ai.id === i.id)!)!;
    }

    const backgroundColor = getEnemyBackground(enemy.type);
    console.log($enemyId);
    console.log(enemy.type);
    console.log(backgroundColor);
    const backgroundHoveredColor = getHoveredEnemyBackground(enemy.type);

    useEffect(() => {

    }, [])

    if(enemy.title) return (
        <Modal
            color={backgroundColor}
            $flexDirection={"row"}>
            <CircleButton symbol='✕' click={() => $closeModal()} />

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
                            <InfoElem
                                key={i.id}
                                id={i.id}
                                $type={'item'}
                                $countMax={enemy.possibleLoot.find(pl => pl.id === i.id)!.countMax}
                                $countMin={enemy.possibleLoot.find(pl => pl.id === i.id)!.countMin}
                                $dropChance={enemy.possibleLoot.find(pl => pl.id === i.id)!.dropChance}
                                $changeWhatInfo={() => $changeWhatInfo({
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
                        areas.filter(a => a.enemies.findIndex(e => e.id === $enemyId) !== -1)
                            .map(a =>
                                <InfoElem
                                    key={a.id}
                                    id={a.id}
                                    $type={'area'}
                                    $countMax={a.enemies.find(e => e.id === $enemyId)!.countMax}
                                    $countMin={a.enemies.find(e => e.id === $enemyId)!.countMin}
                                    $changeWhatInfo={() => $changeWhatInfo({
                                        whatInfo: 'area',
                                        area: a
                                    })} />)
                    }
                </List>
            </Section>
        </Modal>

    );
    else return (<></>)
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

export default EnemyModal;