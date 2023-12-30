import styled from 'styled-components'
import { IItemInventory } from '../../../models/IInventory';


function InventoryItem({item, count}:IItemInventory) {
    return ( 
        <Item rare={item.rare}>
            <ActionsModal>
                <ButtonAction isDisabled={false}>
                    Информация
                </ButtonAction>
                <ButtonAction isDisabled={false}>
                    Использовать
                </ButtonAction>
                <ButtonAction isDisabled={false}>
                    Продать
                </ButtonAction>
                <ButtonAction isDisabled={false}>
                    Выбросить
                </ButtonAction>
            </ActionsModal>
            <Icon>
                <ImgIcon alt='' src={require('../../../'+item.avatar)} />
            </Icon>
            <Title>
                {
                    item.title
                }
            </Title>
            <Count>
                x{ count }
            </Count>
        </Item>
     );
}



interface ButtonProps{
    isDisabled: boolean;
}

const ButtonAction = styled.div<ButtonProps>`
    
    color: ${p => p.isDisabled ? '#bebebe;' : 'black;'};
    background: ${p => p.isDisabled ? '#7e7e7e;' : 'white;'};
    font-size: 18px;
    cursor: ${p => p.isDisabled ? 'default;' : 'pointer;'};
    width: 100%;
    padding: 5px;
    transition: 0.1s;
    box-sizing: border-box;

    &:hover{
        ${
            p => !p.isDisabled
                ? `background-color: #bebebe;
                    padding-left: 15px;`
                : ''
        }
    }
`

const ActionsModal = styled.div`
    z-index: -1;
    width: 100%;
    top: 0;
    height: auto;
    position: absolute;
    opacity: 0%;
    background-color: white;
    border: 1px solid black;
    box-shadow: 0 0 5px #0000005a;
    padding: 5px;
    display: flex;
    gap: 5px;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    transition: 0.3s;
`

const Count = styled.div`
    color: white;
    position: absolute;
    margin: 5px;
    bottom: 0;
    right: 0;
`

const Title = styled.p`
    margin: 5px;
`

const ImgIcon = styled.img`
    width: 90%;
    
`

const Icon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    width: 150px;
    height: 150px;
`

interface IItemProps {
    rare: string;
}

const Item = styled.div<IItemProps>`
    position: relative;
    z-index: 1;
    box-shadow: 0 0 5px #0000005a;
    background: white;
    border-radius: 5px;
    width: 150px;
    height: 250px;
    margin: 20px;
    transition: 0.3s;

    background: ${props => 
        props.rare === 'common' 
        ? "linear-gradient(135deg, white 80%, #a4a4ab 80%);"
        : props.rare === 'uncommon'
        ? "linear-gradient(135deg, white 80%, #59c87f 80%);"
        : props.rare === 'rare'
        ? "linear-gradient(135deg, white 80%, #4d69cd 80%);"
        : props.rare === 'mythical'
        ? "linear-gradient(135deg, white 80%, #d42be6 80%);"
        : "linear-gradient(135deg, white 80%, #caab05 80%);"
    };

    &:hover{
        z-index: 9999;
        transform: scale(1.1);
    }

    &:hover ${ActionsModal}{
        z-index: 999;
        opacity: 100%;
    }
`

export default InventoryItem;