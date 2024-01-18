import { IArea } from "../models/IArea";


export const Locations: IArea[] = [
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
            "id": "garold",
            "levelMin": 1,
            "levelMax": 1,
            "countMin": 1,
            "countMax": 1,
            "spawnChance": 100
          },
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

        ],
        "timeToRespawnAreaItems": 120,
        "timeToRespawnAreaEnemies": 180,
        "lastRespawnAreaItems": "0",
        "lastRespawnAreaEnemies": "0",
        "nextRespawnAreaItems": "0",
        "nextRespawnAreaEnemies": "0"
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
        "enemies": [
          {
            "id": "bandit",
            "levelMin": 1,
            "levelMax": 10,
            "countMin": 1,
            "countMax": 2,
            "spawnChance": 70
          }
        ],
        "currentEnemies": [

        ],
        "timeToRespawnAreaItems": 90,
        "timeToRespawnAreaEnemies": 120,
        "lastRespawnAreaItems": "2023-12-25T23:07:27.462Z",
        "lastRespawnAreaEnemies": "2023-12-25T23:07:27.462Z",
        "nextRespawnAreaItems": "2000-12-25T23:07:27.462Z",
        "nextRespawnAreaEnemies": "2000-12-25T23:07:27.462Z"
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
        "enemies": [
          {
            "id": "bandit",
            "levelMin": 5,
            "levelMax": 20,
            "countMin": 1,
            "countMax": 2,
            "spawnChance": 30
          }
        ],
        "currentEnemies": [

        ],
        "timeToRespawnAreaItems": 110,
        "timeToRespawnAreaEnemies": 135,
        "lastRespawnAreaItems": "2023-12-25T23:07:27.462Z",
        "lastRespawnAreaEnemies": "2023-12-25T23:07:27.462Z",
        "nextRespawnAreaItems": "2000-12-25T23:07:27.462Z",
        "nextRespawnAreaEnemies": "2000-12-25T23:07:27.462Z"
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
        "enemies": [

        ],
        "currentEnemies": [

        ],
        "timeToRespawnAreaItems": 125,
        "timeToRespawnAreaEnemies": 140,
        "lastRespawnAreaItems": "2023-12-25T23:07:27.462Z",
        "lastRespawnAreaEnemies": "2023-12-25T23:07:27.462Z",
        "nextRespawnAreaItems": "2000-12-25T23:07:27.462Z",
        "nextRespawnAreaEnemies": "2000-12-25T23:07:27.462Z"
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
        "enemies": [
          {
            "id": "bandit",
            "levelMin": 10,
            "levelMax": 50,
            "countMin": 1,
            "countMax": 3,
            "spawnChance": 80
          }
        ],
        "currentEnemies": [

        ],
        "timeToRespawnAreaItems": 115,
        "timeToRespawnAreaEnemies": 80,
        "lastRespawnAreaItems": "2023-12-25T23:07:27.462Z",
        "lastRespawnAreaEnemies": "2023-12-25T23:07:27.462Z",
        "nextRespawnAreaItems": "2000-12-25T23:07:27.462Z",
        "nextRespawnAreaEnemies": "2000-12-25T23:07:27.462Z"
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
        "enemies": [

        ],
        "currentEnemies": [

        ],
        "timeToRespawnAreaItems": 100,
        "timeToRespawnAreaEnemies": 120,
        "lastRespawnAreaItems": "2023-12-25T23:07:27.462Z",
        "lastRespawnAreaEnemies": "2023-12-25T23:07:27.462Z",
        "nextRespawnAreaItems": "2000-12-25T23:07:27.462Z",
        "nextRespawnAreaEnemies": "2000-12-25T23:07:27.462Z"
      },
      {
        "id": "central_castle_shopping_street",
        "avatar": "icons/areas/central_castle_shopping_street.png",
        "title": "Торговая улица",
        "color": "green",
        "description": "Торговая улица представляет собой важное и оживленное место, где игроки могут обмениваться товарами с торговцами. Здесь расположены многочисленные палатки, магазины и торговые дома, каждый из которых управляется определенным торговцем.",
        "areaItems": [
         
        ],
        "currentAreaItems": [

        ],
        "enemies": [
          {
            "id": "garold",
            "levelMin": 1,
            "levelMax": 1,
            "countMin": 1,
            "countMax": 1,
            "spawnChance": 100
          },
        ],
        "currentEnemies": [],
        "timeToRespawnAreaItems": 100,
        "timeToRespawnAreaEnemies": 100,
        "lastRespawnAreaItems": "2023-12-25T23:07:27.462Z",
        "lastRespawnAreaEnemies": "2023-12-25T23:07:27.462Z",
        "nextRespawnAreaItems": "2000-12-25T23:07:27.462Z",
        "nextRespawnAreaEnemies": "2000-12-25T23:07:27.462Z"
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
        "enemies": [
          {
            "id": "bandit",
            "levelMin": 5,
            "levelMax": 20,
            "countMin": 1,
            "countMax": 2,
            "spawnChance": 70
          }
        ],
        "currentEnemies": [

        ],
        "timeToRespawnAreaItems": 160,
        "timeToRespawnAreaEnemies": 210,
        "lastRespawnAreaItems": "2023-12-25T23:07:27.462Z",
        "lastRespawnAreaEnemies": "2023-12-25T23:07:27.462Z",
        "nextRespawnAreaItems": "2000-12-25T23:07:27.462Z",
        "nextRespawnAreaEnemies": "2000-12-25T23:07:27.462Z"
      }
]