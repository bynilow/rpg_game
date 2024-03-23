import { FC, useEffect, useState } from 'react';
import styled from 'styled-components'
import { IFullItemWithCount } from '../../../models/IAreaItem';
import { useAppSelector } from '../../../hooks/redux';
import Avatar from '../../Avatar/Avatar';
import SquareButton from '../../Buttons/SquareButton';
import ItemCard from '../ItemCard/ItemCard';
import { scrollBarX } from '../../../styles/scrollbars';
import Wrapper from '../../Wrapper/Wrapper';
import InventoryModal from '../InventoryModal/InventoryModal';
import { Models } from 'appwrite';

interface ITradingBlockProps {
    $isCurrentPlayer: boolean;
}

const TradingInfo: FC<ITradingBlockProps> = ({ $isCurrentPlayer }) => {

    const { player, tradingItems, userData } = useAppSelector(state => state.userReducer);

    const [coins, setCoins] = useState(0);
    const [selectedItems, setSelectedItems] = useState<Models.Document[] & IFullItemWithCount[]>([]);

    const [isInventoryOpened, setIsInventoryOpened] = useState(false);

    const onAcceptItems = (items: IFullItemWithCount[]) => {
        // setSelectedItems(items);
        setIsInventoryOpened(false);
    }

    useEffect(() => {
        setSelectedItems(tradingItems);
    }, [tradingItems])

    return (
        <>
            {
                isInventoryOpened
                    ? <InventoryModal
                        closeModal={() => setIsInventoryOpened(false)}
                        $isSelectMode={true} />
                    : null
            }
            <TradeItems>
                <CoinsBlock>
                    <GiveCoinsBlock>
                        <InputCoins
                            type="number"
                            maxLength={3}
                            value={coins}
                            onChange={(e) => setCoins(Number(e.target.value))}
                            disabled={!$isCurrentPlayer} />
                        <Avatar $image="icons/items/other/coin.png" width="2rem" />
                    </GiveCoinsBlock>
                    {
                        $isCurrentPlayer &&
                        <UserCoins>
                            {player.coins}
                            <Avatar $image="icons/items/other/coin.png" width="2rem" />
                        </UserCoins>
                    }
                </CoinsBlock>
                <List key={tradingItems.length}>
                    {
                        tradingItems.filter(item => $isCurrentPlayer
                            ? item.user_id === userData.$id
                            : item.user_id !== userData.$id).map((item) =>
                                <ItemCard
                                    key={item.id}
                                    $isCurrentPlayerItem={$isCurrentPlayer}
                                    $documentId={item.$id}
                                    id={item.id}
                                    count={item.count} />)
                    }
                    {
                        $isCurrentPlayer &&
                        <SquareButton $width="10rem" $onClick={() => setIsInventoryOpened(true)}>
                            +
                        </SquareButton>
                    }
                </List>
            </TradeItems>
        </>
    );
}

const List = styled.div`
	display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
	gap: 10px;
	padding: 10px;
    max-height: 100%;
	overflow-y: auto;

	${scrollBarX}

    /* @media (max-width: 768px) {
        max-height: 100%;
    } */

`;

const UserCoins = styled.div`
	${Wrapper}

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	padding: 5px;
	font-size: 1rem;
	height: 100%;
`;

const InputCoins = styled.input`
	font-size: 1rem;
	width: 100%;
	height: 100%;
	border: none;
	outline: none;
	margin: 0;
	padding: 5px;

	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button,
	&:hover,
	&:focus {
		-webkit-appearance: none;
		appearance: none;
		margin: 0;
	}
`;

const GiveCoinsBlock = styled.div`
	${Wrapper}

	width: 30%;
	max-height: 100%;
	display: flex;
	gap: 10px;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	padding: 5px;

	-moz-appearance: textfield;
	-webkit-appearance: none;
	appearance: none;
`;

const CoinsBlock = styled.div`
	display: flex;
	justify-content: right;
	align-items: center;
	gap: 15px;
	height: 3rem;
`;

const TradeItems = styled.div`
    max-height: 100%;
    border: 1px solid black;
	border-radius: 15px;
	padding: 10px;
	/* margin-bottom: 3rem; */
	display: flex;
	flex-direction: column;
    align-items: stretch;
	gap: 15px;
    overflow: hidden;
`;

export default TradingInfo;