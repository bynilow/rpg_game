import styled from 'styled-components'
import { IItemInventory } from '../../../models/IInventory';
import Avatar from '../../Avatar/Avatar';
import CircleButton from '../../Buttons/CircleButton';
import { useState } from 'react';


function InventoryItem({item, count}:IItemInventory) {

    const [isCanUse, setIsCanUse] = useState(item.type === 'food');
    const [isCanEquip, setIsCanEquip] = useState(item.type === 'armor' || item.type === 'weapon');
    const [isSelectToDelete, setIsSelectToDelete] = useState(false);

    return ( 
        <Item $rare={item.rare}>
            <Avatar $image={item.avatar} width={'150px'} height={'150px'}  />
            <CircleButton symbol='?' />
            <Info>
                <Title>
                    { item.title } x{count}
                </Title>
                <ButtonsGroup>
                    {
                        isCanUse
                        && <Button>
                            Использовать
                        </Button>
                    }
                    {
                        true
                        && <Button>
                            Экпировать
                        </Button>
                    }
                    <Button>
                        Выбросить
                    </Button>
                </ButtonsGroup>
                <AboutItemBlock>
                    <Weight>
                        kg
                        {
                            ' ' + item.weight
                        }
                    </Weight>
                    <Cost>
                        ${
                            item.cost
                        }
                    </Cost>
                </AboutItemBlock>
                
            </Info>
        </Item>
     );
}

const Button = styled.div`
    cursor: pointer;
    box-shadow: 0 0 5px black;
    border-radius: 5px;
    background-color: white;
    padding: 10px;

    transition: .05s;

    &:hover{
        transform: scale(0.98);
        background-color: #e4e4e4;
    }
    
`

const ButtonsGroup = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    width: fit-content
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: 100%;
`

const AboutItemBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 5px;
    position: absolute;
    margin: 5px;
    bottom: 0;
    right: 0;
`

const Weight = styled.p`
    color: white;
    font-size: 14px;
`

const Cost = styled.p`
    color: black;
    background-color: #dddddd;
    border-radius: 5px;
    padding: 5px;
`

const Count = styled.div`
    color: white;
`

const Title = styled.p`
    font-size: 20px;
`

interface IItemProps {
    $rare: string;
}

const Item = styled.div<IItemProps>`
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 1;
    box-shadow: 0 0 5px #0000005a;
    background: white;
    border-radius: 5px;
    width: 400px;
    height: 150px;
    padding: 5px;
    transition: 0.3s;

    background: ${props => 
        props.$rare === 'common' 
        ? "linear-gradient(135deg, white 80%, #a4a4ab 80%);"
        : props.$rare === 'uncommon'
        ? "linear-gradient(135deg, white 80%, #59c87f 80%);"
        : props.$rare === 'rare'
        ? "linear-gradient(135deg, white 80%, #4d69cd 80%);"
        : props.$rare === 'mythical'
        ? "linear-gradient(135deg, white 80%, #d42be6 80%);"
        : "linear-gradient(135deg, white 80%, #caab05 80%);"
    };

    &:hover{
        z-index: 9999;
        transform: scale(1.05);
    }
`

export default InventoryItem;