import styled from 'styled-components'
import Section from '../../../Section/Section';
import Title from '../../../Title/Title';
import { scrollBarX } from '../../../../styles/scrollbars';
import CombatText from '../CombatText';
import { ICombatHistory } from '../../../../models/ICombat';

interface IHistorySectionProps {
    $combatHistory: ICombatHistory[];
}

function HistorySection({$combatHistory}: IHistorySectionProps) {

    return (
        <HistoryBattle>
            <Section
                $isBoxShadow
                $isBackgroundTransparent={false}>
                <Title>
                    Ход сражения
                </Title>
                <List>
                    {
                        $combatHistory.map((c, ind) => <CombatText
                            key={ind}
                            isEnemyAttack={c.isEnemyAttack}
                            isMissed={c.isMissed}
                            isSay={c.isSay}
                            isCrit={c.isCrit}
                            isDodged={c.isDodged}
                            isBlocked={c.isBlocked}
                            avatar={c.avatar}
                            text={c.text}
                            damage={c.damage}
                            hurtName={c.hurtName}
                            date={c.date}
                            characterName={c.characterName} />)
                    }
                </List>
            </Section>
        </HistoryBattle>
    );
}

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding: 0.5rem;

    overflow-y: scroll;
    ${scrollBarX}
`

const HistoryBattle = styled.div`
    flex: 1;
    max-height: 100%;

    @media (max-width: 1025px) {
        order: 3;
        max-height: 40%;
    }

    @media (max-width: 426px) {
        min-height: 50%;
    }
`

export default HistorySection;