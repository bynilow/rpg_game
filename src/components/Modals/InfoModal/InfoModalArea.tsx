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
import Title from '../../Title/Title';

interface IModalArea {
    $id: string;
    $closeModal: Function;
    $changeWhatInfo: (info: IChangeInfo) => void;
}

function AreaModal({ $id, $changeWhatInfo, $closeModal }: IModalArea) {

    const { areas } = useAppSelector(state => state.userReducer);

    const [thisArea, setThisArea] = useState(areas.find(a => a.id === $id)!);

    return (
        <>
            <Section $gap='1rem' $haveScroll>
                <Avatar
                    key='avatar'
                    $image={thisArea.avatar}
                    width='15rem'
                    height='15rem'
                    $minHeight='15rem'
                    $minWidth='15rem' />
                <Title $size='2rem'>
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

            <Section $haveScroll>
                <Title $size='2rem'>
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

            <Section $haveScroll>
                <Title $size='2rem'>
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

const UpdateText = styled.p`
    font-size: 1rem;
    margin: 0;
`

const Description = styled.p`
    font-size: 1.3rem;
    margin: 0;
`

export default AreaModal;