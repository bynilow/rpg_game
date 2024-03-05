import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Enemies } from '../../../../data/Enemies';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { IAreaCurrentEnemy } from '../../../../models/IEnemy';
import { updateAreaEnemies } from '../../../../store/reducers/ActionCreators';
import { scrollBarX } from '../../../../styles/scrollbars';
import Section from '../../../Section/Section';
import Title from '../../../Title/Title';
import MinutesRemaining from '../UpdatedMinutes/MinutesRemaining';
import AreaEnemy from './Mapped/AreaEnemy';

interface IAreaEnemiesSectionProps {
    $isBlocked: boolean;
    $isUpdatingLevel: boolean;
    $onClickStartBattle: (e: IAreaCurrentEnemy) => void;
    $setTraderId: (id: string) => void;
}

function AreaEnemiesSection({
    $isBlocked,
    $isUpdatingLevel,
    $onClickStartBattle,
    $setTraderId}: IAreaEnemiesSectionProps) {

    const {currentLocation} = useAppSelector(state => state.areaReducer);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (new Date(currentLocation.nextRespawnAreaEnemies).getTime() < (new Date()).getTime()) {
            dispatch(updateAreaEnemies({
                levelId: currentLocation.id,
                enemies: currentLocation.enemies
            }));
        }
    }, [currentLocation.id])

    return (
        <Section
            $isBlocked={$isBlocked}
            $isBoxShadow
            $isBackgroundTransparent={false}>

            <Title $size='1.5rem'>
                Существа: 
            </Title>
            <MinutesRemaining
                $timeToUpdate={currentLocation.timeToRespawnAreaEnemies}
                $nextUpdateDateTime={currentLocation.nextRespawnAreaEnemies} />
            <List key={$isUpdatingLevel.toString()} $isUpdatingLevel={$isUpdatingLevel}>
                {
                    currentLocation.currentEnemies
                        ? currentLocation.currentEnemies.map((e, ind) =>
                            <AreaEnemy
                                key={e.idInArea}
                                id={e.id}
                                $isBlocked={$isBlocked}
                                $idInArea={e.idInArea}
                                $onClick={
                                    Enemies.find(fe => fe.id === e.id)!.type !== 'trader'
                                        ? () => $onClickStartBattle(e)
                                        : () => $setTraderId(e.id)
                                }
                                $index={ind}
                                $level={e.level} />)
                        : null
                }
            </List>
        </Section>
    );
}

const ListAnimation = keyframes`
    from{
        clip-path: circle(0% at 50% 0);
    }
    to{
        clip-path: circle(150% at 50% 0);
    }
`


interface IListProps {
    $isUpdatingLevel: boolean;
}

const List = styled.div<IListProps>`
    width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    justify-content: baseline;
    align-items: left;

    padding: 1rem;

    clip-path: circle(0% at 50% 0);
    animation: ${ListAnimation} 2.5s ease;
    animation-direction: ${p => p.$isUpdatingLevel ? 'reverse' : 'normal'};
    animation-fill-mode: forwards;

    pointer-events: ${p => p.$isUpdatingLevel ? 'none' : 'all'};

    overflow-x: hidden;
    overflow-y: scroll;

    ${scrollBarX}

`

export default AreaEnemiesSection;