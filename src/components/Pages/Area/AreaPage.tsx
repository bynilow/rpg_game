import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IArea, IAviablePath, IChangeInfo } from '../../../models/IArea';
import { IFullItem } from '../../../models/IAreaItem';
import { IAreaCurrentEnemy } from '../../../models/IEnemy';
import { addXP, getAvailablePaths, goLevel, mineItem, setAreasFromStorage, setInventoryFromStorage, setPlayerFromStorage, setSkillsFromStorage, updateAreaEnemies, updateAreaItems } from '../../../store/reducers/ActionCreators';
import { scrollBarX } from '../../../styles/scrollbars';
import CircleButton from '../../Buttons/CircleButton';
import AreaEnemy from './AreaEnemy';
import AreaItem from './AreaItem';
import AreaPath from './AreaPath';
import InventoryModal from '../../Modals/InventoryModal/InventoryModal';
import InfoModal from '../../Modals/InfoModal/InfoModal';
import Header from '../../Header/Header';
import Section from '../../Section/Section';
import SkillsModal from '../../Modals/SkillsModal/SkillsModal';


interface IAreaPage {
    $onClickStartBattle: Function;
}

function AreaPage({ $onClickStartBattle }: IAreaPage) {

    const dispatch = useAppDispatch();
    const { areas, availablePaths, currentLocationId } = useAppSelector(state => state.userReducer);

    const currentLocation = areas[areas.findIndex((i: IArea) => i.id === currentLocationId)];

    const getAreaFromId = (id: string) => {
        return areas[areas.findIndex(i => i.id === id)];
    }

    const lastRespawnAreaItems = new Date(currentLocation.lastRespawnAreaItems);
    const nextRespawnAreaItems = new Date(
        new Date(lastRespawnAreaItems)
            .setMinutes(lastRespawnAreaItems.getMinutes() + currentLocation?.timeToRespawnAreaItems));

    const lastRespawnAreaEnemies = new Date(currentLocation?.lastRespawnAreaEnemies);
    const nextRespawnAreaEnemies = new Date(
        new Date(lastRespawnAreaEnemies)
            .setMinutes(lastRespawnAreaEnemies.getMinutes() + currentLocation?.timeToRespawnAreaEnemies));

    const [isInventoryOpen, setIsInventoryOpen] = useState(false);

    const closeInventoryModal = () => {
        setIsInventoryOpen(false);
    }

    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [whatInfo, setWhatInfo] = useState('area');
    const [infoArea, setInfoArea] = useState(currentLocation);
    const [infoItemId, setInfoItemId] = useState('');
    const [infoEnemyId, setInfoEnemyId] = useState('');

    const onClickOpenInfoModal = () => {
        setIsInfoOpen(true);
    }

    const onChangeInfo = ({ ...info }: IChangeInfo) => {
        console.log(info.whatInfo, info.enemyId)
        if (info.whatInfo === 'area' && info.area) {
            setInfoArea(info.area);
        }
        else if (info.whatInfo === 'item' && info.itemId) {
            setInfoItemId(info.itemId);
        }
        else if (info.whatInfo === 'enemy' && info.enemyId) {
            setInfoEnemyId(info.enemyId);
        }
        setWhatInfo(info.whatInfo);
        
    }

    const onClickCloseModalInfo = () => {
        setIsInfoOpen(false);
        setInfoArea(currentLocation);
        setInfoItemId('');
        setInfoEnemyId('');
        setWhatInfo('area');
    }

    const [moveAreaId, setMoveAreaId] = useState<string>('');

    const onClickGoLevel = (selectedPath: IAviablePath) => {
        dispatch(goLevel(selectedPath.pathId));

    }

    const [miningItemId, setMiningItemId] = useState<string>('');

    const onClickItem = (miningItem: IFullItem) => {
        dispatch(mineItem({ ...miningItem, count: 1 }));
        dispatch(addXP(miningItem.baseCountXP));
    }

    const getNameAreaById = (lvlId: string) => {
        const name = areas.find(p => p.id === lvlId)?.title;
        return name
    }

    const [isSkillsOpen, setIsSkillsOpen] = useState(false);

    useEffect(() => {
        if (areas.length < 2) {
            dispatch(setAreasFromStorage());
            console.log(JSON.parse(localStorage.areas))
        }

        if (currentLocation) {
            dispatch(getAvailablePaths(currentLocation.id));
            dispatch(setInventoryFromStorage());
            dispatch(setPlayerFromStorage());
            dispatch(setSkillsFromStorage());
        }

        if (nextRespawnAreaItems.getTime() < (new Date()).getTime()) {
            dispatch(updateAreaItems({
                levelId: currentLocation.id,
                date: new Date().toISOString(),
                itemsToUpdate: currentLocation.areaItems
            }));
        }

        if (nextRespawnAreaEnemies.getTime() < (new Date()).getTime()) {
            dispatch(updateAreaEnemies({
                levelId: currentLocation.id,
                enemies: currentLocation.enemies
            }));
        }

        onChangeInfo({area: currentLocation, whatInfo: 'area'});
    }, [currentLocationId])

    return (
        <>
            {
                isInventoryOpen
                    ? <InventoryModal closeModal={() => closeInventoryModal()} />
                    : null
            }
            {
                isInfoOpen
                    ? <InfoModal
                        $area={infoArea}
                        $itemId={infoItemId}
                        $enemyId={infoEnemyId}
                        $closeModal={() => onClickCloseModalInfo()}
                        $whatInfo={whatInfo}
                        $changeWhatInfo={(info: IChangeInfo) => onChangeInfo(info)} />
                    : null
            }
            {
                isSkillsOpen
                    ? <SkillsModal $closeModal={() => setIsSkillsOpen(false)} />
                    : null
            }
            <Background $image={require('../../../' + currentLocation.avatar)} />
            <Header 
                $openInventory={() => setIsInventoryOpen(true)}
                $openSkills={() => setIsSkillsOpen(true)} />
            <Area>
            
                <LevelName color={currentLocation.color}>
                    Ты на уровне: {currentLocation.title} / {currentLocation.id}
                    <CircleButton symbol='?' click={() => onClickOpenInfoModal()} />

                </LevelName>

                <AreaActionMenu>
                    <Section
                        $isBlocked={miningItemId !== ''}
                        $isBoxShadow
                        $isBackgroundTransparent={false}>

                        <NameBlock>Доступные пути:</NameBlock>
                        <LevelsList>
                            {
                                availablePaths.map((p, ind) => <AreaPath
                                    key={p.pathId}
                                    index={ind}
                                    areaId={p.pathId}
                                    setMoveAreaId={() => setMoveAreaId(p.pathId)}
                                    clearMoveAreaId={() => setMoveAreaId('')}
                                    moveAreaId={moveAreaId}
                                    avatarUrl={getAreaFromId(p.pathId).avatar}
                                    title={getNameAreaById(p.pathId) || ''}
                                    timeToMove={p.time}
                                    goLevel={() => onClickGoLevel(p)} />)
                            }
                        </LevelsList>
                    </Section>

                    <Section
                        $isBlocked={moveAreaId !== ''}
                        $isBoxShadow
                        $isBackgroundTransparent={false}>

                        <NameBlock>Местность: </NameBlock>
                        <DescriptionText>
                            ⟳ {nextRespawnAreaItems.toLocaleString()}
                        </DescriptionText>

                        <LevelsList>
                            {
                                currentLocation.currentAreaItems.map((i: IFullItem, ind) =>
                                    <AreaItem
                                        key={i.idInArea + currentLocation.id}
                                        index={ind}
                                        setIsMiningId={() => setMiningItemId(i.idInArea)}
                                        clearIsMiningId={() => setMiningItemId('')}
                                        miningId={miningItemId}
                                        item={i}
                                        mineItem={() => onClickItem(i)} />)
                            }
                        </LevelsList>
                    </Section>

                    <Section
                        $isBlocked={miningItemId !== '' || moveAreaId !== ''}
                        $isBoxShadow
                        $isBackgroundTransparent={false}>

                        <NameBlock>Враги: </NameBlock>
                        <DescriptionText>
                            ⟳ {nextRespawnAreaEnemies.toLocaleString()}
                        </DescriptionText>
                        <LevelsList >
                            {
                                currentLocation.currentEnemies
                                    ? currentLocation.currentEnemies.map((e, ind) =>
                                        <AreaEnemy
                                            key={e.idInArea}
                                            id={e.id}
                                            $idInArea={e.idInArea}
                                            $onClickStartBattle={() => $onClickStartBattle(e)}
                                            $index={ind}
                                            $level={e.level} />)
                                    : null
                            }
                        </LevelsList>
                    </Section>


                </AreaActionMenu>
            </Area>
        </>
    );
}

interface IBackgroundProps {
    $image: string;
  }
  
  const Background = styled.div<IBackgroundProps>`
    z-index: -1;
    position: fixed;
    top: -80%;
    left: -15%;
    width: 130%;
    height: 250%;
    transition: 5s ease;
    background-image: ${p => `url( ${p.$image} )`};
    background-size: cover;
    background-repeat: no-repeat;
    filter: blur(5px);
  
    &::after{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgb(255,255,255);
      background: linear-gradient(180deg, rgba(255,255,255,0) 60%, rgba(0,0,0,1) 80%);
    }
  `

const Area = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 90%;
    height: 75%;
    box-sizing: border-box;
`

const LevelsList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: left;

`

const AreaActionMenu = styled.div`
  z-index: 1;
  display: flex;
  justify-content: space-around;
  max-height: 100%;
  gap: 50px;
  width: 100%;
  transition: 1s;
`

const NameBlock = styled.p`
  font-size: 20px;
  margin: 0;
`

interface LevelNameProps {
    color: string;
}

const LevelName = styled.div<LevelNameProps>`
  position: relative;
  font-size: 30px;
  padding: 10px;
  background: ${p =>
        p.color === 'green'
            ? "linear-gradient(225deg, #ffffff 95%, #51973f 95%);"
            : p.color === 'yellow'
                ? "linear-gradient(225deg, #ffffff 95%, #b9ae4b 95%);"
                : "linear-gradient(225deg, #ffffff 95%, #cd4d4d 95%);"
    };
  box-shadow: 0 0 5px black;
  border-radius: 5px;
  /* #7a7a80
  #499b65
  #3e539e
  #8a2496
  #978414 */
`

const DescriptionText = styled.p`
  font-size: 14px;
  line-height: 0;
  margin: 0;
`
interface IBlockProps {
    $update: number;
    $isBlocked: boolean;
}

// const PlaceBlock = styled(Section)`
//   overflow-y: auto;
//   height: ${p => 70 + p.$update * 100}px;
  
// `

// const EmeniesBlock = styled(Section)`
//   overflow-y: auto;
//   height: ${p => 100 + p.$update * 100}px;
// `

// const AreasBlock = styled(Section)`
//   overflow-y: auto;
//   height: ${p => 50 + p.$update * 100}px;
// `

export default AreaPage;
