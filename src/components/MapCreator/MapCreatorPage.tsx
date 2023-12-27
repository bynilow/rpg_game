import { useState } from 'react';
import styled from 'styled-components'
import { IAreaItem } from '../../models/IAreaItem';

function MapCreatorPage() {

    const [nameMap, setNameMap] = useState('');
    const [descriptionMap, setDescriptionMap] = useState('');


    const [nameItem, setNameItem] = useState('');
    const [descriptionItem, setDescriptionItem] = useState('');
    const [timeToMining, setTimeToMining] = useState(0);
    const [typeItem, setTypeItem] = useState('tree');


    const onCreateMap = () => {

    }

    const onCreateItem = () => {
        // const item: IAreaItem = {
        //     id: 0,
        //     avatar: '',
        //     description: descriptionItem,
        //     timeToMining,
        //     title: nameItem,
        //     type: typeItem
        // }
        // console.log(JSON.stringify(item))
    }

    return ( 
        <div>
            <input type="text" placeholder='Название' value={nameMap} onChange={e => setNameMap(e.target.value)} />
            
            <RadioGroup>
                <input type="radio" id="cont" name="path" value="p1" checked />
                <label htmlFor="huey">Продолжение пути</label>
                <input type="radio" id="cont" name="path" value="p1" />
                <label htmlFor="huey">Начало пути</label>
                <input type="radio" id="cont" name="path" value="p1" />
                <label htmlFor="huey">Вставить между точками</label>
            </RadioGroup>
            <input type='text' placeholder='id map' />
            <AreaItemList> 
            
            </AreaItemList>

            <textarea value={descriptionMap} onChange={e => setDescriptionMap(e.target.value)} />
            <button onClick={() => onCreateMap()}>Создать</button>

            <CreateItemBlock>
                <p>Создание предмета</p>
                <input type='text' placeholder='Название' />
                <textarea />
                <input type='number' placeholder='Время добычи' />
                <select value={typeItem} onChange={e => setTypeItem(e.target.value)} name="type">
                    <option value="tree">Дерево</option>
                    <option value="ore">Руда</option>
                    <option value="food">Еда</option>
                    <option value="other">Другое</option>
                </select>
                <button onClick={() => onCreateItem()}>Создать</button>
            </CreateItemBlock>
            
        </div>
     );
}

const RadioGroup = styled.div`
    display: flex;
    gap: 10px;
`

const AreaItemList = styled.div`
    display: flex;
    gap: 10px;
    
`

const CreateItemBlock = styled.div`
    margin: 10px;
    width: min-content;
    border: solid 1px black;
    padding: 10px;
    gap: 5px;
    display: flex;
    flex-direction: column;
    align-items: baseline;

`


export default MapCreatorPage;