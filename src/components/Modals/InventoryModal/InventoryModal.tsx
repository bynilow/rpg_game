import styled, { keyframes } from 'styled-components'
import InventoryItem from './InventoryItem';
import { useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';

interface IInventoryModal {
    closeModal: Function;
}

function InventoryModal({closeModal}:IInventoryModal) {

    const {inventory} = useAppSelector(state => state.userReducer)

    const [inputText, setInputText] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('all');
    const [selectedRare, setSelectedRare] = useState('all');
    const [selectedSort, setSelectedSort] = useState('title');

    return (
        <>
            <Background />
            <Inventory>
                <CloseButton onClick={() => closeModal()}>
                    ✕
                </CloseButton>
                <InventoryText>Инвентарь</InventoryText>
                <Bar>
                    <InputName type='text' placeholder='Название' value={inputText} onChange={e => setInputText(e.currentTarget.value)} />

                    <SelectDropdown>
                        <DropdownButton>
                            {
                                selectedMaterial === 'all'
                                ? 'Все'
                                : selectedMaterial === 'tree'
                                ? 'Дерево'
                                : selectedMaterial === 'ore'
                                ? 'Руды'
                                : selectedMaterial === 'materials'
                                ? 'Материалы'
                                : selectedMaterial === 'food'
                                ? 'Еда'
                                : selectedMaterial === 'equipment'
                                ? 'Снаряжение'
                                : 'Зелья'
                            }
                        </DropdownButton>
                        <DropdownOptions>
                            <DropdownOption 
                                isSelected={selectedMaterial === 'all'}
                                onClick={() => setSelectedMaterial('all')}>
                                Все
                            </DropdownOption>
                            <DropdownOption 
                                isSelected={selectedMaterial === 'tree'}
                                onClick={() => setSelectedMaterial('tree')}>
                                Дерево
                            </DropdownOption>
                            <DropdownOption 
                                isSelected={selectedMaterial === 'ore'}
                                onClick={() => setSelectedMaterial('ore')}>
                                Руды
                            </DropdownOption>
                            <DropdownOption 
                                isSelected={selectedMaterial === 'materials'}
                                onClick={() => setSelectedMaterial('materials')}>
                                Материалы
                            </DropdownOption>
                            <DropdownOption 
                                isSelected={selectedMaterial === 'food'}
                                onClick={() => setSelectedMaterial('food')}>
                                Еда
                            </DropdownOption>
                            <DropdownOption 
                                isSelected={selectedMaterial === 'equipment'}
                                onClick={() => setSelectedMaterial('equipment')}>
                                Снаряжение
                            </DropdownOption>
                            <DropdownOption 
                                isSelected={selectedMaterial === 'potion'}
                                onClick={() => setSelectedMaterial('potion')}>
                                Зелья
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
                                isSelected={selectedRare === 'all'}
                                onClick={() => setSelectedRare('all')}>
                                <RareIcon color="white" /> Все
                            </DropdownOption>
                            <DropdownOption 
                                isSelected={selectedRare === 'common'}
                                onClick={() => setSelectedRare('common')}>
                                <RareIcon color="#a4a4ab" /> Обычное
                            </DropdownOption>
                            <DropdownOption 
                                isSelected={selectedRare === 'uncommon'}
                                onClick={() => setSelectedRare('uncommon')}>
                                <RareIcon color="#59c87f" /> Необычное
                            </DropdownOption>
                            <DropdownOption 
                                isSelected={selectedRare === 'rare'}
                                onClick={() => setSelectedRare('rare')}>
                                <RareIcon color="#4d69cd" /> Редкое
                            </DropdownOption>
                            <DropdownOption 
                                isSelected={selectedRare === 'mythical'}
                                onClick={() => setSelectedRare('mythical')}>
                                <RareIcon color="#d42be6" /> Мифическое
                            </DropdownOption>
                            <DropdownOption 
                                isSelected={selectedRare === 'legendary'}
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
                                : selectedSort === 'date'
                                ? 'По дате получения'
                                : selectedSort === 'rare'
                                ? 'По редкости'
                                : selectedSort === 'cost'
                                ? 'По стоимости'
                                : 'По количеству'
                            }
                        </DropdownButton>
                        <DropdownOptions>
                            <DropdownOption 
                                isSelected={selectedSort === 'title'}
                                onClick={() => setSelectedSort('title')}>
                                По названию
                            </DropdownOption>
                            <DropdownOption 
                                isSelected={selectedSort === 'date'}
                                onClick={() => setSelectedSort('date')}>
                                По дате получения
                            </DropdownOption>
                            <DropdownOption 
                                isSelected={selectedSort === 'rare'}
                                onClick={() => setSelectedSort('rare')}>
                                По редкости
                            </DropdownOption>
                            <DropdownOption 
                                isSelected={selectedSort === 'cost'}
                                onClick={() => setSelectedSort('cost')}>
                                По стоимости
                            </DropdownOption>
                            <DropdownOption 
                                isSelected={selectedSort === 'count'}
                                onClick={() => setSelectedSort('count')}>
                                По количеству
                            </DropdownOption>

                        </DropdownOptions>
                    </SelectDropdown>

                </Bar>
                {
                    inventory.length
                        ? <ItemsList>

                            {
                                inventory.map(i => <InventoryItem item={i.item} count={i.count} />)
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
                        : <EmptyText>Инвентарь пуст...</EmptyText>
                }
            </Inventory>
        </>

    );
}

///🠗  🠕

const EmptyText = styled.p`
    font-size: 30px;
    margin: 20px;
`

const Background = styled.div`
    position: absolute;
    z-index: 99;
    
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;

    background-color: #0000006f;
    backdrop-filter: blur(5px);
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
    isSelected: boolean;
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
    border-bottom: ${p => p.isSelected ? '1px solid black;' : 'none;'};
    box-sizing: border-box;

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
    width: 100%;
    top: 100%;
    box-sizing: border-box;
    
`

const SelectDropdown = styled.div`
    position: relative;
    z-index: 999;
    width: 15vw;
    

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
    box-sizing: border-box;
`

const Bar = styled.div`
    display: flex;
    gap: 10px;
    margin: 20px;
`

const Inventory = styled.div`
    z-index: 9999;
    position: absolute;
    width: 70vw;
    height: 90vh;
    top: 5%;
    background-color: white;
    box-shadow: 0 0 10px #00000050;
    border-radius: 15px;
`

const EmptyItem = styled.div`
    width: 100px;
    height: 100px;
    margin: 10px;
`

const ItemsList = styled.div`
    display: flex;
    height: 70%;
    margin: 10px;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow-y: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar{
        
        width: 10px;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background: #d4d4d4; 
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        margin: 10px;
        width: 20px;
        background-color: #858585;    
        border-radius: 10px;       
}
`

const InventoryText = styled.p`
    font-size: 20px;
    margin: 20px;
`

const CloseButton = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    background: #e9e9e9;
    border-radius: 50%;
    color: black;
    padding: 10px;
    margin: 10px;
    line-height: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 0.1s;
    cursor: pointer;

    &:hover{
        transform: scale(0.95);
        background: #c9c9c9;
    }
`

export default InventoryModal;