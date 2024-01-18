import { useEffect, useState } from 'react';
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
    $id: string;
    $closeModal: Function;
    $changeWhatInfo: (info: IChangeInfo) => void;
}

function AreaModal({ $id, $changeWhatInfo, $closeModal }: IModalArea) {

    const { areas } = useAppSelector(state => state.userReducer);

    const [thisArea, setThisArea] = useState(areas.find(a => a.id === $id)!);

    const backgroundColor = getAreaBackground(thisArea.color);
    const backgroundHoveredColor = getHoveredAreaBackground(thisArea.color);

    useEffect(() => {

    }, [])

    return (
        <>
            <Section>
                <Avatar
                    $image={thisArea.avatar}
                    width={'250px'}
                    height={'250px'}
                    $minWidth={'200px'}
                    $minHeight={'200px'} />
                <Title>
                    "{thisArea.title}"
                </Title>
                <ColorText color={getAreaColor(thisArea.color)}>
                    {
                        thisArea.color === 'green'
                            ? 'Зеленная зона'
                            : thisArea.color === 'yellow'
                                ? 'Желтая зона'
                                : 'Красная зона'

                    }
                </ColorText>
                <Description>
                    {
                        thisArea.description
                    }

                </Description>

            </Section>

            <Section>
                <Title>
                    Местность
                </Title>
                <UpdateText>
                    Обновляется каждые {thisArea.timeToRespawnAreaItems} минут
                </UpdateText>
                <List>
                    {
                        thisArea.areaItems.map(i =>
                            <InfoElem
                                key={i.id}
                                id={i.id}
                                $type={'item'}
                                $countMax={i.countMax}
                                $countMin={i.countMin}
                                $changeWhatInfo={() => $changeWhatInfo({
                                    whatInfo: 'item',
                                    id: i.id
                                })} />)
                    }

                </List>
            </Section>

            <Section>
                <Title>
                    Враги
                </Title>
                <UpdateText>
                    Обновляются каждые {thisArea.timeToRespawnAreaEnemies} минут
                </UpdateText>
                <List>
                    {
                        thisArea.enemies.map(e =>
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
                                    id: e.id
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