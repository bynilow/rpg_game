import styled from 'styled-components';
import { IFullItem } from '../../../models/IAreaItem';
import { getItemBackground, getRareColor } from '../../../styles/backgrounds';
import Avatar from '../../Avatar/Avatar';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { equipItem } from '../../../store/reducers/ActionCreators';
import Title from '../../Title/Title';

interface IEquipmentItemProps {
    $item: IFullItem;
    $isEquipped: boolean;

}

function EquipmentItem({ $item, $isEquipped }: IEquipmentItemProps) {

    const dispatch = useAppDispatch();

    const [stats, setStats] = useState<string[]>([]);

    const onClickEquip = () => {
        dispatch(equipItem($item.id));
    }

    useEffect(() => {
        switch ($item.type) {
            case 'armor':
                setStats([
                    `Множитель ОЗ: x${$item.armorStats?.healthMultiplier}`,
                    `Шанс уклонения: ${$item.armorStats?.dodgeChance}%`,
                    `Шанс промаха: ${$item.armorStats?.missChance}%`,
                    `Скорость атаки: ${$item.armorStats?.speedAttack}s`,
                    `Скорость передвижения: ${$item.armorStats?.speedMovement}s`
                ])
                break;
            case 'weapon':
                setStats([
                    `Урон: ${$item.weaponStats?.damage}`,
                    `Шанс промаха: ${$item.weaponStats?.missChance}%`,
                    `Шанс крит. урона: ${$item.weaponStats?.critChance}%`,
                    `Множитель крит. урона: x${$item.weaponStats?.critDamageMultiplier}`,
                    `Шанс блокирования: ${$item.weaponStats?.blockingChancePercent}%`,
                    `Множитель блокирования: x${$item.weaponStats?.blockingMultiplier}`,
                    `Скорость атаки: ${$item.weaponStats?.speedAttack}s`,
                ])
                break;
            case 'tool':
                setStats([
                    `Скорость добычи: ${$item.toolStats?.miningSpeed}s`,
                    `Шанс дополнительного предмета: ${$item.toolStats?.doubleChancePercent}%`,
                    
                ])
                break;
        }
    }, [])

    return (
        <Item
            $color={getRareColor($item.rare)}
            $background={getItemBackground($item.rare)}
            $isEquipped={$isEquipped}
            onClick={() => onClickEquip()}>
            <Avatar
                width='150px'
                $image={$item.avatar} />
            <Info>
                <Title $size='1.6rem'>
                    {$item.title}
                </Title>
                <Characteristic>
                    {
                        stats.map(stat => <Char key={stat}> { stat } </Char>)
                    }
                </Characteristic>
            </Info>
        </Item>
    );
}

const Char = styled.p`
    font-size: 1rem;
`

const Characteristic = styled.p`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    gap: 5px;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: fit-content;
`

interface IItemColor {
    $color: string;
    $isEquipped: boolean;
    $background: string;
}

const Item = styled.div<IItemColor>`
    background: ${p => p.$background};
    box-shadow: 0 0 5px black;
    ${
        p => 
            p.$isEquipped
                ? `outline: 7px solid ${p.$color};`
                : `outline: 0px solid ${p.$color};`
    }
    border-radius: 15px;
    height: fit-content;
    width: 100%;
    padding: 10px;
    display: flex;
    gap: 1.3rem;


    transition: 0.1s;
    cursor: pointer;

    &:hover{
        transform: scale(0.98);
    }
`

export default EquipmentItem;