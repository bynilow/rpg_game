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
import Title from '../../Title/Title';
import Input from '../../SearchBar/Input';
import Dropdown from '../../SearchBar/Dropdown';
import CheckboxSearch from '../../SearchBar/CheckboxSearch';
import ReverseButton from '../../SearchBar/ReverseButton';

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
                $gap='1.3em'
                $size='large'
                $justifyContent='baseline'
                $isCloseButton
                $closeButtonFunction={() => $closeModal()}>

                <CraftPlace>
                    <Title $size='1.5rem'>
                        Создание
                    </Title>
                    <Bar $isDisable={!!craftingId} >
                        <Input $onChange={(e: string) => setInputText(e)} />

                        <Dropdown
                            $selectedTypes={[
                                { id: 'all', title: 'Все' },
                                { id: 'weapon', title: 'Оружие' },
                                { id: 'helmet', title: 'Шлемы' },
                                { id: 'chest', title: 'Нагрудники' },
                                { id: 'foot', title: 'Поножи' },
                                { id: 'axe', title: 'Топоры' },
                                { id: 'pickaxe', title: 'Кирки' },
                                { id: 'material', title: 'Материалы' },
                                { id: 'other', title: 'Другое' }]}
                            $setSelected={(id: string) => setSelectedMaterial(id)} />

                        <Dropdown
                            $isRare
                            $selectedTypes={[
                                { id: 'all', title: 'Все' },
                                { id: 'common', title: 'Обычное' },
                                { id: 'uncommon', title: 'Необычное' },
                                { id: 'rare', title: 'Редкое' },
                                { id: 'mythical', title: 'Мифическое' },
                                { id: 'legendary', title: 'Легендарное' }]}
                            $setSelected={(id: string) => setSelectedRare(id)} />

                        <Dropdown
                            $selectedTypes={[
                                { id: 'title', title: 'По названию' },
                                { id: 'rare', title: 'По редкости' },
                                { id: 'cost', title: 'По цене' },
                                { id: 'time', title: 'По скорости' }] }
                            $setSelected={(id: string) => setSelectedSort(id)} />

                        <CheckboxSearch $setChecked={() => setIsReadyCraft(!isReadyToCraft)} />

                        <ReverseButton $setReversed={() => setIsReversed(!isReversed)} />
                        
                        
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

const CraftPlace = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 1em;
`


interface IBarProps{
    $isDisable: boolean;
}

const Bar = styled.div<IBarProps>`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
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

    @media (max-width: 376px) {
        height: 30%;
        overflow-y: scroll;
        justify-content: center;
    }
`

const EmptyItem = styled.div`
    width: 100px;
    height: 100px;
    margin: 10px;
`

const ItemsList = styled.div`
    display: flex;
    gap: 1.3em;
    padding: 1em;
    height: 70%;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow-y: scroll;
    overflow-x: hidden;

    ${scrollBarX
    }
`

export default CraftModal;