import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../hooks/redux';
import { IFullItemWithCount, rareList } from '../../../models/IAreaItem';
import { scrollBarX } from '../../../styles/scrollbars';
import Dropdown from '../../SearchBar/Dropdown';
import Input from '../../SearchBar/Input';
import ReverseButton from '../../SearchBar/ReverseButton';
import Title from '../../Title/Title';
import Modal from '../Modal';
import InventoryEmptyItem from './InventoryEmptyItem';
import InventoryItem from './InventoryItem';
import { sortFilterInventory } from '../../../functions/Sorting';
import DeleteItemsModal from '../DeleteItemsModal/DeleteItemsModal';

interface IInventoryModal {
    closeModal: Function;
}

function InventoryModal({ closeModal }: IInventoryModal) {

    const { inventory, playerSkills } = useAppSelector(state => state.userReducer)

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

    useEffect(() => {
        changeSortFilterInventory();
    }, [selectedMaterial, selectedRare, selectedSort, isReversed, inputText, inventory])

    return (
        <>
            {
                isDeleteModalOpened
                    ? <DeleteItemsModal
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
                                        $onClickMultipleDelete={(item: IFullItemWithCount) => onClickMultipleDelete(item)}
                                        item={i.item}
                                        count={i.count} />)
                            }
                            <InventoryEmptyItem />
                            <InventoryEmptyItem />

                        </ItemsList>
                        : <Title $size='1.5em'>Инвентарь пуст...</Title>
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