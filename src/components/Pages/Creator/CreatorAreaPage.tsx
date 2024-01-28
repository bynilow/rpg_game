import { useState } from 'react';
import styled from 'styled-components'
import { IAreaItem, ICraftItem, IFullItem, IRare } from '../../../models/IAreaItem';
import { IArmor, ITool, IWeapon } from '../../../models/IEquipment';
import { IAreaEnemy } from '../../../models/IEnemy';
import { IArea } from '../../../models/IArea';
import { Items } from '../../../data/AreaItems';
import { Enemies } from '../../../data/Enemies';

interface ICreatorPageItemProps {

}

function CreatorPageArea() {

    const [title, setTitle] = useState('');
    const [id, setId] = useState('');
    const [color, setColor] = useState<'green' | 'yellow' | 'red'>('green');
    const [avatar, setAvatar] = useState('');
    const [description, setDescription] = useState('');
    const [areaItems, setAreaItems] = useState<IAreaItem[]>([]);
    const [areaEnemies, setAreaEnemies] = useState<IAreaEnemy[]>([]);
    const [respawnItemsMinutes, setRespawnItemsMinutes] = useState(0);
    const [respawnEnemiesMinutes, setRespawnEnemiesMinutes] = useState(0);

    const [selectItemID, setSelectItemID] = useState('birch_tree');
    const [minCountSelectedItem, setMinCountSelectedItem] = useState(0);
    const [maxCountSelectedItem, setMaxCountSelectedItem] = useState(0);

    const [selectEnemyID, setSelectEnemyID] = useState('bandit');
    const [minCountSelectedEnemy, setMinCountSelectedEnemy] = useState(0);
    const [maxCountSelectedEnemy, setMaxCountSelectedEnemy] = useState(0);
    const [minLevelEnemy, setMinLevelEnemy] = useState(1);
    const [maxLevelEnemy, setMaxLevelEnemy] = useState(1);
    const [spawnChanceEnemy, setSpawnChanceEnemy] = useState(100);


    const onClickSave = () => {
        const area: IArea = {
            id,
            title,
            color,
            avatar,
            description,
            areaItems,
            stateId: '',
            enemies: areaEnemies,
            currentAreaItems: [],
            currentEnemies: [],
            timeToRespawnAreaItems: respawnItemsMinutes,
            timeToRespawnAreaEnemies: respawnEnemiesMinutes,
            nextRespawnAreaItems: '0',
            nextRespawnAreaEnemies: '0',
            lastRespawnAreaItems: '0',
            lastRespawnAreaEnemies: '0'
        }
    }

    return (
        <Page>
            <input
                type='text'
                placeholder='title'
                value={title}
                onChange={e => setTitle(e.currentTarget.value)} />
            <input
                type='text'
                placeholder='id'
                value={id}
                onChange={e => setId(e.currentTarget.value)} />
            <select
                value={color}
                onChange={e =>
                    setColor(
                        e.currentTarget.value === 'green'
                            ? 'green'
                            : e.currentTarget.value === 'yellow'
                                ? 'yellow'
                                : 'red')}>
                <option value='green'>
                    green
                </option>
                <option value='yellow'>
                    yellow
                </option>
                <option value='red'>
                    red
                </option>
            </select>
            <input
                type='text'
                placeholder='avatar'
                value={avatar}
                onChange={e => setAvatar(e.currentTarget.value)} />
            <input
                type='text'
                placeholder='description'
                value={description}
                onChange={e => setDescription(e.currentTarget.value)} />
            <input
                type='number'
                placeholder='items resp'
                value={respawnItemsMinutes}
                onChange={e => setRespawnItemsMinutes(Number(e.currentTarget.value))} />
            <input
                type='number'
                placeholder='enemies resp'
                value={respawnEnemiesMinutes}
                onChange={e => setRespawnEnemiesMinutes(Number(e.currentTarget.value))} />

            <p>Предметы</p>
            <select value={selectItemID} onChange={e => setSelectItemID(e.currentTarget.value)}>
                {
                    Items.filter(i => i.type === 'tree' || i.type === 'ore')
                        .map(i =>
                            <option value={i.id}>
                                {i.title}
                            </option>
                    )
                }
            </select>
            <div>
                <input
                    type='number'
                    placeholder='time to mining'
                    value={minCountSelectedItem}
                    onChange={e => setMinCountSelectedItem(Number(e.currentTarget.value))} />
                Мин количество
            </div>
            <div>
                <input
                    type='number'
                    placeholder='time to mining'
                    value={maxCountSelectedItem}
                    onChange={e => setMaxCountSelectedItem(Number(e.currentTarget.value))} />
                Макс количество
            </div>
            <button onClick={() => setAreaItems(ai => [
                ...ai, 
                {
                    id: selectItemID,
                    countMin: minCountSelectedItem,
                    countMax: maxCountSelectedItem
                }])}>
                add
            </button>
            <button onClick={() => setAreaItems([])}>
                clear
            </button>
            {
                areaItems.map(i => 
                <div>
                    {
                        i.id
                    }
                </div>)
            }

            <p>Существа</p>
            <select value={selectEnemyID} onChange={e => setSelectEnemyID(e.currentTarget.value)}>
                {
                    Enemies.map(e =>
                        <option value={e.id}>
                            {e.title}
                        </option>
                    )
                }
            </select>
            <div>
                <input
                    type='number'
                    placeholder='time to mining'
                    value={minCountSelectedEnemy}
                    onChange={e => setMinCountSelectedEnemy(Number(e.currentTarget.value))} />
                Мин количество
            </div>
            <div>
                <input
                    type='number'
                    placeholder='time to mining'
                    value={maxCountSelectedEnemy}
                    onChange={e => setMaxCountSelectedEnemy(Number(e.currentTarget.value))} />
                Макс количество
            </div>
            <div>
                <input
                    type='number'
                    placeholder='time to mining'
                    value={minLevelEnemy}
                    onChange={e => setMinLevelEnemy(Number(e.currentTarget.value))} />
                Мин уровень
            </div>
            <div>
                <input
                    type='number'
                    placeholder='time to mining'
                    value={maxLevelEnemy}
                    onChange={e => setMaxLevelEnemy(Number(e.currentTarget.value))} />
                Макс уровень
            </div>
            <div>
                <input
                    type='number'
                    placeholder='time to mining'
                    value={spawnChanceEnemy}
                    onChange={e => setSpawnChanceEnemy(Number(e.currentTarget.value))} />
                Спавн шанс
            </div>

            <button onClick={() => setAreaEnemies(ae => [
                ...ae, 
                {
                    id: selectEnemyID,
                    countMin: minCountSelectedItem,
                    countMax: maxCountSelectedItem,
                    levelMin: minLevelEnemy,
                    levelMax: maxLevelEnemy,
                    spawnChance: spawnChanceEnemy
                }])}>
                add
            </button>
            <button onClick={() => setAreaEnemies([])}>
                clear
            </button>
            {
                areaEnemies.map(i => 
                <div>
                    {
                        i.id
                    }
                </div>)
            }

            <button onClick={() => onClickSave()}>
                Сохр
            </button>
        </Page>
    );
}

const List = styled.div`
    display: flex;
    flex-direction: column;
`

const Page = styled.div`
    width: 100vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    padding: 1.5em;
    gap: 10px;
    overflow-y: scroll;

`


export default CreatorPageArea;