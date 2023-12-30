import { useState } from 'react';
import styled from 'styled-components'
import { useAppSelector } from '../../../hooks/redux';

interface IInfoItem {
    id: string
    countMin: number;
    countMax: number;
}

function InfoItem({id, countMin, countMax}:IInfoItem) {

    const {areaItems} = useAppSelector(state => state.userReducer);

    const [item, setItem] = useState(areaItems.find(i => i.id === id)!);

    return ( 
        <Item rare={item.rare}>
            <Avatar alt='' src={require('../../../'+item.avatar)} />
            <Info>
                <Title>
                    {
                        item.title
                    }
                </Title>
                <Count>
                    Количество: {countMin} - {countMax}
                    
                </Count>
            </Info>
        </Item>
     );
}

const Info = styled.div`
    display: flex;
    flex-direction: column;
    transition: .1s;
`

const Count = styled.p`
    margin: 0;
`

const Title = styled.p`
    font-size: 20px;
    margin: 0;
    transition: .1s;
`

const Avatar = styled.img`
    width: 80px;
    height: 80px;

    transition: .3s;
    box-sizing: border-box;
`

interface IItemProps {
    rare: string;
}

const Item = styled.div<IItemProps>`
    
    width: 100%;
    height: 100px;
    box-shadow: 0 0 5px black;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    gap: 10px;
    cursor: pointer;
    transition: .1s;

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

    box-sizing: border-box;

    &:hover ${Info} {
        padding: 0 10px;
    }

    &:hover{
        background: ${props =>
        props.rare === 'common'
            ? "linear-gradient(135deg, #e7e7e7 80%, #a4a4ab 80%);"
            : props.rare === 'uncommon'
            ? "linear-gradient(135deg, #e7e7e7 80%, #59c87f 80%);"
            : props.rare === 'rare'
            ? "linear-gradient(135deg, #e7e7e7 80%, #4d69cd 80%);"
            : props.rare === 'mythical'
            ? "linear-gradient(135deg, #e7e7e7 80%, #d42be6 80%);"
            : "linear-gradient(135deg, #e7e7e7 80%, #caab05 80%);"
        }
    }

`

export default InfoItem;