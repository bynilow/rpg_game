import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../hooks/redux';
import { IArea, IChangeInfo } from '../../../models/IArea';
import { getAreaBackground, getAreaColor, getHoveredAreaBackground } from '../../../styles/backgrounds';
import { scrollBarX } from '../../../styles/scrollbars';
import Avatar from '../../Avatar/Avatar';
import CircleButton from '../../Buttons/CircleButton';
import Modal from '../Modal';
import InfoElem from './InfoElem';
import Section from '../../Section/Section';

interface IModalArea {
    $area: IArea;
    $closeModal: Function;
    $changeWhatInfo: Function;
}

function AreaModal({ $area, $changeWhatInfo, $closeModal }: IModalArea) {

    const { areas } = useAppSelector(state => state.userReducer);

    const backgroundColor = getAreaBackground($area.color);
    const backgroundHoveredColor = getHoveredAreaBackground($area.color);

    useEffect(() => {

    }, [])

    return (
        <>
            <Section>
                <Avatar
                    $image={$area.avatar}
                    width={'250px'}
                    height={'250px'}
                    $minWidth={'200px'}
                    $minHeight={'200px'} />
                <Title>
                    "{$area.title}"
                </Title>
                <ColorText color={getAreaColor($area.color)}>
                    {
                        $area.color === 'green'
                            ? 'Зеленная зона'
                            : $area.color === 'yellow'
                                ? 'Желтая зона'
                                : 'Красная зона'

                    }
                </ColorText>
                <Description>
                    {
                        $area.description
                    }

                </Description>

            </Section>

            <Section>
                <Title>
                    Местность
                </Title>
                <UpdateText>
                    Обновляется каждые {$area.timeToRespawnAreaItems} минут
                </UpdateText>
                <List>
                    {
                        $area.areaItems.map(i =>
                            <InfoElem
                                key={i.id}
                                id={i.id}
                                $type={'item'}
                                $countMax={i.countMax}
                                $countMin={i.countMin}
                                $changeWhatInfo={() => $changeWhatInfo({
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
                    Обновляются каждые {$area.timeToRespawnAreaEnemies} минут
                </UpdateText>
                <List>
                    {
                        $area.enemies.map(e =>
                            <InfoElem
                                id={e.id}
                                key={e.id}
                                $type={'enemy'}
                                $countMax={e.countMax}
                                $countMin={e.countMin}
                                $levelMin={e.levelMin}
                                $levelMax={e.levelMax}
                                $spawnChance={e.spawnChance}
                                $changeWhatInfo={() => $changeWhatInfo({
                                    whatInfo: 'enemy',
                                    enemyId: e.id
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

export default AreaModal;