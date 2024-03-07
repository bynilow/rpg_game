import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCountCanCraft } from '../../../functions/GetCountCanCraft';
import { getRandomNumberForLoot } from '../../../functions/Random';
import { sortFilterCraftItems } from '../../../functions/Sorting/SortingCraft';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IChangeInfo } from '../../../models/IArea';
import { IFullItem, IFullItemWithCount } from '../../../models/IAreaItem';
import { addItemsToInventoryAC, addXPAC, removeItemsFromInventoryAC } from '../../../store/reducers/ActionCreators';
import { scrollBarX } from '../../../styles/scrollbars';
import CheckboxSearch from '../../SearchBar/CheckboxSearch';
import Dropdown from '../../SearchBar/Dropdown';
import Input from '../../SearchBar/Input';
import ReverseButton from '../../SearchBar/ReverseButton';
import Title from '../../Title/Title';
import Modal from '../Modal';
import CraftItem from './CraftItem';
import { Items } from '../../../data/ItemsData';

interface ICraftModal {
    $closeModal: Function;
    $openInfoModal: (info: IChangeInfo) => void;
}

function CraftModal({ $closeModal, $openInfoModal }: ICraftModal) {

    const { playerSkills, inventory } = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    const [inputText, setInputText] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('all');
    const [selectedRare, setSelectedRare] = useState('all');
    const [selectedSort, setSelectedSort] = useState('title');
    const [isReadyToCraft, setIsReadyCraft] = useState(false);
    const [isReversed, setIsReversed] = useState(false);

    const [sortedItems, setSortedItems] = useState<IFullItem[]>(Items.filter(i => i.itemsToCraft).map(i => ({...i, localId: new Date().toISOString()})));

    const sortFilterInventory = async () => {
        setSortedItems(await sortFilterCraftItems({
            inputText,
            inventory,
            isReversed,
            items: Items,
            onlyReadyToCraft: isReadyToCraft,
            selectedMaterial,
            selectedRare,
            selectedSort
        }));
    }

    console.log(sortFilterCraftItems)

    const [craftingId, setCraftingId] = useState('');
    const [selectedId, setSelectedId] = useState('');

    const createItem = (itemCraft: IFullItemWithCount, itemsRemove: IFullItemWithCount[]) => {
        let count: number[] = [];
        for(let i = 0; i < itemCraft.count; i++){
            count.push(getRandomNumberForLoot(playerSkills.craftDoubleLootPercentChance.currentScores));
        }
        const sumCount = count.reduce((a,cv) => a + cv, 0);
        dispatch(addItemsToInventoryAC([{
            ...itemCraft,
            dateReceiving: new Date().toISOString(),
            count: sumCount}]));
        dispatch(removeItemsFromInventoryAC(itemsRemove));
        const experience = itemCraft.baseCountXP * sumCount * playerSkills.experienceMultiplier.currentScores;
        dispatch(addXPAC(experience));
        sortFilterInventory();
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
                            sortedItems.map((item, ind) => 
                                <CraftItem 
                                    key={item.id 
                                        + playerSkills.craftSpeed.currentScores 
                                        + playerSkills.craftDoubleLootPercentChance.currentScores
                                        + getCountCanCraft({item, inventory})}
                                    $index={ind}
                                    $openInfoModal={(info: IChangeInfo) => $openInfoModal(info)}
                                    $fullItem={Items.find(ai => ai.id === item.id) || Items[0]}
                                    $playerCraftingSpeed={playerSkills.craftSpeed.currentScores}
                                    $craftItem={(count: number, itemsToRemove: IFullItemWithCount[]) => createItem({
                                        ...Items.find(ai => ai.id === item.id)!,
                                        count 
                                    }, itemsToRemove)}
                                    $craftingId={craftingId}
                                    $setCraftingId={() => setCraftingId(item.id)}
                                    $clearCraftingId={() => onClickCancelCrafting(item.id)}
                                    $isSelected={selectedId === item.id}
                                    $setSelectedId={() => setSelectedId(item.id)}
                                    $clearSelectedId={() => setSelectedId('')}
                                    $countCanCraft={getCountCanCraft({item, inventory})} />)
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

    ${scrollBarX}
`

export default CraftModal;