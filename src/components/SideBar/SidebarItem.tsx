import { FC } from 'react';
import styled from 'styled-components'
import Title from '../Title/Title';
import Avatar from '../Avatar/Avatar';
import { palette } from '../../styles/palette';

interface ISidebarItemProps {
    $title: string;
    $description: string;
    $count: number;
    $type: string;
    $isBarClosed: boolean;
}

const SidebarItem: FC<ISidebarItemProps> = ({$title, $description, $count, $type, $isBarClosed}) => {

    return (
        <Item>
            <Av $isBarClosed={$isBarClosed} />
            <Info $isBarClosed={$isBarClosed}>
                <Title $size='1.5rem'>
                    {$title}
                </Title>
                <Count>
                    {$count} {$type}
                </Count>
            </Info>
        </Item>
    );
}

interface IAvProps {
    $isBarClosed: boolean;
}

const Av = styled.div<IAvProps>`
    background-color: ${palette.lightGray};
    min-width: ${p => p.$isBarClosed ? '2rem' : '4rem'};
    border-radius: 50%;
    aspect-ratio: 1/1;

    transition: 0.2s;
`

const Info = styled.div<IAvProps>`
    display: flex;
    flex-direction: column;
    visibility: ${p => p.$isBarClosed ? 'hidden' : 'visible'};
    opacity: ${p => p.$isBarClosed ? '0' : '1'};
    transition: 0.2s;
`

const Count = styled.div`
    
`

const Description = styled.p`
    font-size: 1rem;
`

const Item = styled.div`
    position: relative;
    width: 100%;
    height: 8rem;
    padding: 1rem;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 0 5px black;
    display: flex;
    align-items: flex-start;
    gap: 10px;
`

export default SidebarItem;