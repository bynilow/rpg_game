import styled from 'styled-components';
import { findStat } from '../../../../library/StatsLibrary';
import { IEnemy } from '../../../../models/IEnemy';
import PropertyItem from './Property/PropertyItem';

interface IEnemyCharacteristics {
    enemy: IEnemy;
}

function EnemyCharacteristics({ enemy }: IEnemyCharacteristics) {

    return (
        <CharacteristicsBlock>
            {
                enemy.type === 'enemy'
                    ? Object.keys(enemy.stats!).map(s =>
                        <PropertyItem
                            $isEnemy={true}
                            $property={(enemy.stats as any)[s]}
                            $propertyName={findStat(s).name}
                            $type={findStat(s).type} />)
                    : null
            }


        </CharacteristicsBlock>
    );
}

const CharacteristicsBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export default EnemyCharacteristics;