import styled from 'styled-components'

interface INeedItemProps {
    $title: string;
    $id: string;
    $countNeed: number;
    $countHave: number;
}

function NeedItem({$id, $title, $countNeed, $countHave}: INeedItemProps) {

    return (  
        <Item $countHave={$countHave >= $countNeed}>
            x{$countNeed} {$title} ({$countHave}) 
        </Item>
    );
}

interface IItemProps{
    $countHave: boolean;
}

const Item = styled.p<IItemProps>`
    ${
        p => p.$countHave ? '' : 'color: gray;'
    }
`

export default NeedItem;