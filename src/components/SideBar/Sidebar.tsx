import { FC, useState } from 'react';
import styled from 'styled-components'
import { palette } from '../../styles/palette';
import { useAppSelector } from '../../hooks/redux';
import SidebarItem from './SidebarItem';

interface ISidebarProps {

}

const Sidebar: FC<ISidebarProps> = ({}) => {

    const {buffs} = useAppSelector(state => state.userReducer);

    const [isBarClosed, setIsBarClosed] = useState(true);

    return (  
        <Block
            onMouseEnter={() => setIsBarClosed(false)}
            onMouseLeave={() => setIsBarClosed(true)} >
            {
                buffs.map((buff, ind) => 
                    <SidebarItem 
                        key={buff.idStat + ind} 
                        $title={buff.title}
                        $description={buff.description}
                        $count={buff.count}
                        $type={buff.type}
                        $isBarClosed={isBarClosed} />)
            }
        </Block>
    );
}

const Block = styled.div`
    position: absolute;
    z-index: 99;
    top: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: auto 0;
    padding: 0.5rem;
    width: 5rem;
    height: 100%;
    background-color: ${palette.backgroundColor};
    box-shadow: 0 0 5px black;
    border-radius: 15px;
    transition: 0.3s;

    &:hover{
        width: 20rem;
    }
`

export default Sidebar;