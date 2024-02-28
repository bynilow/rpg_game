import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { getAreaFromId } from '../../../../functions/Areas';
import { IStats } from '../../../../functions/Stats';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { scrollBarX } from '../../../../styles/scrollbars';
import Section from '../../../Section/Section';
import Title from '../../../Title/Title';
import AreaPath from './Mapped/AreaPath';

interface IAreaPathsSectionProps {
    $playerStats: IStats;
    $isBlocked: boolean;
    $isUpdatingLevel: boolean;
    $changeActionType: Function;
    $clearActionType: Function;
    $goLevel: Function;
}

function AreaPathsSection({
    $playerStats,
    $isBlocked,
    $isUpdatingLevel,
    $changeActionType,
    $clearActionType,
    $goLevel}: IAreaPathsSectionProps) {

    const {availablePaths, areas} = useAppSelector(state => state.areaReducer);
    const {inventory} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    const [inventoryWeight, setInventoryWeight] = useState(inventory.reduce((a,v) => a + v.item.weight * v.count ,0));

    const [moveAreaId, setMoveAreaId] = useState<string>('');

    const onClickMove = (id: string) => {
        setMoveAreaId(id);
        $changeActionType();
    }

    const onClickCancelMove = () => {
        setMoveAreaId('');
        $clearActionType();
    }

    return (
        <Section
            $isBlocked={$isBlocked}
            $isBoxShadow
            $isBackgroundTransparent={false}>

            <Title $size='1.5rem'>
                Доступные пути:
            </Title>
            <List key={$isUpdatingLevel.toString()} $isUpdatingLevel={$isUpdatingLevel} >
                {
                    availablePaths.map((p, ind) => <AreaPath
                        key={
                            p.pathId
                            + $playerStats.movementSpeed
                            + $playerStats.capacity
                            + (inventoryWeight > $playerStats.capacity ? inventoryWeight : '')}
                        $index={ind}
                        $isBlocked={$isBlocked}
                        $setMoveAreaId={() => onClickMove(p.pathId)}
                        $clearMoveAreaId={() => onClickCancelMove()}
                        $moveAreaId={moveAreaId}
                        $area={getAreaFromId(areas, p.pathId)}
                        $timeToMove={p.time}
                        $goLevel={() => $goLevel(p)}
                        $playerInventoryWeight={inventoryWeight}
                        $playerInventoryMaxWeight={$playerStats.capacity}
                        $playerMovementSpeed={$playerStats.movementSpeed} />)
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
    min-height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    justify-content: baseline;
    align-items: left;

    padding: 1rem;

    clip-path: circle(0% at 50% 0);
    animation: ${ListAnimation} 2.5s ease;
    animation-fill-mode: forwards;
    animation-direction: ${p => p.$isUpdatingLevel ? 'reverse' : 'normal'};

    pointer-events: ${p => p.$isUpdatingLevel ? 'none' : 'all'};

    overflow-x: hidden;
    overflow-y: scroll;

    ${scrollBarX}

`

export default AreaPathsSection;