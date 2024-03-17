import styled, { keyframes } from 'styled-components';
import { scrollBarX } from '../../../styles/scrollbars';
import WinCombatItem from '../ItemCard/ItemCard';
import Modal from '../Modal';
import Title from '../../Title/Title';
import SquareButton from '../../Buttons/SquareButton';

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
            $closeButtonFunction={() => {}}
            $flexDirection='column' 
            $alignItems='center'
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
            <SquareButton 
                $fontSize='3rem'
                $onClick={() => $finishBattle($isWin)}>
                ✔
            </SquareButton>
        </Modal>
    );
}

const TextBlock = styled.div`
    text-align: center;
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