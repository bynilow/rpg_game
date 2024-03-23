import { Account, Models } from "appwrite";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { account } from "../../../appwrite/config";
import { getStats } from "../../../functions/Stats";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { IAviablePath, IChangeInfo } from "../../../models/IArea";
import { IAreaCurrentEnemy } from "../../../models/IEnemy";
import {
	authUserAC,
	getAvailablePaths,
	goLevel,
} from "../../../store/reducers/ActionCreators";
import { scrollBarX } from "../../../styles/scrollbars";
import CircleButton from "../../Buttons/CircleButton";
import Container from "../../Container/Container";
import Header from "../../Header/Header";
import CharacterModal from "../../Modals/Character/CharacterModal";
import CraftModal from "../../Modals/CraftModal/CraftModal";
import InfoModal from "../../Modals/InfoModal/InfoModal";
import InventoryModal from "../../Modals/InventoryModal/InventoryModal";
import ShopModal from "../../Modals/ShopModal/ShopModal";
import SkillsModal from "../../Modals/SkillsModal/SkillsModal";
import TextModal from "../../Modals/TextModal/TextModal";
import Sidebar from "../../SideBar/Sidebar";
import AreaBackground from "./AreaBackground";
import AreaEnemiesSection from "./Sections/AreaEnemiesSection";
import AreaItemsSection from "./Sections/AreaItemsSection";
import AreaPathsSection from "./Sections/AreaPathsSection";
import { redirect, useNavigate } from "react-router-dom";
import TradeModal from "../../Modals/TradeModal/TradeModal";

interface IAreaPage {
	$onClickStartBattle: Function;
}

function AreaPage({ $onClickStartBattle }: IAreaPage) {
	const dispatch = useAppDispatch();
	const { playerSkills, inventory, player, buffs, isLoading, userData } =
		useAppSelector((state) => state.userReducer);
	const { areas, availablePaths, currentLocation } = useAppSelector(
		(state) => state.areaReducer,
	);

	const [isInventoryOpen, setIsInventoryOpen] = useState(false);

	const [isInfoOpen, setIsInfoOpen] = useState(false);
	const [whatInfo, setWhatInfo] = useState("area");
	const [infoId, setInfoId] = useState(areas[0].id);

	const onClickOpenInfoModal = (info?: IChangeInfo) => {
		if (info) {
			setInfoId(info.id);
			setWhatInfo(info.whatInfo);
		}
		setIsInfoOpen(true);
	};

	const onChangeInfo = (info: IChangeInfo) => {
		setInfoId(info.id);
		setWhatInfo(info.whatInfo);
	};

	const onClickCloseModalInfo = () => {
		setIsInfoOpen(false);
		setInfoId(currentLocation.id);
		setWhatInfo("area");
	};

	const [isSkillsOpen, setIsSkillsOpen] = useState(false);

	const [isCraftOpen, setIsCraftOpen] = useState(false);

	const [isCharacterOpen, setIsCharacterOpen] = useState(false);

	const [traderId, setTraderId] = useState("");

	const [stats, setStats] = useState(getStats(playerSkills, player, buffs));

	const [actionType, setActionType] = useState("");

	const [isHpFailModalOpened, setIsHpFailModalOpened] = useState(false);

	const onClickStartBattle = (e: IAreaCurrentEnemy) => {
		if ((player.health / stats.health) * 100 > 10) {
			$onClickStartBattle(e);
		} else {
			setIsHpFailModalOpened(true);
		}
	};

	const [isUpdatingLevel, setIsUpdatingLevel] = useState(false);

	const goingLevel = (selectedPath: IAviablePath) => {
		setActionType("");

		setTimeout(() => {
			setIsUpdatingLevel(true);
			setTimeout(() => {
				setIsUpdatingLevel(false);
				dispatch(goLevel(selectedPath.pathId));
			}, 2300);
		}, 350);
	};

	const navigate = useNavigate();

	const onUserAuth = async () => {
		const isAuth = await dispatch(authUserAC());
		if (!isAuth) navigate("/login");
	};

	useEffect(() => {
		onUserAuth();
	}, [userData.$id]);

	useEffect(() => {
		setStats(getStats(playerSkills, player, buffs));
	}, [player]);

	useEffect(() => {
		dispatch(getAvailablePaths(currentLocation.id));
		onChangeInfo({ id: currentLocation.id, whatInfo: "area" });
	}, [currentLocation.id]);

	const [isTradeOpen, setIsTradeOpen] = useState(true);

	if (!currentLocation || isLoading) return <div>Loading...</div>;
	return (
		<Global key={userData.$id}>
			{true ? <TradeModal /> : null}

			{traderId ? (
				<ShopModal
					$traderId={traderId}
					$locationId={currentLocation.id}
					$closeModal={() => setTraderId("")}
					$openInfoModal={(info: IChangeInfo) => onClickOpenInfoModal(info)}
				/>
			) : null}

			{isCharacterOpen ? (
				<CharacterModal $closeModal={() => setIsCharacterOpen(false)} />
			) : null}

			{isCraftOpen ? (
				<CraftModal
					$closeModal={() => setIsCraftOpen(false)}
					$openInfoModal={(info: IChangeInfo) => onClickOpenInfoModal(info)}
				/>
			) : null}

			{isInventoryOpen ? (
				<InventoryModal closeModal={() => setIsInventoryOpen(false)} />
			) : null}

			{isSkillsOpen ? (
				<SkillsModal $closeModal={() => setIsSkillsOpen(false)} />
			) : null}

			{isInfoOpen ? (
				<InfoModal
					$id={infoId}
					$closeModal={() => onClickCloseModalInfo()}
					$whatInfo={whatInfo}
					$changeInfo={(info: IChangeInfo) => onChangeInfo(info)}
				/>
			) : null}

			{isHpFailModalOpened ? (
				<TextModal $onClickCloseModal={() => setIsHpFailModalOpened(false)}>
					Количество ОЗ должно быть больше 10% !
				</TextModal>
			) : null}

			<AreaBackground $image={currentLocation.avatar} />

			<Header
				$openInventory={() => setIsInventoryOpen(true)}
				$openSkills={() => setIsSkillsOpen(true)}
				$openCraft={() => setIsCraftOpen(true)}
				$openCharacter={() => setIsCharacterOpen(true)}
			/>

			<Container>
				<Area>
					{/* <Sidebar /> */}
					<EmptySidebar />
					<AreaInfo>
						<LevelName color={currentLocation.color}>
							{currentLocation.title}
							<CircleButton symbol="?" click={() => onClickOpenInfoModal()} />
						</LevelName>

						<AreaActionMenu>
							<AreaPathsSection
								$playerStats={stats}
								$isBlocked={!!actionType}
								$isUpdatingLevel={isUpdatingLevel}
								$changeActionType={() => setActionType("path")}
								$clearActionType={() => setActionType("")}
								$goLevel={(path: IAviablePath) => goingLevel(path)}
							/>

							<AreaItemsSection
								$playerStats={stats}
								$isBlocked={!!actionType}
								$isUpdatingLevel={isUpdatingLevel}
								$changeActionType={() => setActionType("items")}
								$clearActionType={() => setActionType("")}
							/>

							<AreaEnemiesSection
								$isBlocked={!!actionType}
								$isUpdatingLevel={isUpdatingLevel}
								$onClickStartBattle={(e: IAreaCurrentEnemy) =>
									onClickStartBattle(e)
								}
								$setTraderId={(id: string) => setTraderId(id)}
							/>
							<Empty />
						</AreaActionMenu>
					</AreaInfo>
				</Area>
			</Container>
		</Global>
	);
}

const EmptySidebar = styled.div`
	width: 5rem;
`;

const AreaInfo = styled.div`
	width: 100%;
	display: flex;
	gap: 20px;
	flex-direction: column;
`;

const Global = styled.div`
	max-height: 100vh;
	padding-top: 1rem;
	overflow-x: auto;
	display: flex;
	gap: 20px;
	flex-direction: column;
	align-items: center;
`;

const Empty = styled.div`
	/* height: 3rem; */
	width: 100%;
`;

const Area = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	gap: 30px;
	width: 100%;
	max-height: 100%;
`;

const AreaActionMenu = styled.div`
	z-index: 1;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 3rem;
	width: 100%;
	height: 70vh;
	padding: 0.3rem;
	transition: 1s;
	overflow-y: hidden;

	${scrollBarX}

	@media (max-width: 1200px) {
		overflow-y: auto;
	}
`;

interface LevelNameProps {
	color: string;
}

const LevelName = styled.div<LevelNameProps>`
	position: relative;
	font-size: 2em;
	padding: 0.5rem;
	background: ${(p) =>
		p.color === "green"
			? "linear-gradient(225deg, #ffffff 95%, #51973f 95%);"
			: p.color === "yellow"
				? "linear-gradient(225deg, #ffffff 95%, #b9ae4b 95%);"
				: "linear-gradient(225deg, #ffffff 95%, #cd4d4d 95%);"};
	box-shadow: 0 0 5px black;
	border-radius: 15px;
	/* #7a7a80
  #499b65
  #3e539e
  #8a2496
  #978414 */
`;

export default AreaPage;
