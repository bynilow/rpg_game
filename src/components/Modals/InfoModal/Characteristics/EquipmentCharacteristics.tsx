import styled from 'styled-components'
import PropertyItem from './Property/PropertyItem';
import { findStat } from '../../../../library/StatsLibrary';
import { IFullItem } from '../../../../models/IAreaItem';

interface IEquipmentCharacteristicsProps {
    item: IFullItem;
}

function EquipmentCharacteristics({ item }: IEquipmentCharacteristicsProps) {

    return (
        <CharacteristicsBlock>
            <PropertyItem
                $property={item.timeToMining}
                $propertyName='Скорость создания / добычи'
                $type='s' />
            <PropertyItem
                $property={item.baseCountXP}
                $propertyName='Получаемый опыт'
                $type='' />
            {
                item.type === 'armor'
                    ? Object.keys(item.armorStats!).map(s =>
                        <PropertyItem
                            $property={(item.armorStats as any)[s]}
                            $propertyName={findStat(s).name}
                            $type={findStat(s).type} />)

                    : item.type === 'weapon'
                        ? Object.keys(item.weaponStats!).map(s =>
                            <PropertyItem
                                $property={(item.weaponStats as any)[s]}
                                $propertyName={findStat(s).name}
                                $type={findStat(s).type} />)

                        : item.type === 'tool'
                            ? Object.keys(item.toolStats!).map(s =>
                                <PropertyItem
                                    $property={(item.toolStats as any)[s]}
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

export default EquipmentCharacteristics;