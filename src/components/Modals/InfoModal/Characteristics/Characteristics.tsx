import { IFullItem } from '../../../../models/IAreaItem';
import { IEnemy } from '../../../../models/IEnemy';
import EnemyCharacteristics from './EnemyCharacteristics';
import EquipmentCharacteristics from './EquipmentCharacteristics';

interface ICharacteristics {
    item?: IFullItem;
    enemy?: IEnemy;
}

function Characteristics({item, enemy}: ICharacteristics) {

    return (  
        item 
            ? <EquipmentCharacteristics item={item} />
            : <EnemyCharacteristics enemy={enemy!} />
    );
}



export default Characteristics;