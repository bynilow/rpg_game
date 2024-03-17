import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { getRandomNumberForLoot } from '../../../../functions/Random';
import { IStats, getStats } from '../../../../functions/Stats';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { IFullItem } from '../../../../models/IAreaItem';
import { addXPAC, mineItemAC, updateAreaItems } from '../../../../store/reducers/ActionCreators';
import { scrollBarX } from '../../../../styles/scrollbars';
import Section from '../../../Section/Section';
import Title from '../../../Title/Title';
import MinutesRemaining from '../UpdatedMinutes/MinutesRemaining';
import AreaItem from './Mapped/AreaItem';

interface IAreaItemsSectionProps {
    $isBlocked: boolean;
    $isUpdatingLevel: boolean;
    $playerStats: IStats;
    $changeActionType: Function;
    $clearActionType: Function;
}

function AreaItemsSection({
    $isBlocked,
    $isUpdatingLevel,
    $playerStats,
    $changeActionType,
    $clearActionType}: IAreaItemsSectionProps) {

    const { currentLocation } = useAppSelector(state => state.areaReducer)
    const { userData, player, playerSkills } = useAppSelector(state => state.userReducer)

    const dispatch = useAppDispatch();

    const [miningItemId, setMiningItemId] = useState<string>('');

    const mineItem = (miningItem: IFullItem) => {
        const chanceExtraLootTree = $playerStats.treeDoubleLootPercentChance;
        const chanceExtraLootOre = $playerStats.oreDoubleLootPercentChance;
        const countLoot = getRandomNumberForLoot(miningItem.type === 'ore' ? chanceExtraLootOre : chanceExtraLootTree);

        dispatch(mineItemAC({
            ...miningItem,
            count: countLoot
        }));
        dispatch(addXPAC(miningItem.baseCountXP * $playerStats.experienceMultiplier));
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

            <Title $size='1.5rem' >
                Местность: 
            </Title>
            <MinutesRemaining
                $timeToUpdate={currentLocation.timeToRespawnAreaItems}
                $nextUpdateDateTime={"2024-01-22T12:00:00"} />

            <List 
                key={
                    playerSkills.treeSpeedMining.level 
                    + playerSkills.oreSpeedMining.level} 
                $isUpdatingLevel={$isUpdatingLevel}>
                {
                    currentLocation.currentAreaItems.map((i: IFullItem, ind) =>
                        <AreaItem
                            key={
                                i.idInArea
                                + currentLocation.id
                            }
                            $index={ind}
                            $isBlocked={$isBlocked}
                            $setIsMiningId={() => onClickMine(i.idInArea)}
                            $clearIsMiningId={() => onClickCancelMine()}
                            $miningId={miningItemId}
                            $item={i}
                            $mineItem={() => mineItem(i)}
                            $playerSpeedMining={
                                i.type === 'tree'
                                    ? getStats(playerSkills, player, []).treeSpeedMining
                                    : getStats(playerSkills, player, []).oreSpeedMining} />)
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
    height: 100%;
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

export default AreaItemsSection;