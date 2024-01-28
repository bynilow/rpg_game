import styled from 'styled-components'
import Section from '../../../Section/Section';
import MinutesRemaining from '../UpdatedMinutes/MinutesRemaining';
import AreaEnemy from './Mapped/AreaEnemy';
import { Enemies } from '../../../../data/Enemies';
import { IStats } from '../../../../functions/Stats';
import { IAreaCurrentEnemy } from '../../../../models/IEnemy';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { updateAreaEnemies } from '../../../../store/reducers/ActionCreators';
import Title from '../../../Title/Title';

interface IAreaEnemiesSectionProps {
    $isBlocked: boolean;
    $onClickStartBattle: (e: IAreaCurrentEnemy) => void;
    $setTraderId: (id: string) => void;
}

function AreaEnemiesSection({
    $isBlocked,
    $onClickStartBattle,
    $setTraderId}: IAreaEnemiesSectionProps) {

    const {currentLocation} = useAppSelector(state => state.userReducer);

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
            <List >
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

const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: center;
  align-items: left;
  margin-top: 10px;

`

export default AreaEnemiesSection;