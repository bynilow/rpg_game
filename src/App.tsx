import { useEffect, useRef, useState } from 'react';
import s from './app.module.css'
import MapCreatorPage from './components/MapCreator/MapCreatorPage';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { getAvailablePaths, goLevel, mineItem, setAreasFromStorage, setLocationToMove, updateAreaItems } from './store/reducers/ActionCreators';
import { IPath, IArea, IAviablePath } from './models/IArea';
import Area from './components/Area/Area';
import styled, { keyframes } from 'styled-components'
import { IAreaFullItem } from './models/IAreaItem';
import AreaItem from './components/Area/AreaItem';
import InventoryModal from './components/Modals/InventoryModal/InventoryModal';


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
        "description": "",
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
        "enemies": [],
        "timeToRespawnAreaItems": 120,
        "timeToRespawnAreaEnemies": 180,
        "lastRespawnAreaItems": "2023-12-25T23:07:27.462Z",
        "lastRespawnAreaEnemies": "2023-12-25T23:07:27.462Z"
      },
      {
        "id": "low_hills",
        "avatar": "icons/areas/low_hills.png",
        "title": "Невысокие холмы",
        "description": "",
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
        "description": "",
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
        "description": "",
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
        "description": "",
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
        "description": "",
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
        "description": "",
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

  const onClickItem = (miningItem: IAreaFullItem) => {
    dispatch(mineItem(miningItem));
  }

  const getNameAreaById = (lvlId: string) => {
    const name = areas.find(p => p.id === lvlId)?.title;
    return name
  }
  console.log(areas)
  const currentLocation = areas[areas.findIndex((i: IArea) => i.id === currentLocationId)];
  console.log(areas[areas.findIndex((i: IArea) => i.id === currentLocationId)])


  const lastRespawnAreaItems = new Date(currentLocation.lastRespawnAreaItems);
  const nextRespawnAreaItems = new Date(
    new Date(lastRespawnAreaItems)
      .setMinutes(lastRespawnAreaItems.getMinutes() + currentLocation?.timeToRespawnAreaItems))

  const lastRespawnAreaEnemies = new Date(currentLocation?.lastRespawnAreaEnemies);
  const [nextRespawnAreaEnemies, setNextRespawnAreaEnemies] = useState(new Date());

  const [isInventoryOpen, setIsInventoryOpen] = useState(false);


  const getAreaFromId = (id: string) => {
    console.log(areas[areas.findIndex(i => i.id === id)]);
    return areas[areas.findIndex(i => i.id === id)];
  }

  const closeInventoryModal = () => {
    setIsInventoryOpen(false);
  }

  useEffect(() => {
    if (areas.length < 2) {
      dispatch(setAreasFromStorage());
    }

    if (currentLocation) dispatch(getAvailablePaths(currentLocation.id));

    if (nextRespawnAreaItems.getTime() < (new Date()).getTime()) {
      dispatch(updateAreaItems({
        levelId: currentLocation.id,
        date: new Date().toISOString(),
        itemsToUpdate: currentLocation.areaItems
      }));
    }



  }, [areas, currentLocation, currentLocationId])

  if (currentLocation) {
    return (
      <>
        <Background image={currentLocation.avatar} />
        <AppBlock>

          <button onClick={() => setIsInventoryOpen(true)}>
            Инвентарь
          </button>
          {
            isInventoryOpen
              ? <InventoryModal closeModal={() => closeInventoryModal()} />
              : null
          }
          <h1>Ты на уровне: {currentLocation.title} / {currentLocation.id}</h1>

          <Menu>

            <AreasBlock update={availablePaths[0].pathId}>
              <h2>Доступные пути:</h2>
              <LevelsList>
                {
                  availablePaths.map((p, ind) => <Area
                    key={p.pathId}
                    index={ind}
                    avatarUrl={getAreaFromId(p.pathId).avatar}
                    title={getNameAreaById(p.pathId) || ''}
                    timeToMove={p.time}
                    goLevel={() => onClickGoLevel(p)} />)
                  // {
                  //   p.pathA !== currentLocation.id ? getNameAreaById(p.pathA) : getNameAreaById(p.pathB)
                  // }
                }
              </LevelsList>
            </AreasBlock>

            <PlaceBlock update={availablePaths[0].pathId}>

              <h2>Местность: </h2>
              <DescriptionText>
                🔄 {currentLocation.timeToRespawnAreaItems}m
              </DescriptionText>
              <DescriptionText>
                ⏪🔄 {lastRespawnAreaItems.toLocaleString()}
              </DescriptionText>
              <DescriptionText>
                ⏩🔄 {nextRespawnAreaItems.toLocaleString()}
              </DescriptionText>

              <LevelsList>
                {/* {
                currentLocation.areaItems.map((i: any) =>
                  <p>{i.id}; min: {i.countMin}; max: {i.countMax};</p>)
              } */}
                {
                  currentLocation.currentAreaItems.map((i: IAreaFullItem, ind) =>
                    <AreaItem
                      key={i.idInArea+currentLocationId}
                      index={ind}
                      item={i}
                      mineItem={() => onClickItem(i)} />)
                }
              </LevelsList>
            </PlaceBlock>

            <EmeniesBlock update={availablePaths[0].pathId}>
              <h2>Монстры: </h2>
              <DescriptionText>
                🔄 {currentLocation.timeToRespawnAreaEnemies}m
              </DescriptionText>
              <DescriptionText>
                ⏪🔄 {lastRespawnAreaEnemies.toLocaleString()}
              </DescriptionText>
              <DescriptionText>
                ⏩🔄 {nextRespawnAreaEnemies.toLocaleString()}
              </DescriptionText>
            </EmeniesBlock>


          </Menu>

          {
            currentAreaToMove.time
          }
        </AppBlock>
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

interface IBackgroundProps {
  image: string;
}

const Background = styled.div<IBackgroundProps>`
  z-index: -1;
  position: fixed;
  top: -80%;
  left: -15%;
  width: 130%;
  height: 250%;
  transition: 5s ease;
  background-image: url(${p => require('./' + p.image)});
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

const AppBlock = styled.div`
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const LevelsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;

  transition: 3s;

`


const DescriptionText = styled.p`
  font-size: 14px;
  line-height: 0.9;
`
interface IBlockProps {
  update: string;
}

const Block = styled.div<IBlockProps>`
  box-shadow: 0 0 5px black;
  border-radius: 5px;
  flex: 1;
  padding: 10px;
  height: min-content;
  max-height: ${p => '500px'};
  background-color: white;
  transition: max-height 5s;
`

const PlaceBlock = styled(Block)`
  
`

const EmeniesBlock = styled(Block)`
  
`

const AreasBlock = styled(Block)`
  
`

const Menu = styled.div`
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: space-around;
  gap: 50px;
  width: 95%;
`


export default App;
