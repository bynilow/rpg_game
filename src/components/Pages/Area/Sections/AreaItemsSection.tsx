import styled from 'styled-components'
import Section from '../../../Section/Section';
import MinutesRemaining from '../UpdatedMinutes/UpdatedMinutes';
import { IAreaItem, IFullItem } from '../../../../models/IAreaItem';
import AreaItem from '../AreaItem';
import { useEffect, useState } from 'react';
import { IStats } from '../../../../functions/Stats';
import { getRandomNumberForLoot } from '../../../../functions/Random';
import { useAppDispatch } from '../../../../hooks/redux';
import { addXP, mineItem } from '../../../../store/reducers/ActionCreators';

interface IAreaItemsSectionProps {
    $isBlocked: boolean;
    $nextRespawnItems: string;
    $currentAreaItems: IFullItem[];
    $currentLocationId: string;
    $playerStats: IStats;

}

function AreaItemsSection({
    $isBlocked,
    $nextRespawnItems,
    $currentAreaItems,
    $currentLocationId, 
    $playerStats}: IAreaItemsSectionProps) {

    const dispatch = useAppDispatch();

    const [miningItemId, setMiningItemId] = useState<string>('');

    const onClickItem = (miningItem: IFullItem) => {
        const chanceExtraLootTree = $playerStats.treeDoubleLootPercentChance;
        const chanceExtraLootOre = $playerStats.oreDoubleLootPercentChance;
        const countLoot = getRandomNumberForLoot(miningItem.type === 'ore' ? chanceExtraLootOre : chanceExtraLootTree);
        console.log(countLoot)
        dispatch(mineItem({
            ...miningItem,
            count: countLoot
        }));
        dispatch(addXP(miningItem.baseCountXP * $playerStats.experienceMultiplier));
    }

    useEffect(() => {

    }, [$playerStats])

    return (
        <Section
            $isBlocked={$isBlocked}
            $isBoxShadow
            $isBackgroundTransparent={false} >

            <Title>Местность: </Title>
            <MinutesRemaining
                $nextUpdateDateTime={$nextRespawnItems} />

            <List>
                {
                    $currentAreaItems.map((i: IFullItem, ind) =>
                        <AreaItem
                            key={
                                i.idInArea
                                + $currentLocationId
                                + $playerStats.oreSpeedMining
                                + $playerStats.treeSpeedMining
                            }
                            $index={ind}
                            $setIsMiningId={() => setMiningItemId(i.idInArea)}
                            $clearIsMiningId={() => setMiningItemId('')}
                            $miningId={miningItemId}
                            $item={i}
                            $mineItem={() => onClickItem(i)}
                            $playerSpeedMining={
                                i.type === 'tree'
                                    ? $playerStats.treeSpeedMining
                                    : $playerStats.oreSpeedMining} />)
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


export default AreaItemsSection;