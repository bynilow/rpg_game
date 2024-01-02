import styled from 'styled-components'
import Avatar from '../Avatar/Avatar';

interface ICombatText {
    isEnemyAttack: boolean;
    isMissed: boolean;
    isCrit: boolean;
    isBlocked: boolean;
    isDodged: boolean;
    isSay: boolean;
    avatar: string;
    text: string;
    damage: number;
    characterName: string;
    hurtName: string;
    date: string;
}

function CombatText({
    isEnemyAttack, 
    avatar, 
    text, 
    damage, 
    characterName, 
    hurtName, 
    date, 
    isMissed,
    isSay,
    isCrit,
    isBlocked,
    isDodged}: ICombatText) {
    
    ///<span color="red"> characterName </span>

    return ( 
        <Block
            $isMissed={isMissed}
            $isCrit={isCrit}
            $isSay={isSay}
            $isBlocked={isBlocked}
            $isDodged={isDodged}>
            <Avatar 
                $image={avatar}
                width={'70px'} 
                height={'70px'} />
            <ActionBlock>
                <Time>
                    {
                        date
                    }
                </Time>
                <Name>
                    {characterName}
                </Name>
                {
                    isMissed || isSay
                        ? <Text>
                            {text}
                        </Text>
                        : isDodged
                            ? <Text>
                                <CharacterName isEnemyAttack={isEnemyAttack}>
                                    {hurtName}
                                </CharacterName>
                                {
                                    text.slice(text.indexOf('#name')+5)
                                }
                            </Text>
                            : <Text>
                                {
                                    text.slice(0, text.indexOf('#name'))
                                }
                                <CharacterName isEnemyAttack={isEnemyAttack}>
                                    {hurtName}
                                </CharacterName>
                                {
                                    text.slice(text.indexOf('#name') + 5, text.indexOf('#damage'))
                                }
                                <Damage isCrit={isCrit}>
                                    {damage}
                                </Damage>
                                {
                                    text.slice(text.indexOf('#damage') + 7)
                                }
                            </Text>
                }
            </ActionBlock>
        </Block>
     );
}

const Time = styled.p`
    margin: 0;
    top: 0;
    right: 0;
    color: #b4b4b4;
    position: absolute;
`

const ActionBlock = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`

const Name = styled.p`
    margin: 0;
    font-weight: bold;
`

interface IDamageProps{
    isCrit: boolean;
}

const Damage = styled.span<IDamageProps>`
    font-weight: bold;
    text-decoration: underline;
    ${
        p => p.isCrit
        ? 'color: #bb3535'
        : ''
    }
`

interface ICharacterNameProps{
    isEnemyAttack: boolean;
}

const CharacterName = styled.span<ICharacterNameProps>`
    font-weight: bold;
    text-decoration: underline;
    color: ${
        p => p.isEnemyAttack
            ? '#509fe0'
            : '#e05050'
    };
`

const Text = styled.p`
    margin: 0;
`

interface IBlockProps {
    $isMissed: boolean;
    $isCrit: boolean;
    $isSay: boolean;
    $isDodged: boolean;
    $isBlocked: boolean;
}

const Block = styled.div<IBlockProps>`
    border-radius: 5px;
    padding-bottom: 10px;
    border-bottom: 5px solid ${
        p => p.$isMissed
        ? '#58b15f'
        : p.$isCrit
        ? '#c74d4d'
        : p.$isSay
        ? '#608fbb'
        : p.$isBlocked
        ? '#a35bc4'
        : p.$isDodged
        ? '#e0de60'
        : '#979797'
    };
    width: 100%;
    display: flex;
    align-items: start;
    gap: 10px;
    box-sizing: border-box;
`

export default CombatText;