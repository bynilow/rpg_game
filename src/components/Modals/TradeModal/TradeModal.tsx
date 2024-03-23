import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Avatar from "../../Avatar/Avatar";
import Title from "../../Title/Title";
import Wrapper from "../../Wrapper/Wrapper";
import Modal from "../Modal";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import SquareButton from "../../Buttons/SquareButton";
import { scrollBarX } from "../../../styles/scrollbars";
import WinCombatItem from "../ItemCard/ItemCard";
import InventoryModal from "../InventoryModal/InventoryModal";
import { IFullItemWithCount } from "../../../models/IAreaItem";
import ItemCard from "../ItemCard/ItemCard";
import { getTradeItemsAC } from "../../../store/reducers/ActionCreators";
import TradingBlock from "./TradingBlock";
import TradingInfo from "./TradingBlock";
import { DELAY_POLLING } from "../../../const/const";

interface ITradeModalProps {
	personId?: string;
}

const TradeModal: FC<ITradeModalProps> = ({ personId }) => {
	const { player, tradingItems, userData } = useAppSelector((state) => state.userReducer);
	const dispatch = useAppDispatch();

	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		dispatch(getTradeItemsAC());
		const interval = setInterval(async () => {
			dispatch(getTradeItemsAC());
		}, DELAY_POLLING);

		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<>
			<Modal
				$size="large"
				$isCloseButton
				$closeButtonFunction={() => { }}
				$flexDirection="column"
				$justifyContent="center"
				$alignItems="center" >
				<ModalInner>
					<Title>Обмен с игроком - {personId}</Title>
					<TradesBlock>
						<TradingInfo $isCurrentPlayer={true} />
						<TradingInfo $isCurrentPlayer={false} />
					</TradesBlock>
					<ButtonsGroup>
						{!isReady
							? (
								<SquareButton
									$isSquare={false}
									$fontSize="1rem"
									$onClick={() => setIsReady(true)} >
									Готов
								</SquareButton>
							)
							: (
								<SquareButton
									$isSquare={false}
									$fontSize="1rem"
									$onClick={() => setIsReady(false)} >
									Передать
								</SquareButton>
							)}
						{
							isReady &&
							<SquareButton
								$isSquare={false}
								$fontSize="1rem"
								$onClick={() => setIsReady(false)} >
								Отменить
							</SquareButton>
						}
					</ButtonsGroup>
				</ModalInner>
			</Modal>
		</>
	);
};

const ButtonsGroup = styled.div`
	display: flex;
	gap: 10px;
`;

const TradesBlock = styled.div`
	height: 80%;
	display: grid;
	grid-template-columns: repeat(2, minmax(8rem, 1fr));
	gap: 15px;

	@media (max-width: 768px) {
        grid-template-columns: 1fr;
		grid-template-rows: 1fr 1fr;
    }
`;

const ModalInner = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 15px;
	overflow: hidden;
`;

export default TradeModal;
