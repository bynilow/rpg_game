import styled, { keyframes } from 'styled-components';
import { scrollBarX } from '../../../styles/scrollbars';
import ModalBackground from '../Other/ModalBackground';
import WinCombatItem from './WinCombatItem';
import Modal from '../Modal';

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
        <Modal $flexDirection='column'>
            <TextBlock>
                <Title>
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
    font-size: 30px;
    color: white;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: #308d30;
    transition: .1s;
    user-select: none;
    position: absolute;
    margin: 20px auto;
    right: 0;
    left: 0;
    bottom: 0;
    cursor: pointer;

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
    padding: 20px;
    overflow-y: auto;

    ${scrollBarX
    }
    
`

const ItemsText = styled.p`
    font-size: 20px;
    margin: 0;
`

const Title = styled.p`
    font-size: 30px;
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
    padding: 20px;
    top: 10%;
    background-color: white;
    box-shadow: 0 0 10px #00000050;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    background: white;

    animation: ${startAnim} 1s ease;
    animation-fill-mode: forwards;

    
`

export default EndCombatModal;