import { useState } from 'react';
import styled from 'styled-components'
import { ICraftItem, IFullItem, IRare } from '../../../models/IAreaItem';
import { IArmor, ITool, IWeapon } from '../../../models/IEquipment';

interface ICreatorPageItemProps {

}

function CreatorPageItem() {

    const [title, setTitle] = useState('');
    const [id, setId] = useState('');
    const [rare, setRare] = useState('');
    const [avatar, setAvatar] = useState('');
    const [description, setDescription] = useState('');
    const [timeToMining, setTimeToMining] = useState(0);
    const [type, setType] = useState('');
    const [cost, setCost] = useState(0);
    const [xp, setXp] = useState(0);
    const [weight, setWeight] = useState(0);
    const [itemsToCraft, setItemsToCraft] = useState('');

    const [isArmor, setIsArmor] = useState(false);
    const [health, setHealth] = useState(0);
    const [missArmor, setMissArmor] = useState(0);
    const [dodge, setDodge] = useState(0);
    const [movement, setMovement] = useState(0);
    const [attack, setAttack] = useState(0);


    const [isCrafting, setIsCrafting] = useState(false);
    const [craftingItems, setCraftingItems] = useState<ICraftItem[]>([]);
    const [craftingItemId, setCraftingItemId] = useState('');
    const [craftingItemsCount, setCraftingItemCount] = useState(0);

    const [isTool, setIsTool] = useState(false);
    const [speed, setSpeed] = useState(0);
    const [double, setDouble] = useState(0);

    const [isWeapon, setIsWeapon] = useState(false);
    const [damage, setDamage] = useState(0);
    const [missWeapon, setMissWeapon] = useState(0);
    const [blockingChance, setBlockingChance] = useState(0);
    const [blockingMultiplier, setBlockingMultiplier] = useState(0);
    const [critMultiplier, setCritMultiplier] = useState(0);
    const [critChance, setCritChance] = useState(0);
    const [speedWeapon, setSpeedWeapon] = useState(0);


    const onClickSave = () => {
        const item: IFullItem = {
            id: id + '_common',
            idInArea: '',
            title,
            rare: rare === 'common' ? 'common' : rare === 'uncommon' ? 'uncommon' : rare === 'rare' ? 'rare' : rare === 'mythical' ? 'mythical' : 'legendary',
            avatar,
            description,
            dateReceiving: '',
            baseCountXP: xp,
            cost,
            timeToMining,
            type,
            weight,
            itemsToCraft: craftingItems || []

        }
        if(isArmor){
            const stats: IArmor = {
                healthMultiplier: health,
                dodgeChance: dodge,
                missChance: missArmor,
                speedAttack: attack,
                speedMovement: movement
            }
            item.armorStats = stats;
            let items: IFullItem[] = [];
            items.push(item)
            for(let i = 1; i < 5; i++){
                const rareIter = 
                    i === 1 
                    ? 'uncommon' 
                    : i === 2 
                    ? 'rare' 
                    : i === 3 
                    ? 'mythical' 
                    : 'legendary'

                items.push({
                    ...item, 
                    id: id + '_' + rareIter,
                    timeToMining: Number((items[i - 1].timeToMining * 1.5).toFixed(1)),
                    cost: Number((items[i - 1].cost * 1.5).toFixed(1)),
                    baseCountXP: Number((items[i - 1].baseCountXP * 1.5).toFixed(1)),
                    weight: Number((items[i - 1].weight * 1.5).toFixed(1)),
                    rare: rareIter,
                    armorStats: {
                        healthMultiplier: Number((items[i - 1].armorStats!.healthMultiplier + 0.1).toFixed(1)),
                        dodgeChance: Number((items[i - 1].armorStats!.dodgeChance + 0.1).toFixed(1)),
                        missChance: Number((items[i - 1].armorStats!.missChance - 0.1).toFixed(1)),
                        speedAttack: Number((items[i - 1].armorStats!.speedAttack - 0.1).toFixed(1)),
                        speedMovement: Number((items[i - 1].armorStats!.speedMovement - 0.1).toFixed(1)),
                    },
                    itemsToCraft: craftingItems || []})
            }
            console.log(items)
        }
        else if (isTool) {
           
                const stats: ITool = {
                    miningSpeed: speed,
                    doubleChancePercent: double,
                }
                item.toolStats = stats;
                let items: IFullItem[] = [];
                items.push(item)
                for (let i = 1; i < 5; i++) {
                    const rareIter =
                        i === 1
                            ? 'uncommon'
                            : i === 2
                                ? 'rare'
                                : i === 3
                                    ? 'mythical'
                                    : 'legendary'

                    items.push({
                        ...item,
                        id: id + '_' + rareIter,
                        timeToMining: Number((items[i - 1].timeToMining * 1.5).toFixed(1)),
                        cost: Number((items[i - 1].cost * 1.5).toFixed(1)),
                        baseCountXP: Number((items[i - 1].baseCountXP * 1.5).toFixed(1)),
                        weight: Number((items[i - 1].weight * 1.5).toFixed(1)),
                        rare: rareIter,
                        toolStats: {
                            miningSpeed: Number((items[i - 1].toolStats!.miningSpeed - 0.5).toFixed(1)),
                            doubleChancePercent: Number((items[i - 1].toolStats!.doubleChancePercent + 10).toFixed(1)),
                        },
                        itemsToCraft: craftingItems || []
                    })
                }
                console.log(items)
            
        }
        else if(isWeapon){
            const stats: IWeapon = {
                damage: damage,
                missChance: missWeapon,
                blockingChancePercent: blockingChance,
                blockingMultiplier: blockingMultiplier,
                critChance: critChance,
                critDamageMultiplier: critMultiplier,
                speedAttack: speedWeapon
            }
            item.weaponStats = stats;
            let items: IFullItem[] = [];
            items.push(item)
            for(let i = 1; i < 5; i++){
                const rareIter = 
                    i === 1 
                    ? 'uncommon' 
                    : i === 2 
                    ? 'rare' 
                    : i === 3 
                    ? 'mythical' 
                    : 'legendary'

                items.push({
                    ...item, 
                    id: id + '_' + rareIter,
                    timeToMining: Number((items[i - 1].timeToMining * 1.5).toFixed(1)),
                    cost: Number((items[i - 1].cost * 1.5).toFixed(1)),
                    baseCountXP: Number((items[i - 1].baseCountXP * 1.5).toFixed(1)),
                    weight: Number((items[i - 1].weight * 1.5).toFixed(1)),
                    rare: rareIter,
                    weaponStats: {
                        damage: Number((items[i - 1].weaponStats!.damage * 1.5).toFixed(1)),
                        missChance: Number((items[i - 1].weaponStats!.missChance - 0.2).toFixed(1)),
                        blockingChancePercent: Number((items[i - 1].weaponStats!.blockingChancePercent + 0.5).toFixed(1)),
                        blockingMultiplier: Number((items[i - 1].weaponStats!.blockingMultiplier + 0.2).toFixed(1)),
                        critChance: Number((items[i - 1].weaponStats!.critChance + 0.5).toFixed(1)),
                        critDamageMultiplier: Number((items[i - 1].weaponStats!.critDamageMultiplier + 0.3).toFixed(1)),
                        speedAttack: Number((items[i - 1].weaponStats!.speedAttack - 0.35).toFixed(1)),
                    },
                    itemsToCraft: craftingItems || []})
            }
            console.log(items)
        }
        else {
            console.log(item)
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
            <input
                type='text'
                placeholder='rare'
                value={rare}
                onChange={e => setRare(e.currentTarget.value)} />
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
                type='text'
                placeholder='type'
                value={type}
                onChange={e => setType(e.currentTarget.value)} />
            <div>
                <input
                    type='number'
                    placeholder='time to mining'
                    value={timeToMining}
                    onChange={e => setTimeToMining(Number(e.currentTarget.value))} />
                Время
            </div>
            <div>
                <input
                    type='number'
                    placeholder='cost'
                    value={cost}
                    onChange={e => setCost(Number(e.currentTarget.value))} />
                Цена
            </div>
            <div>
                <input
                    type='number'
                    placeholder='cost'
                    value={xp}
                    onChange={e => setXp(Number(e.currentTarget.value))} />
                Опыт
            </div>
            <div>
                <input
                    type='number'
                    placeholder='weight'
                    value={weight}
                    onChange={e => setWeight(Number(e.currentTarget.value))} />
                Вес
            </div>
            <div>
                <input
                    type='checkbox'
                    checked={isArmor}
                    onClick={() => setIsArmor(!isArmor)} />
                Броня
            </div>
            {
                isArmor
                    ? <div>
                        <div>
                            <input
                                type='text'
                                step="0.1"
                                placeholder='health'
                                value={health}
                                onChange={e => setHealth(Number(e.currentTarget.value))} />
                            ОЗ множитель
                        </div>
                        <div>
                            <input
                                type='text'
                                step="0.1"
                                placeholder='missArmor'
                                value={missArmor}
                                onChange={e => setMissArmor(Number(e.currentTarget.value))} />
                            Шанс промаха
                        </div>
                        <div>
                            <input
                                type='text'
                                step="0.1"
                                placeholder='dodge'
                                value={dodge}
                                onChange={e => setDodge(Number(e.currentTarget.value))} />
                            Шанс уклонения
                        </div>
                        <div>
                            <input
                                type='text'
                                step="0.1"
                                placeholder='movement'
                                value={movement}
                                onChange={e => setMovement(Number(e.currentTarget.value))} />
                            Предвижение
                        </div>
                        <div>
                            <input
                                type='text'
                                step="0.1"
                                placeholder='attack'
                                value={attack}
                                onChange={e => setAttack(Number(e.currentTarget.value))} />
                            Атака
                        </div>
                    </div>
                : null
            }
            <div>
                <input
                    type='checkbox'
                    checked={isTool}
                    onClick={() => setIsTool(!isTool)} />
                Инструмент
            </div>

            <div>
                <input
                    type='checkbox'
                    checked={isWeapon}
                    onClick={() => setIsWeapon(!isWeapon)} />
                Оружие
            </div>
            {
                isWeapon
                    ? <div>
                        <div>
                            <input
                                type='text'
                                step="0.1"
                                placeholder='damage'
                                value={damage}
                                onChange={e => setDamage(Number(e.currentTarget.value))} />
                            Урон
                        </div>
                        <div>
                            <input
                                type='text'
                                step="0.1"
                                placeholder='missWeapon'
                                value={missWeapon}
                                onChange={e => setMissWeapon(Number(e.currentTarget.value))} />
                            Шанс промаха
                        </div>
                        <div>
                            <input
                                type='text'
                                step="0.1"
                                placeholder='blockchance'
                                value={blockingChance}
                                onChange={e => setBlockingChance(Number(e.currentTarget.value))} />
                            Шанс блокирования
                        </div>
                        <div>
                            <input
                                type='text'
                                step="0.1"
                                placeholder='blockingmultuplier'
                                value={blockingMultiplier}
                                onChange={e => setBlockingMultiplier(Number(e.currentTarget.value))} />
                            Множитель блокирования
                        </div>
                        <div>
                            <input
                                type='text'
                                step="0.1"
                                placeholder='critchance'
                                value={critChance}
                                onChange={e => setCritChance(Number(e.currentTarget.value))} />
                            Шанс крита
                        </div>
                        <div>
                            <input
                                type='text'
                                step="0.1"
                                placeholder='critmult'
                                value={critMultiplier}
                                onChange={e => setCritMultiplier(Number(e.currentTarget.value))} />
                            Множитель крита
                        </div>
                        <div>
                            <input
                                type='text'
                                step="0.1"
                                placeholder='attack'
                                value={speedWeapon}
                                onChange={e => setSpeedWeapon(Number(e.currentTarget.value))} />
                            Скорость атаки
                        </div>
                    </div>
                : null
            }

            <div>
                <input
                    type='checkbox'
                    checked={isTool}
                    onClick={() => setIsTool(!isTool)} />
                Инструмент
            </div>
            {
                isTool
                    ? <div>
                        <div>
                            <input
                                type='text'
                                step="0.1"
                                placeholder='speed'
                                value={speed}
                                onChange={e => setSpeed(Number(e.currentTarget.value))} />
                            Скорость
                        </div>
                        <div>
                            <input
                                type='text'
                                step="0.1"
                                placeholder='double'
                                value={double}
                                onChange={e => setDouble(Number(e.currentTarget.value))} />
                            Шанс допа
                        </div>
                    </div>
                : null
            }
            <div>
                <input
                    type='checkbox'
                    checked={isCrafting}
                    onClick={() => setIsCrafting(!isCrafting)} />
                Крафт
            </div>
            {
                isCrafting
                    ? <div>
                        <input
                            type='text'
                            placeholder='id'
                            value={craftingItemId}
                            onChange={e => setCraftingItemId(e.currentTarget.value)} />
                        <div>
                            <input
                                type='number'
                                placeholder='count'
                                value={craftingItemsCount}
                                onChange={e => setCraftingItemCount(Number(e.currentTarget.value))} />
                            Количество
                        </div>
                        <button onClick={() => setCraftingItems([])}>
                            Удалить все
                        </button>
                        <List>
                            {
                                craftingItems.map(i => <div> id: {i.id}; count: {i.count} </div>)
                            }
                        </List>
                        <button onClick={() => setCraftingItems([...craftingItems, {
                            id: craftingItemId,
                            count: craftingItemsCount
                        }])}>
                            Добавить
                        </button>
                    </div>
                    : null
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
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    padding: 30px;
    gap: 10px;
    overflow-y: scroll;

`


export default CreatorPageItem;