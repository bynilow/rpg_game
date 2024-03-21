import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { sortFilterInventory } from '../../../functions/Sorting/SortingInventory';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IFullItemWithCount } from '../../../models/IAreaItem';
import { scrollBarX } from '../../../styles/scrollbars';
import Dropdown from '../../SearchBar/Dropdown';
import Input from '../../SearchBar/Input';
import ReverseButton from '../../SearchBar/ReverseButton';
import Title from '../../Title/Title';
import DeleteItemsModal from '../DeleteItemsModal/DeleteItemsModal';
import Modal from '../Modal';
import InventoryEmptyItem from './InventoryEmptyItem';
import InventoryItem from './InventoryItem';
import SquareButton from '../../Buttons/SquareButton';
import { palette } from '../../../styles/palette';
import { addItemsTradingAC } from '../../../store/reducers/ActionCreators';

interface IInventoryModal {
    closeModal: Function;
    $isSelectMode?: boolean;
}

function InventoryModal({ closeModal, $isSelectMode = true }: IInventoryModal) {

    const { inventory, playerSkills, tradingItems } = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    const [inputText, setInputText] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('all');
    const [selectedRare, setSelectedRare] = useState('all');
    const [selectedSort, setSelectedSort] = useState('title');
    const [isReversed, setIsReversed] = useState(false);

    const [sortedInventory, setSortedInventory] = useState(inventory);

    const changeSortFilterInventory = () => {
        setSortedInventory(sortFilterInventory(
            inventory,
            inputText,
            selectedMaterial,
            selectedRare,
            selectedSort,
            isReversed
        ));
    }

    const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<IFullItemWithCount>();

    const onClickMultipleDelete = (item: IFullItemWithCount) => {
        setItemToDelete(item);
        setIsDeleteModalOpened(true);
    };

    const [selectedItems, setSelectedItems] = useState<IFullItemWithCount[]>([]);
    const [lastSelectedItems, setLastSelectedItems] = useState(tradingItems);

    const onClickAcceptItems = () => {
        console.log(selectedItems)
        dispatch(addItemsTradingAC(selectedItems));
        closeModal();
    };

    const onClickSelectItem = (item: IFullItemWithCount) => {
        setSelectedItems(pv => [...pv, item]);
    };

    useEffect(() => {
        changeSortFilterInventory();
    }, [selectedMaterial, selectedRare, selectedSort, isReversed, inputText, inventory]);

    return (
        <>
            {
                isDeleteModalOpened && !$isSelectMode
                    ? <DeleteItemsModal
                        $isDeleteMode={true}
                        $min={1}
                        $max={itemToDelete?.count!}
                        $itemTitle='Береза'
                        $item={itemToDelete!}
                        $closeModal={() => setIsDeleteModalOpened(false)} />
                    : null
            }
            <Modal
                $flexDirection={'column'}
                $justifyContent='baseline'
                $size='large'
                $zIndex={99999}
                $isCloseButton
                $closeButtonFunction={() => closeModal()}>

                <InfoBlock>
                    <Title
                        $size='1.3em'>
                        Инвентарь
                    </Title>
                    <CapacityText>
                        {
                            `${inventory.reduce((a, v) => a + v.item.weight * v.count, 0).toFixed(1)} / ${playerSkills['capacity']['currentScores']}kg`
                        }
                    </CapacityText>
                </InfoBlock>
                <Bar>
                    <Input $onChange={(e: string) => setInputText(e)} />

                    <Dropdown
                        $selectedTypes={[
                            { id: 'all', title: 'Все' },
                            { id: 'tree', title: 'Деревья' },
                            { id: 'ore', title: 'Руды' },
                            { id: 'materials', title: 'Материалы' },
                            { id: 'equipment', title: 'Снаряжение' }]}
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
                            { id: 'date', title: 'По дате' },
                            { id: 'rare', title: 'По редкости' },
                            { id: 'cost', title: 'По цене' },
                            { id: 'count', title: 'По количеству' }]}
                        $setSelected={(id: string) => setSelectedSort(id)} />

                    <ReverseButton
                        $setReversed={() => setIsReversed(!isReversed)} />
                </Bar>
                {
                    inventory.length
                        ? <ItemsList>

                            {
                                sortedInventory.map(i =>
                                    <InventoryItem
                                        key={i.item.id}
                                        $isSelected={!!tradingItems.find((item) => item.id === i.item.id)}
                                        $selectedCount={tradingItems.find((item: any) => item.id === i.item.id)?.count || 0}
                                        $onSelectItem={(item: IFullItemWithCount) => onClickSelectItem(item)}
                                        $isSelectMode={$isSelectMode}
                                        $onClickMultipleDelete={(item: IFullItemWithCount) => onClickMultipleDelete(item)}
                                        item={i.item}
                                        count={i.count} />)
                            }
                            <InventoryEmptyItem />
                            <InventoryEmptyItem />

                        </ItemsList>
                        : <Title $size='1.5em'>Инвентарь пуст...</Title>
                }
                {
                    ($isSelectMode && selectedItems.length) || JSON.stringify(lastSelectedItems) !== JSON.stringify(tradingItems)
                        ? <SquareButton
                            $width='3rem'
                            $onClick={() => onClickAcceptItems()}>
                            {palette.checkMark}
                        </SquareButton>
                        : null
                }
            </Modal>
        </>

    );
}

const CapacityText = styled.p`
    color: gray;
`

const InfoBlock = styled.div`
    display: flex;
    align-items: end;
    gap: 1em;
`

const Bar = styled.div`
    z-index: 999;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    ${scrollBarX}

    @media (max-width: 376px) {
        max-height: 25%;
        overflow-y: auto;
    }
    @media (max-width: 426px) {
        justify-content: center;
    }
`

const ItemsList = styled.div`
    display: flex;
    gap: 1.3rem;
    padding: 1.2rem;
    width: 100%;
    height: 70%;
    justify-content: baseline;
    flex-wrap: wrap;
    overflow-y: scroll;
    overflow-x: hidden;

    ${scrollBarX}
`

export default InventoryModal;