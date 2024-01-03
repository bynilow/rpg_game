import { useEffect, useRef, useState } from 'react';
import s from './app.module.css'
import MapCreatorPage from './components/MapCreator/MapCreatorPage';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { addXP, getAvailablePaths, goLevel, mineItem, setAreasFromStorage, setDeadEnemy, setInventoryFromStorage, setLocationToMove, setPlayerFromStorage, updateAreaItems } from './store/reducers/ActionCreators';
import { IPath, IArea, IAviablePath, IChangeInfo } from './models/IArea';
import Area from './components/Area/Area';
import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { IFullItem } from './models/IAreaItem';
import AreaItem from './components/Area/AreaItem';
import InventoryModal from './components/Modals/InventoryModal/InventoryModal';
import CircleButton from './components/Buttons/CircleButton';
import InfoModal from './components/Modals/InfoModal/InfoModal';
import CombatPage from './components/Combat/CombatPage';
import Container from './components/Container/Container';
import Header from './components/Header/Header';
import { scrollBarX } from './styles/scrollbars';
import AreaEnemy from './components/Area/AreaEnemy';
import { IAreaCurrentEnemy } from './models/IEnemy';


function App() {

  const {
    areas,
    paths,
    currentLocationId,
    availablePaths,
    currentAreaToMove,
    currentAreaItem,
    currentAreaItemMiningTime } = useAppSelector(state => state.userReducer)



  const dispatch = useAppDispatch();

  if (!localStorage.areas) {
    localStorage.areas = JSON.stringify([
      {
        "id": "south_beach",
        "avatar": "icons/areas/south_beach.png",
        "title": "Южный пляж",
        "color": "green",
        "description": "Южный пляж - одна из первых локаций, которую игрок может исследовать в игре. Это выразительный район, расположенный на юге острова и известный своими золотистыми песчаными пляжами и теплыми лазурными водами. Воздух здесь наполнен свежестью и морским бризом, что создает атмосферу безмятежного отдыха.",
        "areaItems": [
          {
            "id": "birch_tree",
            "countMin": 1,
            "countMax": 2
          },
          {
            "id": "iron_ore",
            "countMin": 0,
            "countMax": 1
          }
        ],
        "currentAreaItems": [

        ],
        "enemies": [
          {
            "id": "bandit",
            "levelMin": 1,
            "levelMax": 10,
            "countMin": 1,
            "countMax": 4,
            "spawnChance": 100
          }
        ],
        "currentEnemies": [
          {
            "id": "bandit",
            "idInArea": "bandit_1",
            "level": 1
          },
          {
            "id": "bandit",
            "idInArea": "bandit_2",
            "level": 7
          },
          {
            "id": "bandit",
            "idInArea": "bandit_3",
            "level": 3
          }
        ],
        "timeToRespawnAreaItems": 120,
        "timeToRespawnAreaEnemies": 180,
        "lastRespawnAreaItems": "2023-12-25T23:07:27.462Z",
        "lastRespawnAreaEnemies": "2023-12-25T23:07:27.462Z"
      },
      {
        "id": "low_hills",
        "avatar": "icons/areas/low_hills.png",
        "title": "Невысокие холмы",
        "color": "green",
        "description": "Невысокие холмы - затерянная в глубине цветущего мира. Это место, где чарующая красота природы соседствует с таинственным волшебством, заставляющим сердца путников замирать от изумления.",
        "areaItems": [
          {
            "id": "birch_tree",
            "countMin": 1,
            "countMax": 2
          },
          {
            "id": "oak_tree",
            "countMin": 0,
            "countMax": 2
          },
          {
            "id": "iron_ore",
            "countMin": 1,
            "countMax": 1
          }
        ],
        "currentAreaItems": [

        ],
        "enemies": [],
        "timeToRespawnAreaItems": 90,
        "timeToRespawnAreaEnemies": 120,
        "lastRespawnAreaItems": "2023-12-25T23:07:27.462Z",
        "lastRespawnAreaEnemies": "2023-12-25T23:07:27.462Z"
      },
      {
        "id": "sharp_mountains",
        "avatar": "icons/areas/sharp_mountains.png",
        "title": "Острогорье",
        "color": "red",
        "description": "Острогорье - бурлящая опасностями локация в мире. Эта зыбучая земля, окруженная штормовыми облаками, возвышается на вершине свирепых горных пиков. Ветер в Острогорье с силой зовет каждого путника, готового принять вызов суровости этого места.",
        "areaItems": [
          {
            "id": "oak_tree",
            "countMin": 1,
            "countMax": 2
          },
          {
            "id": "iron_ore",
            "countMin": 1,
            "countMax": 2
          },
          {
            "id": "titanium_ore",
            "countMin": 0,
            "countMax": 2
          },
          {
            "id": "platinum_ore",
            "countMin": 0,
            "countMax": 2
          },
          {
            "id": "adamantite_ore",
            "countMin": 0,
            "countMax": 2
          }
        ],
        "currentAreaItems": [

        ],
        "enemies": [],
        "timeToRespawnAreaItems": 110,
        "timeToRespawnAreaEnemies": 135,
        "lastRespawnAreaItems": "2023-12-25T23:07:27.462Z",
        "lastRespawnAreaEnemies": "2023-12-25T23:07:27.462Z"
      },
      {
        "id": "fish_ponds",
        "avatar": "icons/areas/fish_ponds.png",
        "title": "Рыбные пруды",
        "color": "yellow",
        "description": "Рыбные пруды - уединенный район, вдали от всякой суеты. Просторные пруды, окруженные густыми зелеными деревьями и цветущими полевыми цветами, создают атмосферу спокойствия и умиротворения.",
        "areaItems": [
          {
            "id": "oak_tree",
            "countMin": 0,
            "countMax": 1
          },
          {
            "id": "willow_tree",
            "countMin": 1,
            "countMax": 2
          },
          {
            "id": "tungsten_ore",
            "countMin": 0,
            "countMax": 2
          }
        ],
        "currentAreaItems": [

        ],
        "enemies": [],
        "timeToRespawnAreaItems": 125,
        "timeToRespawnAreaEnemies": 140,
        "lastRespawnAreaItems": "2023-12-25T23:07:27.462Z",
        "lastRespawnAreaEnemies": "2023-12-25T23:07:27.462Z"
      },
      {
        "id": "forgotten_road",
        "avatar": "icons/areas/forgotten_road.png",
        "title": "Забытая тропа",
        "color": "red",
        "description": "Путь проходит через густой покров мха и лишайников, который под ногами приятно пружинит. Забытая тропа поражает разнообразием растительности - яркие цветы, дикие орхидеи, пышные папоротники и высокие деревья, покрытые изящными лианами. Воздух наполнен сладким ароматом цветов и свежести леса.",
        "areaItems": [
          {
            "id": "willow_tree",
            "countMin": 1,
            "countMax": 2
          },
          {
            "id": "cedar_tree",
            "countMin": 1,
            "countMax": 1
          },
          {
            "id": "teak_tree",
            "countMin": 0,
            "countMax": 1
          },
          {
            "id": "iron_ore",
            "countMin": 1,
            "countMax": 2
          },
          {
            "id": "tungsten_ore",
            "countMin": 0,
            "countMax": 1
          }
        ],
        "currentAreaItems": [

        ],
        "enemies": [],
        "timeToRespawnAreaItems": 115,
        "timeToRespawnAreaEnemies": 80,
        "lastRespawnAreaItems": "2023-12-25T23:07:27.462Z",
        "lastRespawnAreaEnemies": "2023-12-25T23:07:27.462Z"
      },
      {
        "id": "central_castle",
        "avatar": "icons/areas/central_castle.png",
        "title": "Центральный замок",
        "color": "green",
        "description": "Центральный замок - величественный и впечатляющий сооружение, расположенное на холме в центре живописного ландшафта. Эта историческая локация представляет собой идеальное сочетание архитектурного великолепия и старинной культуры.",
        "areaItems": [
          {
            "id": "birch_tree",
            "countMin": 1,
            "countMax": 3
          },
          {
            "id": "oak_tree",
            "countMin": 0,
            "countMax": 2
          }
        ],
        "currentAreaItems": [

        ],
        "enemies": [],
        "timeToRespawnAreaItems": 100,
        "timeToRespawnAreaEnemies": 120,
        "lastRespawnAreaItems": "2023-12-25T23:07:27.462Z",
        "lastRespawnAreaEnemies": "2023-12-25T23:07:27.462Z"
      },
      {
        "id": "bloody_forest",
        "avatar": "icons/areas/bloody_forest.png",
        "title": "Кровавые леса",
        "color": "red",
        "description": "Кровавые леса – мрачное и таинственное место, где сплетаются легенды о жутких событиях и загадочных историях. Эта локация представляет собой плотный лес, покрытый густыми, темными и кроваво-красными листвой деревьями, которые создают зловещую картину.",
        "areaItems": [
          {
            "id": "willow_tree",
            "countMin": 0,
            "countMax": 3
          },
          {
            "id": "cedar_tree",
            "countMin": 1,
            "countMax": 2
          },
          {
            "id": "teak_tree",
            "countMin": 0,
            "countMax": 2
          },
          {
            "id": "tungsten_ore",
            "countMin": 0,
            "countMax": 1
          },
          {
            "id": "platinum_ore",
            "countMin": 0,
            "countMax": 1
          }

        ],
        "currentAreaItems": [

        ],
        "enemies": [],
        "timeToRespawnAreaItems": 160,
        "timeToRespawnAreaEnemies": 210,
        "lastRespawnAreaItems": "2023-12-25T23:07:27.462Z",
        "lastRespawnAreaEnemies": "2023-12-25T23:07:27.462Z"
      }
    ])
  }

  const onClickGoLevel = (selectedPath: IAviablePath) => {
    dispatch(goLevel(selectedPath.pathId));

  }

  const onClickItem = (miningItem: IFullItem) => {
    dispatch(mineItem({...miningItem, count: 1}));
    dispatch(addXP(miningItem.baseCountXP));
  }

  const getNameAreaById = (lvlId: string) => {
    const name = areas.find(p => p.id === lvlId)?.title;
    return name
  }
  const currentLocation = areas[areas.findIndex((i: IArea) => i.id === currentLocationId)];


  const lastRespawnAreaItems = new Date(currentLocation.lastRespawnAreaItems);
  const nextRespawnAreaItems = new Date(
    new Date(lastRespawnAreaItems)
      .setMinutes(lastRespawnAreaItems.getMinutes() + currentLocation?.timeToRespawnAreaItems))

  const lastRespawnAreaEnemies = new Date(currentLocation?.lastRespawnAreaEnemies);
  const [nextRespawnAreaEnemies, setNextRespawnAreaEnemies] = useState(new Date());

  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [infoArea, setInfoArea] = useState(currentLocation);
  const [whatInfo, setWhatInfo] = useState('area');
  const [infoItemId, setInfoItemId] = useState('');
  const [infoEnemyId, setInfoEnemyId] = useState('');


  const [miningItemId, setMiningItemId] = useState<string>('');
  const [moveAreaId, setMoveAreaId] = useState<string>('');
  // const [isMaking, setIsMakingSomething] = useState<boolean>(false);


  const getAreaFromId = (id: string) => {
    return areas[areas.findIndex(i => i.id === id)];
  }

  const closeInventoryModal = () => {
    setIsInventoryOpen(false);
  }

  const onChangeInfo = ({ area, itemId, enemyId, whatInfo }: IChangeInfo) => {
    if (whatInfo === 'area' && area) {
      setInfoArea(area);
    }
    else if (whatInfo === 'item' && itemId) {
      setInfoItemId(itemId);
    }
    else if (whatInfo === 'enemy' && enemyId){
      setInfoEnemyId(enemyId);
    }
    setWhatInfo(whatInfo);
  }

  const onClickCloseModalInfo = () => {
    setIsInfoOpen(false);
    setInfoArea(currentLocation);
    setInfoItemId('');
    setInfoEnemyId('');
    setWhatInfo('area');
  }

  useEffect(() => {
    if (areas.length < 2) {
      dispatch(setAreasFromStorage());
    }

    if (currentLocation) {
      dispatch(getAvailablePaths(currentLocation.id));
      dispatch(setInventoryFromStorage());
      dispatch(setPlayerFromStorage());
    }

    if (nextRespawnAreaItems.getTime() < (new Date()).getTime()) {
      dispatch(updateAreaItems({
        levelId: currentLocation.id,
        date: new Date().toISOString(),
        itemsToUpdate: currentLocation.areaItems
      }));
    }
  }, [areas, currentLocation, currentLocationId])

  const [isBattle, setIsBattle] = useState(false);
  const [battleEnemy, setBattleEnemy] = useState<IAreaCurrentEnemy | null>();
  
  const onClickStartBattle = ({...enemy}:IAreaCurrentEnemy) => {
    setBattleEnemy(enemy);
    setIsBattle(true);
  }

  const onFinishBattle = (isWin: boolean) => {
    setBattleEnemy(null);
    setIsBattle(false);
  }

  if (isBattle) {
    return (
      <CombatPage 
        $currentLocationId={currentLocationId}
        $enemyId={battleEnemy!.id} 
        $enemyIdInArea={battleEnemy!.idInArea}
        $level={battleEnemy!.level} 
        $finishBattle={(isWin: boolean) => onFinishBattle(isWin)} />
    )
  }

  if (currentLocation.title) {
    return (
      <>
        <GlobalStyle />
        <Background $image={require('./' + currentLocation.avatar)} />
        <Application>
          <Header openInventory={() => setIsInventoryOpen(true)} />
          {
            isInventoryOpen
              ? <InventoryModal closeModal={() => closeInventoryModal()} />
              : null
          }
          {
            isInfoOpen
              ? <InfoModal
                  area={infoArea}
                  itemId={infoItemId}
                  enemyId={infoEnemyId}
                  closeModal={() => onClickCloseModalInfo()}
                  whatInfo={whatInfo}
                  changeWhatInfo={(info: IChangeInfo) => onChangeInfo(info)} />
              : null
          }

              <ContainerInner>
                <LevelName color={currentLocation.color}>
                  Ты на уровне: {currentLocation.title} / {currentLocation.id}
                  <CircleButton symbol='?' click={() => setIsInfoOpen(true)} />

                </LevelName>

                <AreaActionMenu>
                  <AreasBlock
                    $update={availablePaths.length}
                    $isBlocked={miningItemId !== ''}>
                    <NameBlock>Доступные пути:</NameBlock>
                    <LevelsList>
                      {
                        availablePaths.map((p, ind) => <Area
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
                  </AreasBlock>

                  <PlaceBlock
                    $update={currentLocation.currentAreaItems.length}
                    $isBlocked={moveAreaId !== ''}>
                    <NameBlock>Местность: </NameBlock>
                    <DescriptionText>
                      ⟳ {nextRespawnAreaItems.toLocaleString()}
                    </DescriptionText>

                    <LevelsList>
                      {
                        currentLocation.currentAreaItems.map((i: IFullItem, ind) =>
                          <AreaItem
                            key={i.idInArea + currentLocationId}
                            index={ind}
                            setIsMiningId={() => setMiningItemId(i.idInArea)}
                            clearIsMiningId={() => setMiningItemId('')}
                            miningId={miningItemId}
                            item={i}
                            mineItem={() => onClickItem(i)} />)
                      }
                    </LevelsList>
                  </PlaceBlock>

                  <EmeniesBlock
                    $update={currentLocation.currentEnemies ? currentLocation.currentEnemies.length : 0}
                    $isBlocked={miningItemId !== '' || moveAreaId !== ''}>
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
                            $onClickStartBattle={() => onClickStartBattle(e)}
                            $index={ind}
                            $level={e.level} />)
                          : null
                      }
                    </LevelsList>
                  </EmeniesBlock>


                </AreaActionMenu>
              </ContainerInner>
        </Application>
      </>

      // <div>
      //   <MapCreatorPage />
      // </div>
    );
  }
  else {
    return (
      <div>
        Loading...
      </div>)
  }

}

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
  }
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`

const Application = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`


const ContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 90%;
  height: 75%;
  box-sizing: border-box;
`


const Block = styled.div<IBlockProps>`
  max-height: 100%;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  gap: 20px;
  box-shadow: 0 0 5px black;
  border-radius: 5px;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  background-color: white;
  transition: 3s;
  
  ${p => p.$isBlocked
    ? `&::before{
        position: absolute;
        z-index: 99;
        border-radius: 5px;
        top: 0;
        bottom: 0;
        left: 0;
        content: '';
        width: 100%;
        height: ${100 + p.$update * 100}px;
        background: #00000071;
      };`
    : null
  }

  ${
    scrollBarX
  }  
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

const DescriptionText = styled.p`
  font-size: 14px;
  line-height: 0;
  margin: 0;
`
interface IBlockProps {
  $update: number;
  $isBlocked: boolean;
}

const PlaceBlock = styled(Block)`
  overflow-y: scroll;
  height: ${p => 70 + p.$update * 100}px;
  
`

const EmeniesBlock = styled(Block)`
  overflow-y: hidden;
  height: ${p => 100 + p.$update * 100}px;
`

const AreasBlock = styled(Block)`
  overflow-y: hidden;
  height: ${p => 50 + p.$update * 100}px;
`

export default App;
