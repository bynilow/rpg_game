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
        if (currentLocation && new Date(currentLocation.nextRespawnAreaEnemies).getTime() < (new Date()).getTime()) {
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

            <Title>Существа: </Title>
            <MinutesRemaining
                $nextUpdateDateTime={currentLocation.nextRespawnAreaEnemies} />
            <List >
                {
                    currentLocation.currentEnemies
                        ? currentLocation.currentEnemies.map((e, ind) =>
                            <AreaEnemy
                                key={e.idInArea}
                                id={e.id}
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
  gap: 20px;
  justify-content: center;
  align-items: left;
  margin-top: 10px;

`

const Title = styled.p`
  font-size: 20px;
  margin: 0;
`

export default AreaEnemiesSection;