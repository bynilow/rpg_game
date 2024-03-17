import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Avatar from "../../Avatar/Avatar";
import Title from "../../Title/Title";
import Wrapper from "../../Wrapper/Wrapper";
import Modal from "../Modal";
import { useAppSelector } from "../../../hooks/redux";
import SquareButton from "../../Buttons/SquareButton";
import { scrollBarX } from "../../../styles/scrollbars";
import WinCombatItem from "../ItemCard/ItemCard";
import InventoryModal from "../InventoryModal/InventoryModal";
import { IFullItemWithCount } from "../../../models/IAreaItem";
import ItemCard from "../ItemCard/ItemCard";

interface ITradeModalProps {
	personId?: string;
}

const TradeModal: FC<ITradeModalProps> = ({ personId }) => {
	const { player, tradingItems } = useAppSelector((state) => state.userReducer);

	const [coins, setCoins] = useState(0);
	const [selectedItems, setSelectedItems] = useState<IFullItemWithCount[]>([]);
	const [isReady, setIsReady] = useState(false);
	const [isInventoryOpened, setIsInventoryOpened] = useState(false);

	const onAcceptItems = (items: IFullItemWithCount[]) => {
		setSelectedItems(items);
		setIsInventoryOpened(false);
	}

	useEffect(() => {
		console.log(tradingItems)
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
			<Modal
				$size="large"
				$isCloseButton
				$closeButtonFunction={() => { }}
				$flexDirection="column" >
				<ModalInner>
					<Title>Обмен с игроком - {personId}</Title>
					<TradesBlock>
						<TradeItems>
							<GiveInfo>
								<CoinsBlock>
									<GiveCoinsBlock>
										<InputCoins
											type="number"
											maxLength={3}
											value={coins}
											onChange={(e) => setCoins(Number(e.target.value))}
										/>
										<Avatar $image="icons/items/other/coin.png" width="2rem" />
									</GiveCoinsBlock>
									<UserCoins>
										{player.coins}
										<Avatar $image="icons/items/other/coin.png" width="2rem" />
									</UserCoins>
								</CoinsBlock>
								<List key={tradingItems.length}>
									{
										tradingItems.map((item: any) =>
											<ItemCard
												key={item.item.id}
												id={item.item.id}
												count={item.count} />)
									}
									<SquareButton $width="10rem" $onClick={() => setIsInventoryOpened(true)}>
										+
									</SquareButton>
								</List>
							</GiveInfo>
							<ButtonsGroup>
								{!isReady ? (
									<SquareButton
										$isSquare={false}
										$fontSize="1rem"
										$onClick={() => setIsReady(true)} >
										Готов
									</SquareButton>
								) : (
									<SquareButton
										$isSquare={false}
										$fontSize="1rem"
										$onClick={() => setIsReady(false)} >
										Передать
									</SquareButton>
								)}
								{isReady ? (
									<SquareButton
										$isSquare={false}
										$fontSize="1rem"
										$onClick={() => setIsReady(false)} >
										Отменить
									</SquareButton>
								) : null}
							</ButtonsGroup>
						</TradeItems>

						<TradeItems></TradeItems>
					</TradesBlock>
				</ModalInner>
			</Modal>
		</>
	);
};

const ButtonsGroup = styled.div`
	display: flex;
	gap: 10px;
`;

const List = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 10px;
	padding: 10px;
	max-height: 100%;
	margin-bottom: 1rem;
	overflow-y: scroll;

	${scrollBarX}
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
	height: 100%;
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

const GiveInfo = styled.div`
	display: flex;
	flex-direction: column;
`;

const TradeItems = styled.div`
	width: 100%;
	min-height: 100%;
	max-height: 100%;
	border: 1px solid black;
	border-radius: 15px;
	padding: 10px;
	/* margin-bottom: 3rem; */
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 15px;
`;

const TradesBlock = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	gap: 15px;
`;

const ModalInner = styled.div`
	width: 100%;
	height: 100%;
	padding: 15px 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 15px;
`;

export default TradeModal;
