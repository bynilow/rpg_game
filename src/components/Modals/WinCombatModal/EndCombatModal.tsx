import styled, { keyframes } from 'styled-components';
import { scrollBarX } from '../../../styles/scrollbars';
import ModalBackground from '../Other/ModalBackground';
import WinCombatItem from './WinCombatItem';
import Modal from '../Modal';
import Title from '../../Title/Title';

interface IEndCombatModal {
    $items: {
        id: string;
        count: number;
    }[] | null,
    $finishBattle: Function;
    $isWin: boolean;
}

function EndCombatModal({ $items, $finishBattle, $isWin }: IEndCombatModal) {

    return (
        <Modal 
            $flexDirection='column' 
            $size={$isWin ? 'medium' : 'small'}>
            <TextBlock>
                <Title $size='2rem'>
                    {
                        $isWin
                            ? 'Победа!'
                            : 'Проигрыш!'
                    }
                </Title>
                <ItemsText>
                    {
                        $isWin
                            ? 'Полученные предметы:'
                            : 'Враг оказался сильнее...'
                    }
                </ItemsText>
            </TextBlock>
            <List>
                {
                    $isWin
                    ? $items!.map(i => <WinCombatItem
                        key={i.id}
                        count={i.count}
                        id={i.id} />)
                    : null
                }
                
            </List>
            <Button onClick={() => $finishBattle($isWin)}>
                ✔
            </Button>
        </Modal>
    );
}

const TextBlock = styled.div`
    text-align: center;
`

const Button = styled.div`
    font-size: 1.5em;
    color: white;
    border-radius: 50%;
    height: 1.5em;
    width: 1.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.3em;
    background: #308d30;
    transition: .1s;
    user-select: none;
    position: absolute;
    margin: 1.3em auto;
    right: 0;
    left: 0;
    bottom: 0;
    cursor: pointer;
    z-index: 9;

    &:hover{
        transform: scale(0.9);
    }
`

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    height: 100%;
    padding: 1.3em;
    overflow-y: auto;

    ${scrollBarX
    }
    
`

const ItemsText = styled.p`
    font-size: 1.3em;
    margin: 0;
`

const startAnim = keyframes`
    0%{
        transform: scale(0) rotate(-60deg);
    }
    70%{
        transform: scale(1.05) rotate(5deg);
    }
    100%{
        transform: scale(1) rotate(0deg);
    }
`

const WinCombat = styled.div`
    z-index: 9999;
    position: absolute;
    width: 70vw;
    height: 80vh;
    padding: 1.3em;
    top: 10%;
    background-color: white;
    box-shadow: 0 0 10px #00000050;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1.3em;

    background: white;

    animation: ${startAnim} 1s ease;
    animation-fill-mode: forwards;

    
`

export default EndCombatModal;