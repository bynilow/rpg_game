import styled from 'styled-components'
import Section from '../../../Section/Section';
import { IAviablePath, IPath } from '../../../../models/IArea';
import AreaPath from '../AreaPath';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { IStats } from '../../../../functions/Stats';
import { useState } from 'react';
import { goLevel } from '../../../../store/reducers/ActionCreators';
import { getAreaFromId } from '../../../../functions/Areas';

interface IAreaPathsSectionProps {
    $playerStats: IStats;
    $inventoryWeight: number;
}

function AreaPathsSection({
    $playerStats,
    $inventoryWeight}: IAreaPathsSectionProps) {

    const {availablePaths, areas} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    const [moveAreaId, setMoveAreaId] = useState<string>('');

    const onClickGoLevel = (selectedPath: IAviablePath) => {
        dispatch(goLevel(selectedPath.pathId));
    }


    return (
        <Section
            $isBlocked={false}
            $isBoxShadow
            $isBackgroundTransparent={false}>

            <Title>Доступные пути:</Title>
            <List>
                {
                    availablePaths.map((p, ind) => <AreaPath
                        key={
                            p.pathId
                            + $playerStats.movementSpeed
                            + $playerStats.capacity
                            + ($inventoryWeight > $playerStats.capacity ? $inventoryWeight : '')}
                        $index={ind}
                        $setMoveAreaId={() => setMoveAreaId(p.pathId)}
                        $clearMoveAreaId={() => setMoveAreaId('')}
                        $moveAreaId={moveAreaId}
                        $area={getAreaFromId(areas, p.pathId)}
                        $timeToMove={p.time}
                        $goLevel={() => onClickGoLevel(p)}
                        $playerInventoryWeight={$inventoryWeight}
                        $playerInventoryMaxWeight={$playerStats.capacity}
                        $playerMovementSpeed={$playerStats.movementSpeed} />)
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

export default AreaPathsSection;