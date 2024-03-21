import { useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../../hooks/redux";
import { IItemInventory } from "../../../models/IInventory";
import { equipItem, removeItemTradingAC, removeItemsFromInventoryAC, } from "../../../store/reducers/ActionCreators";
import { palette } from "../../../styles/palette";
import Avatar from "../../Avatar/Avatar";
import CircleButton from "../../Buttons/CircleButton";
import SquareButton from "../../Buttons/SquareButton";
import Title from "../../Title/Title";
import { getRareColor } from "../../../styles/backgrounds";
import { IFullItemWithCount, IRare } from "../../../models/IAreaItem";
import DeleteItemsModal from "../DeleteItemsModal/DeleteItemsModal";

interface IInvItemProps {
	$onClickMultipleDelete: Function;
	$isSelectMode?: boolean;
	$onSelectItem?: Function;
	$isSelected?: boolean;
	$selectedCount?: number;
}

function InventoryItem({
	item,
	count,
	$onClickMultipleDelete,
	$isSelectMode = false,
	$onSelectItem,
	$isSelected,
	$selectedCount
}: IItemInventory & IInvItemProps) {
	const dispatch = useAppDispatch();

	const [isCanUse, setIsCanUse] = useState(item.type === "food");
	const [isCanEquip, setIsCanEquip] = useState(
		item.type === "armor" || item.type === "weapon" || item.type === "tool",
	);
	const [isSelectToDelete, setIsSelectToDelete] = useState(false);
	const [isSelected, setIsSelected] = useState(!!$isSelected);

	const onClickCancelDelete = () => {
		setIsSelectToDelete(false);
	};

	const onClickDeleteItem = () => {
		if (isSelectToDelete) {
			dispatch(removeItemsFromInventoryAC([{ ...item, count: 1 }]));
		} else {
			if (count > 2) {
				$onClickMultipleDelete({ ...item, count });
			} else {
				setIsSelectToDelete(true);
			}
		}
	};

	const onClickEquip = () => {
		dispatch(equipItem(item.id));
	};

	const [isSelectModalOpened, setIsSelectModalOpened] = useState(false);
	const [selectedCount, setSelectedCount] = useState($selectedCount || 0);

	const onClickSelect = () => {
		if (!isSelected) {
			if (count > 1) {
				setIsSelectModalOpened(true);
			} else {
				setIsSelected(true);
				setSelectedCount(1);
				if ($onSelectItem) $onSelectItem({ ...item, count });
			}
		} else {
			setIsSelected(false);
			setSelectedCount(0);
			dispatch(removeItemTradingAC(item.id));
		}
	};

	const onSelectedFromModal = (count: number) => {
		setSelectedCount(count);
		setIsSelectModalOpened(false);
		setIsSelected(true);
		if ($onSelectItem) $onSelectItem({ ...item, count });
	}

	const onClickCancelSelect = () => {
		setSelectedCount(0);
		setIsSelected(false);
		setIsSelectModalOpened(false);
	}

	return (
		<>
			{
				isSelectModalOpened
					? <DeleteItemsModal
						$isDeleteMode={false}
						$onClickAcceptCount={(count: number) => onSelectedFromModal(count)}
						$item={{ ...item, count: 1 }}
						$itemTitle=""
						$max={count}
						$min={1}
						$closeModal={() => onClickCancelSelect()} />
					: null
			}
			<Item
				$isSelected={isSelected}
				$isSelectMode={$isSelectMode}
				onClick={
					$isSelectMode
						? () => onClickSelect()
						: () => { }}
				$rare={item.rare}
				onMouseLeave={() => onClickCancelDelete()} >

				<Avatar key={""} $image={item.avatar} width={"100px"} />
				<InfoButton>
					<CircleButton symbol="?" />
				</InfoButton>
				<Info>
					<Title $size="1.2rem">
						{item.title} {
							$isSelectMode
								? isSelected
									? `x${selectedCount} (${count})`
									: `(${count})`
								: `x${count}`}
					</Title>
					{
						!$isSelectMode
							? (<ButtonsGroup>
								{isCanUse && (
									<SquareButton
										$fontSize="1rem"
										$isSquare={false}
										$onClick={() => { }} >
										Использовать
									</SquareButton>
								)}
								{isCanEquip && !isSelectToDelete ? (
									<SquareButton
										$fontSize="1rem"
										$isSquare={false}
										$onClick={() => onClickEquip()} >
										Экипировать
									</SquareButton>
								) : null}
								<DeleteBlock>
									{isSelectToDelete ? (
										<SquareButton $fontSize="1rem" $onClick={onClickDeleteItem}>
											{palette.checkMark}
										</SquareButton>
									) : (
										<SquareButton
											$fontSize="1rem"
											$isSquare={false}
											$onClick={onClickDeleteItem} >
											Удалить
										</SquareButton>
									)}

									{isSelectToDelete ? (
										<SquareButton
											$fontSize="1rem"
											$onClick={() => onClickCancelDelete()} >
											{palette.cancelMark}
										</SquareButton>
									) : null}
								</DeleteBlock>
							</ButtonsGroup>)
							: null}
					<AboutItemBlock>
						<Cost>${item.cost}</Cost>
						<Weight>
							kg
							{" " + item.weight}
						</Weight>
					</AboutItemBlock>
				</Info>
			</Item>
		</>
	);
}

const InfoButton = styled.div`
	position: absolute;
	top: 0;
	right: -30%;

	transition: 0.3s;
`;

const DeleteBlock = styled.div`
	z-index: 9;
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	width: 100%;
`;

const ButtonsGroup = styled.div`
	display: flex;
	gap: 5px;
	height: 100%;
	flex-direction: column;
	transform: translateY(150%);

	transition: 0.3s;
`;

const Info = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
	height: 100%;
`;

const AboutItemBlock = styled.div`
	display: flex;
	flex-direction: column;
	align-items: end;
	gap: 5px;
	position: absolute;
	z-index: -1;
	margin: 5px;
	bottom: 0;
	right: 0;
`;

const Weight = styled.p`
	color: black;
	background-color: #dddddd;
	border-radius: 5px;
	padding: 5px;
`;

const Cost = styled.p`
	color: black;
	background-color: #dddddd;
	border-radius: 5px;
	padding: 5px;
`;

interface IItemProps {
	$rare: string;
	$isSelectMode: boolean;
	$isSelected: boolean;
}

const Item = styled.div<IItemProps>`
	position: relative;
	display: flex;
	align-items: center;
	gap: 10px;
	z-index: 1;
	box-shadow: 0 0 5px #0000005a;
	background: white;
	border-radius: 5px;
	height: 10rem;
	padding: 15px;
	overflow: hidden;
	width: 100%;
	flex: 30%;
	cursor: ${(p) => (p.$isSelectMode ? "pointer" : "default")};
	transition: 0.3s;

	background: ${(props) =>
		props.$rare === "common"
			? "linear-gradient(135deg, white 80%, #a4a4ab 80%);"
			: props.$rare === "uncommon"
				? "linear-gradient(135deg, white 80%, #59c87f 80%);"
				: props.$rare === "rare"
					? "linear-gradient(135deg, white 80%, #4d69cd 80%);"
					: props.$rare === "mythical"
						? "linear-gradient(135deg, white 80%, #d42be6 80%);"
						: "linear-gradient(135deg, white 80%, #caab05 80%);"};

	${(p) =>
		p.$isSelected
			? `
                outline: 5px solid ${getRareColor(p.$rare as IRare)};
                transform: scale(0.9);`
			: ``}

	&:hover {
		z-index: 9999;
		transform: scale(1.07);
		box-shadow: 0 0 5px 1px black;
	}

	&:hover ${InfoButton} {
		right: 0%;
	}

	&:hover ${ButtonsGroup} {
		transform: translateY(0%);
	}

	@media (max-width: 769px) {
		min-width: 40%;
	}
	@media (max-width: 426px) {
		min-width: 100%;
	}
`;

export default InventoryItem;
