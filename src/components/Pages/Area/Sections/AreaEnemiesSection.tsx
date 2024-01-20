import styled from 'styled-components'
import Section from '../../../Section/Section';
import MinutesRemaining from '../UpdatedMinutes/UpdatedMinutes';
import AreaEnemy from '../AreaEnemy';
import { Enemies } from '../../../../data/Enemies';
import { IStats } from '../../../../functions/Stats';
import { IAreaCurrentEnemy } from '../../../../models/IEnemy';

interface IAreaEnemiesSectionProps {
    $isBlocked: boolean;
    $nextRespawnEnemies: string;
    $currentEnemies: IAreaCurrentEnemy[];
    $onClickStartBattle: (e: IAreaCurrentEnemy) => void;
    $setTraderId: (id: string) => void;
}

function AreaEnemiesSection({
    $isBlocked,
    $nextRespawnEnemies,
    $currentEnemies,
    $onClickStartBattle,
    $setTraderId}: IAreaEnemiesSectionProps) {

    return (
        <Section
            $isBlocked={false}
            $isBoxShadow
            $isBackgroundTransparent={false}>

            <Title>Существа: </Title>
            <MinutesRemaining
                $nextUpdateDateTime={$nextRespawnEnemies} />
            <List >
                {
                    $currentEnemies
                        ? $currentEnemies.map((e, ind) =>
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