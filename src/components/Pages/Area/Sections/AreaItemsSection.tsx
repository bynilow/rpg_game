import styled from 'styled-components'
import Section from '../../../Section/Section';
import MinutesRemaining from '../UpdatedMinutes/MinutesRemaining';
import { IAreaItem, IFullItem } from '../../../../models/IAreaItem';
import AreaItem from './Mapped/AreaItem';
import { useEffect, useState } from 'react';
import { IStats } from '../../../../functions/Stats';
import { getRandomNumberForLoot } from '../../../../functions/Random';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { addMinedItem, addXP, getAvailablePaths, setInventoryFromStorage, setPlayerFromStorage, setSkillsFromStorage, updateAreaItems } from '../../../../store/reducers/ActionCreators';
import Title from '../../../Title/Title';

interface IAreaItemsSectionProps {
    $isBlocked: boolean;
    $playerStats: IStats;
    $changeActionType: Function;
    $clearActionType: Function;

}

function AreaItemsSection({
    $isBlocked,
    $playerStats,
    $changeActionType,
    $clearActionType}: IAreaItemsSectionProps) {

    const {availablePaths, currentLocation } = useAppSelector(state => state.userReducer)

    const dispatch = useAppDispatch();

    const [miningItemId, setMiningItemId] = useState<string>('');

    const mineItem = (miningItem: IFullItem) => {
        const chanceExtraLootTree = $playerStats.treeDoubleLootPercentChance;
        const chanceExtraLootOre = $playerStats.oreDoubleLootPercentChance;
        const countLoot = getRandomNumberForLoot(miningItem.type === 'ore' ? chanceExtraLootOre : chanceExtraLootTree);
        console.log(countLoot)
        dispatch(addMinedItem({
            ...miningItem,
            count: countLoot
        }));
        dispatch(addXP(miningItem.baseCountXP * $playerStats.experienceMultiplier));
    }

    const onClickMine = (id: string) => {
        setMiningItemId(id);
        $changeActionType();
    }

    const onClickCancelMine = () => {
        setMiningItemId('');
        $clearActionType();
    }
    
    useEffect(() => {
        if (new Date(currentLocation!.nextRespawnAreaItems).getTime() < (new Date()).getTime()) {
            dispatch(updateAreaItems({
                levelId: currentLocation.id,
                date: new Date().toISOString(),
                itemsToUpdate: currentLocation.areaItems || []
            }));
        }
    }, [currentLocation.id])

    return (
        <Section
            $isBlocked={$isBlocked}
            $isBoxShadow
            $isBackgroundTransparent={false} >

            <Title $size='1.5rem'>
                Местность: 
            </Title>
            <MinutesRemaining
                $timeToUpdate={currentLocation.timeToRespawnAreaItems}
                $nextUpdateDateTime={"2024-01-22T12:00:00"} />

            <List>
                {
                    currentLocation.currentAreaItems.map((i: IFullItem, ind) =>
                        <AreaItem
                            key={
                                i.idInArea
                                + currentLocation.id
                                + $playerStats.oreSpeedMining
                                + $playerStats.treeSpeedMining
                            }
                            $index={ind}
                            $setIsMiningId={() => onClickMine(i.idInArea)}
                            $clearIsMiningId={() => onClickCancelMine()}
                            $miningId={miningItemId}
                            $item={i}
                            $mineItem={() => mineItem(i)}
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
  gap: 1.5em;
  justify-content: center;
  align-items: left;
  margin-top: 10px;

`

export default AreaItemsSection;