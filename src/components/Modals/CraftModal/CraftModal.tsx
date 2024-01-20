import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IFullItem, IFullItemWithCount, rareList } from '../../../models/IAreaItem';
import { addItemToInventory, addItemsToInventory, addXP, removeItemsFromInventory } from '../../../store/reducers/ActionCreators';
import { scrollBarX } from '../../../styles/scrollbars';
import Modal from '../Modal';
import CraftItem from './CraftItem';
import { getRandomNumberForLoot } from '../../../functions/Random';
import InfoModal from '../InfoModal/InfoModal';
import { IChangeInfo } from '../../../models/IArea';

interface ICraftModal {
    $closeModal: Function;
    $openInfoModal: (info: IChangeInfo) => void;
}

function CraftModal({ $closeModal, $openInfoModal }: ICraftModal) {

    const { areaItems, playerSkills, inventory } = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    const [inputText, setInputText] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('all');
    const [selectedRare, setSelectedRare] = useState('all');
    const [selectedSort, setSelectedSort] = useState('title');
    const [isReadyToCraft, setIsReadyCraft] = useState(false);
    const [isReversed, setIsReversed] = useState(false);

    const [sortedItems, setSortedItems] = useState<IFullItem[]>(areaItems.filter(i => i.itemsToCraft).map(i => ({...i, localId: new Date().toISOString()})));

    const sortFilterInventory = () => {
        let itemsFilterMaterial = areaItems.filter(i => i.itemsToCraft?.length);
        let itemsFilterRare = areaItems.filter(i => i.itemsToCraft?.length);
        let itemsSorted = areaItems.filter(i => i.itemsToCraft?.length);

        if (selectedMaterial !== 'all') {
            itemsFilterMaterial = areaItems.filter(i => i.type === selectedMaterial);
        }
        if (selectedRare !== 'all') {
            itemsFilterRare = areaItems.filter(i => i.rare === selectedRare);
        }

        switch (selectedMaterial){
            case 'all':
                itemsFilterMaterial = areaItems.filter(i => i.itemsToCraft?.length);
                break;
            case 'helmet':
                itemsFilterMaterial = areaItems.filter(i => i.subType === 'helmet');
                break;
            case 'chest':
                itemsFilterMaterial = areaItems.filter(i => i.subType === 'chest');
                break;
            case 'foot':
                itemsFilterMaterial = areaItems.filter(i => i.subType === 'foot');
                break;
            case 'weapon':
                itemsFilterMaterial = areaItems.filter(i => i.type === 'weapon');
                break;
            case 'axe':
                itemsFilterMaterial = areaItems.filter(i => i.subType === 'axe');
                break;
            case 'pickaxe':
                itemsFilterMaterial = areaItems.filter(i => i.subType === 'pickaxe');
                break;
        }

        let filteredItems = itemsFilterMaterial.filter(i => itemsFilterRare.includes(i));

        switch (selectedSort) {
            case 'title':
                itemsSorted = filteredItems.sort((a, b) =>
                    a.title.localeCompare(b.title));
                break;
            case 'rare':
                itemsSorted = filteredItems.sort((a, b) =>
                    rareList.indexOf(a.rare) - rareList.indexOf(b.rare));
                break;
            case 'cost':
                itemsSorted = filteredItems.sort((a, b) =>
                    a.cost - b.cost).reverse();
                break;
            case 'time':
                itemsSorted = filteredItems.sort((a, b) =>
                    a.timeToMining - b.timeToMining).reverse();
                break;
            default:
                break;
        }

        const checkedCraftItem = isReadyToCraft ? itemsSorted.filter(i => getCountCanCraft(i)) : itemsSorted;

        let inventoryTexted = checkedCraftItem.filter(i =>
            i.title.toLocaleLowerCase().includes(inputText.toLowerCase()));

        setSortedItems(isReversed ? inventoryTexted.reverse() : inventoryTexted);
    }

    const [craftingId, setCraftingId] = useState('');
    const [selectedId, setSelectedId] = useState('');

    const createItem = (itemCraft: IFullItemWithCount, itemsRemove: IFullItemWithCount[]) => {
        let count: number[] = [];
        for(let i = 0; i < itemCraft.count; i++){
            count.push(getRandomNumberForLoot(playerSkills.craftDoubleLootPercentChance.currentScores));
        }
        console.log(count)
        const sumCount = count.reduce((a,cv) => a + cv, 0);
        dispatch(addItemToInventory({
            ...itemCraft,
            dateReceiving: new Date().toISOString(),
            count: sumCount}));
        dispatch(removeItemsFromInventory(itemsRemove));
        const experience = itemCraft.baseCountXP * sumCount * playerSkills.experienceMultiplier.currentScores;
        dispatch(addXP(experience));
        sortFilterInventory();
    }

    const getCountCanCraft = (i: IFullItem ) => {
        if(i.itemsToCraft){
            return Math.min(...( i.itemsToCraft!.map(i => 
                ( Math.floor((inventory.find(pi => pi.item.id === i.id)?.count || 0 ) / i.count)) ) ))
        }
        else{
            return 0
        }
        
    }

    const onClickCancelCrafting = (id: string) => {
        setCraftingId('');
    }

    useEffect(() => {
        sortFilterInventory();
    }, [selectedMaterial, selectedRare, selectedSort, isReversed, inputText, isReadyToCraft, inventory])

    return (
        <>  
            <Modal
                $flexDirection={'row'}
                $gap='20px'
                $size='large'
                $justifyContent='baseline'
                $isCloseButton
                $closeButtonFunction={() => $closeModal()}>
                <CraftTypesPlace>
                    <CraftType />
                    <CraftType />
                    <CraftType />
                </CraftTypesPlace>

                <Divider />

                <CraftPlace>
                    <CraftTitle>Создание</CraftTitle>
                    <Bar $isDisable={!!craftingId} >
                        <InputName
                            type='text'
                            placeholder='Название'
                            maxLength={30}
                            value={inputText}
                            onChange={e => setInputText(e.currentTarget.value)} />

                        <SelectDropdown>
                            <DropdownButton>
                                {
                                    selectedMaterial === 'all'
                                        ? 'Все'
                                        : selectedMaterial === 'weapon'
                                            ? 'Оружие'
                                            : selectedMaterial === 'helmet'
                                                ? 'Шлемы'
                                                : selectedMaterial === 'chest'
                                                    ? 'Нагрудники'
                                                    : selectedMaterial === 'foot'
                                                        ? 'Поножи'
                                                        : selectedMaterial === 'axe'
                                                            ? 'Топоры'
                                                            : selectedMaterial === 'pickaxe'
                                                                ? 'Кирки'
                                                                : selectedMaterial === 'material'
                                                                    ? 'Материалы'
                                                                    : 'Другое'
                                }
                            </DropdownButton>
                            <DropdownOptions>
                                <DropdownOption
                                    $isSelected={selectedMaterial === 'all'}
                                    onClick={() => setSelectedMaterial('all')}>
                                    Все
                                </DropdownOption>
                                <DropdownOption
                                    $isSelected={selectedMaterial === 'weapon'}
                                    onClick={() => setSelectedMaterial('weapon')}>
                                    Оружие
                                </DropdownOption>
                                <DropdownOption
                                    $isSelected={selectedMaterial === 'helmet'}
                                    onClick={() => setSelectedMaterial('helmet')}>
                                    Шлемы
                                </DropdownOption>
                                <DropdownOption
                                    $isSelected={selectedMaterial === 'chest'}
                                    onClick={() => setSelectedMaterial('chest')}>
                                    Нагрудники
                                </DropdownOption>
                                <DropdownOption
                                    $isSelected={selectedMaterial === 'foot'}
                                    onClick={() => setSelectedMaterial('foot')}>
                                    Поножи
                                </DropdownOption>
                                <DropdownOption
                                    $isSelected={selectedMaterial === 'axe'}
                                    onClick={() => setSelectedMaterial('axe')}>
                                    Топоры
                                </DropdownOption>
                                <DropdownOption
                                    $isSelected={selectedMaterial === 'pickaxe'}
                                    onClick={() => setSelectedMaterial('pickaxe')}>
                                    Кирки
                                </DropdownOption>
                                <DropdownOption
                                    $isSelected={selectedMaterial === 'material'}
                                    onClick={() => setSelectedMaterial('material')}>
                                    Материалы
                                </DropdownOption>
                                <DropdownOption
                                    $isSelected={selectedMaterial === 'other'}
                                    onClick={() => setSelectedMaterial('other')}>
                                    Другое
                                </DropdownOption>

                            </DropdownOptions>
                        </SelectDropdown>

                        <SelectDropdown>
                            <DropdownButton>
                                <RareIcon
                                    color={
                                        selectedRare === 'all'
                                            ? 'white'
                                            : selectedRare === 'common'
                                                ? '#a4a4ab'
                                                : selectedRare === 'uncommon'
                                                    ? '#59c87f'
                                                    : selectedRare === 'rare'
                                                        ? '#4d69cd'
                                                        : selectedRare === 'mythical'
                                                            ? '#d42be6'
                                                            : '#caab05'
                                    } />
                                {
                                    selectedRare === 'all'
                                        ? 'Все'
                                        : selectedRare === 'common'
                                            ? 'Обычное'
                                            : selectedRare === 'uncommon'
                                                ? 'Необычное'
                                                : selectedRare === 'rare'
                                                    ? 'Редкое'
                                                    : selectedRare === 'mythical'
                                                        ? 'Мифическое'
                                                        : 'Легендарное'
                                }
                            </DropdownButton>
                            <DropdownOptions>
                                <DropdownOption
                                    $isSelected={selectedRare === 'all'}
                                    onClick={() => setSelectedRare('all')}>
                                    <RareIcon color="white" /> Все
                                </DropdownOption>
                                <DropdownOption
                                    $isSelected={selectedRare === 'common'}
                                    onClick={() => setSelectedRare('common')}>
                                    <RareIcon color="#a4a4ab" /> Обычное
                                </DropdownOption>
                                <DropdownOption
                                    $isSelected={selectedRare === 'uncommon'}
                                    onClick={() => setSelectedRare('uncommon')}>
                                    <RareIcon color="#59c87f" /> Необычное
                                </DropdownOption>
                                <DropdownOption
                                    $isSelected={selectedRare === 'rare'}
                                    onClick={() => setSelectedRare('rare')}>
                                    <RareIcon color="#4d69cd" /> Редкое
                                </DropdownOption>
                                <DropdownOption
                                    $isSelected={selectedRare === 'mythical'}
                                    onClick={() => setSelectedRare('mythical')}>
                                    <RareIcon color="#d42be6" /> Мифическое
                                </DropdownOption>
                                <DropdownOption
                                    $isSelected={selectedRare === 'legendary'}
                                    onClick={() => setSelectedRare('legendary')}>
                                    <RareIcon color="#caab05" /> Легендарное
                                </DropdownOption>
                            </DropdownOptions>
                        </SelectDropdown>

                        <SelectDropdown>
                            <DropdownButton>
                                {
                                    selectedSort === 'title'
                                        ? 'По названию'
                                        : selectedSort === 'rare'
                                            ? 'По редкости'
                                            : selectedSort === 'cost'
                                                ? 'По стоимости'
                                                : 'По скорости'
                                }
                            </DropdownButton>
                            <DropdownOptions>
                                <DropdownOption
                                    $isSelected={selectedSort === 'title'}
                                    onClick={() => setSelectedSort('title')}>
                                    По названию
                                </DropdownOption>
                                <DropdownOption
                                    $isSelected={selectedSort === 'rare'}
                                    onClick={() => setSelectedSort('rare')}>
                                    По редкости
                                </DropdownOption>
                                <DropdownOption
                                    $isSelected={selectedSort === 'cost'}
                                    onClick={() => setSelectedSort('cost')}>
                                    По стоимости
                                </DropdownOption>
                                <DropdownOption
                                    $isSelected={selectedSort === 'time'}
                                    onClick={() => setSelectedSort('time')}>
                                    По скорости
                                </DropdownOption>
                            </DropdownOptions>
                        </SelectDropdown>
                        <CheckBoxBlock onClick={() => setIsReadyCraft(!isReadyToCraft)} >
                            <Checkbox type='checkbox' checked={isReadyToCraft} />
                            Готовы к крафту
                        </CheckBoxBlock>
                        <ReverseButton onClick={() => setIsReversed(!isReversed)}>
                            {
                                isReversed
                                    ? 'ᐯ'
                                    : 'ᐱ'
                            }
                        </ReverseButton>
                    </Bar>
                    <ItemsList key={sortedItems.length}>
                        {
                            sortedItems.map((i, ind) => 
                                <CraftItem 
                                    key={i.id 
                                        + playerSkills.craftSpeed.currentScores 
                                        + playerSkills.craftDoubleLootPercentChance.currentScores
                                        + getCountCanCraft(i)}
                                    $index={ind}
                                    $openInfoModal={(info: IChangeInfo) => $openInfoModal(info)}
                                    $fullItem={areaItems.find(ai => ai.id === i.id) || areaItems[0]}
                                    $playerCraftingSpeed={playerSkills.craftSpeed.currentScores}
                                    $craftItem={(count: number, itemsToRemove: IFullItemWithCount[]) => createItem({
                                        ...areaItems.find(ai => ai.id === i.id)!,
                                        count 
                                    }, itemsToRemove)}
                                    $craftingId={craftingId}
                                    $setCraftingId={() => setCraftingId(i.id)}
                                    $clearCraftingId={() => onClickCancelCrafting(i.id)}
                                    $isSelected={selectedId === i.id}
                                    $setSelectedId={() => setSelectedId(i.id)}
                                    $clearSelectedId={() => setSelectedId('')}
                                    $countCanCraft={getCountCanCraft(i)} />)
                        }

                        <EmptyItem />
                        <EmptyItem />
                        <EmptyItem />
                        <EmptyItem />
                        <EmptyItem />
                        <EmptyItem />
                        <EmptyItem />
                        <EmptyItem />
                        <EmptyItem />
                        <EmptyItem />
                    </ItemsList>
                </CraftPlace>
            </Modal>
        </>

    );
}

const Divider = styled.div`
    height: 100%;
    border: 1px solid gray;
`

const CraftType = styled.div`
    width: 50px;
    height: 50px;
    background-color: gray;
    border-radius: 10px;
`

const CraftTypesPlace = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    gap: 20px;
`

const CraftPlace = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 20px;
`

const ReverseButton = styled.div`
    font-size: 16px;
    line-height: 0;
    height: 40px;
    width: 40px;
    border-radius: 5px;
    border: 1px solid black;
    box-shadow: 0 0 5px #0000005a;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
`

const EmptyText = styled.p`
    font-size: 30px;
    margin: 20px;
`

const Checkbox = styled.input`
    
`

const CheckBoxBlock = styled.div`
    font-size: 16px;
    height: 40px;
    min-width: 200px;
    border-radius: 5px;
    border: 1px solid black;
    box-shadow: 0 0 5px #0000005a;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    cursor: pointer;
    user-select: none;
`

interface IRareIconProps {
    color: string;
}
const RareIcon = styled.div<IRareIconProps>`
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background-color: ${p => p.color};
`

interface IDropdownOptionProps {
    $isSelected: boolean;
}

const DropdownOption = styled.div<IDropdownOptionProps>`
    font-size: 16px;
    height: 30px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px;
    cursor: pointer;
    transition: 0.1s;
    border-bottom: ${p => p.$isSelected ? '1px solid black;' : 'none;'};

    &:hover{
        padding-left: 20px;
        background-color: #e2e2e2;
    }
    
`

const DropdownOptions = styled.div`
    display: none;
    flex-direction: column;
    gap: 5px;
    position: absolute;
    overflow: hidden;
    box-shadow: 0 0 5px #0000005a;
    background-color: #ffffff;
    border: 1px solid black;
    
    border-radius: 5px;
    
    padding: 5px;
    min-width: 200px;
    top: 100%;    
`

const SelectDropdown = styled.div`
    position: relative;
    z-index: 999;
    min-width: 180px;
    

    &:hover ${DropdownOptions} {
        display: flex;
    }
`
const DropdownButton = styled.button`
    position: relative;
    width: 100%;
    height: 40px;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid black;
    box-shadow: 0 0 5px #0000005a;
    background-color: white;
    transition: 0.3s;

    &::after{
        content: 'ᐯ';
        z-index: 9999;
        transform: scaleX(1.5) scale(0.8);
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: 0;
        width: 10px;
        height: 10px;
        position: absolute;
        top: 0;
        right: 0;
        padding: 5px;
        margin: 10px;
    }
`

const InputName = styled.input`
    font-size: 16px;
    height: 40px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid black;
    box-shadow: 0 0 5px #0000005a;
`

interface IBarProps{
    $isDisable: boolean;
}

const Bar = styled.div<IBarProps>`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
    position: relative;
    ${
        p => p.$isDisable
            ? ` &::after{
                content: '';
                position: absolute;
                z-index: 999;
                width: 100%;
                height: 100%;
                padding: 5px;
                border-radius: 5px;
                top: 0;
                bottom: 0;
                left: -5px;
                right: 0;
                margin: auto;
                background: #00000075;
            }`
            : null
    }
`

const EmptyItem = styled.div`
    width: 100px;
    height: 100px;
    margin: 10px;
`

const ItemsList = styled.div`
    display: flex;
    gap: 10px;
    padding: 20px;
    height: 70%;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow-y: scroll;
    overflow-x: hidden;

    ${scrollBarX
    }
`

const CraftTitle = styled.p`
    font-size: 20px;
`

export default CraftModal;