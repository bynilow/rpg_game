import { useState } from 'react';
import styled from 'styled-components'
import { getRareColor } from '../../styles/backgrounds';
import { IRare, rareList } from '../../models/IAreaItem';

interface IDropdownType {
    id: string | IRare;
    title: string;
}

interface IDropdownProps {
    $selectedTypes: IDropdownType[];
    $setSelected: Function;
    $isRare?: boolean;
}

function Dropdown({$selectedTypes, $isRare, $setSelected}: IDropdownProps) {

    const [selectedTypeId, setSelectedTypeId] = useState($selectedTypes[0].id);

    const onChangeSelected = (id: string) => {
        $setSelected(id);
        setSelectedTypeId(id);
    }

    return (
        <SelectDropdown>
            <DropdownButton>
                {
                    $isRare
                        ? <RareIcon
                            color={getRareColor(selectedTypeId as IRare)} />
                        : null
                }
                {
                    $selectedTypes.find(t => t.id === selectedTypeId)!.title
                }
            </DropdownButton>
            <DropdownOptions>
                {
                    $selectedTypes.map(t =>
                        <DropdownOption
                            isSelected={selectedTypeId === t.id}
                            onClick={() => onChangeSelected(t.id)}>
                            {
                                $isRare && <RareIcon color={getRareColor(t.id as IRare)} />
                            }
                            {t.title}
                        </DropdownOption> )
                }
            </DropdownOptions>
        </SelectDropdown>
    );
}


interface IRareIconProps {
    color: string;
}
const RareIcon = styled.div<IRareIconProps>`
    border-radius: 50%;
    width: 1.3em;
    height: 1.3em;
    background-color: ${p => p.color};
`

interface IDropdownOptionProps {
    isSelected: boolean;
}

const DropdownOption = styled.div<IDropdownOptionProps>`
    z-index: 9;
    font-size: 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px;
    cursor: pointer;
    transition: 0.1s;
    border-bottom: ${p => p.isSelected ? '1px solid black;' : 'none;'};

    &:hover{
        padding-left: 1.3em;
        background-color: #e2e2e2;
    }
    
`

const DropdownOptions = styled.div`
    z-index: 999999;
    display: none;
    flex-direction: column;
    gap: 5px;
    overflow: hidden;
    box-shadow: 0 0 5px #0000005a;
    background-color: #ffffff;
    border: 1px solid black;
    
    border-radius: 5px;
    padding: 5px;

    position: absolute;
    min-width: 100%;
    top: 100%;    
`

const SelectDropdown = styled.div`
    position: relative;
    z-index: -1;
    min-width: 13rem;

    &:hover ${DropdownOptions} {
        display: flex;
    }

    @media (max-width: 426px) {
        min-width: 10rem;
    }
    @media (max-width: 376px) {
        min-width: 100%;
    }
`
const DropdownButton = styled.button`
    position: relative;
    min-width: 100%;
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

export default Dropdown;