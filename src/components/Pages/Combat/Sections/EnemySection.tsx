import styled from 'styled-components'
import Section from '../../../Section/Section';
import Title from '../../../Title/Title';
import Avatar from '../../../Avatar/Avatar';

interface IEnemySectionProps {
    $avatar: string;
    $title: string;
    $level: number;
    $health: number;
    $maxHealth: number;
    $attackSpeed: number;
    $currentTimeAttack: number;
}

function EnemySection({
    $avatar,
    $title,
    $level,
    $health,
    $maxHealth,
    $attackSpeed,
    $currentTimeAttack
    }: IEnemySectionProps) {

    return (
        <CharacterBlock>
            <Section
                $isBoxShadow
                $isBackgroundTransparent={false}>

                <Avatar
                    $image={$avatar}
                    width={'150px'} />
                <Title>
                    {
                        $title
                    }
                </Title>
                <EnemyLevel>
                    Уровень: {$level}
                </EnemyLevel>
                <BlockLine>
                    <HealthLine max={$maxHealth} value={$health} />
                    <BlockText>
                        {
                            $health.toFixed(1)
                        }
                        /
                        {
                            $maxHealth
                        }
                    </BlockText>
                </BlockLine>
                <BlockLine>
                    <AttackLine max={$attackSpeed} value={$currentTimeAttack} />
                    <BlockText>
                        {
                            $currentTimeAttack.toFixed(1)
                        }s
                    </BlockText>
                </BlockLine>
            </Section>

        </CharacterBlock>
    );
}

const EnemyLevel = styled.p`
    margin: 0;
    font-size: 16px;
    color: #9b9b9b;
`

const AttackLine = styled.progress`
    width: 100%;
    height: 25px;
    border-radius: 5px;
    -webkit-appearance: none;
   appearance: none;

   transition: 0.1s;

   &::-webkit-progress-value {
    background-color: #aaaaaa;

    border-radius: 5px;
    transition: 0.2s;
   }
   &::-webkit-progress-bar {
    background-color: #757575;
    border-radius: 5px;
   }
`

const HealthLine = styled.progress`
    width: 100%;
    height: 35px;
    border-radius: 5px;
    -webkit-appearance: none;
   appearance: none;

   transition: 0.1s;

   &::-webkit-progress-value {
    background-color: #ce4646;

    border-radius: 5px;
    transition: 0.2s;
   }
   &::-webkit-progress-bar {
    background-color: #8a3939;

    border-radius: 5px;
   }
`

const BlockText = styled.p`
    margin: 0;
    margin-right: 10px;
    text-align: right;
    width: 30%;
`

const BlockLine = styled.div`
    box-shadow: 0 0 5px black;
    min-height: 1.3em;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
`

const CharacterBlock = styled.div`
    flex: 1;
    height: auto;

    @media (max-width: 1025px) {
        order: 2;
        height: auto;
    }

    @media (max-width: 426px) {
        min-height: auto;
    }
`

export default EnemySection;