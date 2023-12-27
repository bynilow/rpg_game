import { useEffect, useState } from 'react';
import s from './app.module.css'
import MapCreatorPage from './components/MapCreator/MapCreatorPage';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { decrementTimeToMove, getAvailablePaths, goLevel, mineItem, setAreasFromStorage, setItemToMine, setLocationToMove, updateAreaItems } from './store/reducers/ActionCreators';
import { IAPath, IArea } from './models/IArea';
import Area from './components/Area/Area';
import styled from 'styled-components'
import { IAreaFullItem } from './models/IAreaItem';
import AreaItem from './components/Area/AreaItem';


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

  const onClickGoLevel = (selectedPath: IAPath) => {
    const pathDestination =
      selectedPath.pathA !== currentLocationId
        ? selectedPath.pathA
        : selectedPath.pathB

    dispatch(setLocationToMove({
      time: selectedPath.time,
      locationId: pathDestination,
      currentTimeToMove: selectedPath.time
    }));

  }

  const onClickItem = (miningItem: IAreaFullItem) => {
    dispatch(setItemToMine(miningItem));
  }

  const getNameAreaById = (lvlId: string) => {
    const name = areas.find(p => p.id === lvlId)?.title;
    return name
  }
  
  const currentLocation = areas[areas.findIndex((i:IArea) => i.id === currentLocationId)];
  console.log(currentLocation)

  const lastRespawnAreaItems = new Date(currentLocation.lastRespawnAreaItems);
  let nextRespawnAreaItems = new Date(currentLocation.lastRespawnAreaItems);
  nextRespawnAreaItems = new Date(nextRespawnAreaItems
    .setMinutes(lastRespawnAreaItems.getMinutes() + currentLocation.timeToRespawnAreaItems));
    
  const lastRespawnAreaEnemies = new Date(currentLocation.lastRespawnAreaEnemies);
  let nextRespawnAreaEnemies = new Date(currentLocation.lastRespawnAreaEnemies);
  nextRespawnAreaEnemies = new Date(nextRespawnAreaEnemies
    .setMinutes(lastRespawnAreaEnemies.getMinutes() + currentLocation.timeToRespawnAreaEnemies));

  
  useEffect(() => {
    console.log(areas)
    if(areas.length < 2){
      dispatch(setAreasFromStorage());
    }
    dispatch(getAvailablePaths(currentLocation.id));
    if (nextRespawnAreaItems.getTime() < (new Date()).getTime()) {
      dispatch(updateAreaItems({
        levelId: currentLocation.id,
        date: new Date().toISOString(),
        itemsToUpdate: currentLocation.areaItems
      }));
    }
    //1703704295890 1703697095920

      if(!(localStorage.areas)){
        localStorage.areas = JSON.stringify([
          {
            "id": "south_beach",
            "avatar": "",
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
            "avatar": "",
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
            "avatar": "",
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
            "avatar": "",
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
            "avatar": "",
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
            "avatar": "",
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
            "avatar": "",
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
    
    console.log(JSON.parse(localStorage.areas))
  }, [areas])




  return (
    <AppBlock>
      <h1>Ты на уровне: {currentLocation.title} / {currentLocation.id}</h1>

      <Menu>

        <AreasBlock>
          <h2>Доступные пути:</h2>
          <LevelsList>
            {
              availablePaths.map(p => <Area
                key={p.pathA !== currentLocation.id ? p.pathA : p.pathB}
                name={(p.pathA !== currentLocation.id ? getNameAreaById(p.pathA) : getNameAreaById(p.pathB)) || ''}
                time={p.time}
                currentTime={currentAreaToMove.currentTimeToMove}
                selectedLevelId={currentAreaToMove.locationId}
                levelId={(p.pathA !== currentLocation.id ? p.pathA : p.pathB) || ''}
                onClicked={() => onClickGoLevel(p)} />)
              // {
              //   p.pathA !== currentLocation.id ? getNameAreaById(p.pathA) : getNameAreaById(p.pathB)
              // }
            }
          </LevelsList>
        </AreasBlock>

        <PlaceBlock>

          <h2>Местность: </h2>
          <DescriptionText>
            Обновление каждые {currentLocation.timeToRespawnAreaItems}m
          </DescriptionText>
          <DescriptionText>
            В последний раз местность обновлена: {lastRespawnAreaItems.toString()}
          </DescriptionText>
          <DescriptionText>
            Следующее обновление местности: {nextRespawnAreaItems.toString()}
          </DescriptionText>

          <LevelsList>
            {
              currentLocation.areaItems.map((i: any) =>
                <p>{i.id}; min: {i.countMin}; max: {i.countMax};</p>)
            }
            {
              currentLocation.currentAreaItems.map((i: IAreaFullItem) =>
                <AreaItem
                  key={i.idInArea}
                  item={i}
                  currentTimeToMine={currentAreaItemMiningTime}
                  onClicked={() => onClickItem(i)} />)
            }
          </LevelsList>
        </PlaceBlock>

        <EmeniesBlock>
          <h2>Монстры: </h2>
          <DescriptionText>
            Обновление каждые {currentLocation.timeToRespawnAreaEnemies}m
          </DescriptionText>
          <DescriptionText>
            В последний раз монстры обновлены: {lastRespawnAreaEnemies.toString()}
          </DescriptionText>
          <DescriptionText>
            Следующее обновление монстров: {nextRespawnAreaEnemies.toString()}
          </DescriptionText>
        </EmeniesBlock>


      </Menu>

      {
        currentAreaToMove.time
      }
    </AppBlock>
    // <div>
    //   <MapCreatorPage />
    // </div>
  );
}

const AppBlock = styled.div`
  width: 100vw;
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

`


const DescriptionText = styled.p`
    font-size: 14px;
    line-height: 0.9;
`

const Block = styled.div`
  box-shadow: 0 0 5px black;
  border-radius: 5px;
  flex: 1;
  padding: 10px;
`

const PlaceBlock = styled(Block)`
  
`

const EmeniesBlock = styled(Block)`
  
`

const AreasBlock = styled(Block)`
  
`

const Menu = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  gap: 50px;
  width: 95%;
`


export default App;
