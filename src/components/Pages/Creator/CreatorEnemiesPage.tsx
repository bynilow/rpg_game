import { useState } from 'react';
import styled from 'styled-components'
import { IAreaItem, ICraftItem, IFullItem, IFullItemWithCount, IRare } from '../../../models/IAreaItem';
import { IArmor, ITool, IWeapon } from '../../../models/IEquipment';
import { IAreaEnemy, IEnemy, IEnemyLoot, IEnemyType } from '../../../models/IEnemy';
import { IArea } from '../../../models/IArea';
import { Items } from '../../../data/AreaItems';
import { Enemies } from '../../../data/Enemies';

interface ICreatorPageItemProps {

}

function CreatorPageEnemy() {

    const [title, setTitle] = useState('');
    const [id, setId] = useState('');
    const [type, setType] = useState<IEnemyType>('enemy');
    const [avatar, setAvatar] = useState('');
    const [description, setDescription] = useState('');
    const [baseCountXP, setBaseCountXP] = useState(5);
    const [coins, setCoins] = useState(5);

    const [attackSpeed, setAttackSpeed] = useState(1);
    const [damage, setDamage] = useState(1);
    const [critDamageMultiplier, setCritDamageMultiplier] = useState(1);
    const [critChance, setCritChance] = useState(1);
    const [maxHealth, setMaxHealth] = useState(100);
    const [dodgeChance, setDodgeChance] = useState(1);
    const [blockingChance, setBlockingChance] = useState(1);
    const [blockingMultiplier, setBlockingMultiplier] = useState(1);
    const [missChance, setMissChance] = useState(1);

    const [possibleLoot, setPossibleLoot] = useState<IEnemyLoot[]>([]);
    const [selectedItemID, setSelectedItemID] = useState('birch_tree');
    const [selectedCountMin, setSelectedCountMin] = useState(0);
    const [selectedCountMax, setSelectedCountMax] = useState(0);
    const [selectedDropChance, setSelectedDropChance] = useState(0);

    const [commTexts, setCommTexts] = useState<string[]>([]);
    const [combTexts, setCombTexts] = useState<string[]>([]);
    const [critDamageText, setCritDamageText] = useState('Собирает все силы и пронзает #name своим кинжалом, нанося критические #damage урона!');
    const [successBlockingText, setSuccessBlockingText] = useState('Совершенное владение щитом оказывает эффект! #name получает всего #damage урона!');
    const [successBlockingCritText, setSuccessBlockingCritText] = useState('Совершенное владение щитом оказывает эффект! #name блокирует критический урон и получает всего #damage урона!');
    const [dodgeText, setDodgeText] = useState('#name применяет уловку и уклоняется от удара.');
    const [missText, setMissText] = useState('Запутавшись в собственных ногах падает и не наносит никакого урона.');


    const [extraPriceMultiplier, setExtraPriceMultiplier] = useState(1);
    const [tradingItems, setTradingItems] = useState<IFullItemWithCount[]>([]);


    const onClickSave = () => {
        const enemy: IEnemy = {
            id,
            idInArea: '',
            title,
            avatar,
            description,
            type,
            level: 1,
            baseCountXP,
            possibleLoot:
                type !== 'trader'
                    ? [
                        {
                            id: 'coins',
                            countMin: coins,
                            countMax: coins + 10,
                            dropChance: 100
                        },
                        ...possibleLoot
                    ]
                    : [...possibleLoot],
            maxHealth,
            damage,
            attackSpeed,
            blockingChance,
            blockingMultiplier,
            critChance,
            critDamageMultiplier,
            dodgeChance,
            missChance,
            actionText: {
                communicationText: commTexts,
                combatText: combTexts,
                critDamageText,
                dodgeText,
                failedBlockingText: '',
                missText,
                successBlockingCritText,
                successBlockingText
            }
        }

        console.log(enemy)
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
                value={type}
                onChange={e =>
                    setType(
                        e.currentTarget.value === 'enemy'
                        ? 'enemy'
                        : e.currentTarget.value === 'boss'
                        ? 'boss'
                        : e.currentTarget.value === 'trader'
                        ? 'trader'
                        : 'neutral'
            )}>
                <option value='enemy'>
                    enemy
                </option>
                <option value='boss'>
                    boss
                </option>
                <option value='trader'>
                    trader
                </option>
                <option value='neutral'>
                    neutral
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
            <div>
                <input
                    type='number'
                    placeholder='time to mining'
                    value={baseCountXP}
                    onChange={e => setBaseCountXP(Number(e.currentTarget.value))} />
                count xp
            </div>
            <div>
                <input
                    type='number'
                    placeholder='time to mining'
                    value={coins}
                    onChange={e => setCoins(Number(e.currentTarget.value))} />
                count coins
            </div>


            {
                type !== 'trader'
                    ? <>
                        <div>
                            <input
                                type='number'
                                placeholder='time to mining'
                                value={maxHealth}
                                onChange={e => setMaxHealth(Number(e.currentTarget.value))} />
                            max hp
                        </div>
                        <div>
                            <input
                                type='number'
                                placeholder='time to mining'
                                value={attackSpeed}
                                onChange={e => setAttackSpeed(Number(e.currentTarget.value))} />
                            speed attack
                        </div>
                        <div>
                            <input
                                type='number'
                                placeholder='time to mining'
                                value={damage}
                                onChange={e => setDamage(Number(e.currentTarget.value))} />
                            damage
                        </div>
                        <div>
                            <input
                                type='number'
                                placeholder='time to mining'
                                value={critDamageMultiplier}
                                onChange={e => setCritDamageMultiplier(Number(e.currentTarget.value))} />
                            crit Damage Multiplier
                        </div>
                        <div>
                            <input
                                type='number'
                                placeholder='time to mining'
                                value={critChance}
                                onChange={e => setCritChance(Number(e.currentTarget.value))} />
                            crit chance
                        </div>
                        <div>
                            <input
                                type='number'
                                placeholder='time to mining'
                                value={dodgeChance}
                                onChange={e => setDodgeChance(Number(e.currentTarget.value))} />
                            dodge chance
                        </div>
                        <div>
                            <input
                                type='number'
                                placeholder='time to mining'
                                value={blockingChance}
                                onChange={e => setBlockingChance(Number(e.currentTarget.value))} />
                            blocking chance
                        </div>
                        <div>
                            <input
                                type='number'
                                placeholder='time to mining'
                                value={blockingMultiplier}
                                onChange={e => setBlockingMultiplier(Number(e.currentTarget.value))} />
                            blocking multiplier
                        </div>
                    </>
                    : <>
                        <div>
                            <input
                                type='number'
                                placeholder='time to mining'
                                value={extraPriceMultiplier}
                                onChange={e => setExtraPriceMultiplier(Number(e.currentTarget.value))} />
                            extra Price Multiplier
                        </div>

                    </>
            }
            

            <p>Предметы</p>
            <select value={selectedItemID} onChange={e => setSelectedItemID(e.currentTarget.value)}>
                {
                    Items.map(i =>
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
                    value={selectedCountMin}
                    onChange={e => setSelectedCountMin(Number(e.currentTarget.value))} />
                Мин количество
            </div>
            <div>
                <input
                    type='number'
                    placeholder='time to mining'
                    value={selectedCountMax}
                    onChange={e => setSelectedCountMax(Number(e.currentTarget.value))} />
                Макс количество
            </div>
            <div>
                <input
                    type='number'
                    placeholder='time to mining'
                    value={selectedDropChance}
                    onChange={e => setSelectedDropChance(Number(e.currentTarget.value))} />
                Drop chance
            </div>
            <button onClick={() => setPossibleLoot(pl => [
                ...pl, 
                {
                    id: selectedItemID,
                    countMin: selectedCountMin,
                    countMax: selectedCountMax,
                    dropChance: selectedDropChance
                }])}>
                add
            </button>
            <button onClick={() => setPossibleLoot([])}>
                clear
            </button>
            {
                possibleLoot.map(i => 
                <div>
                    {i.id} | {i.countMin} | {i.countMax} | {i.dropChance}%
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


export default CreatorPageEnemy;