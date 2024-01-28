import { IArea } from "../models/IArea";


export const Locations: IArea[] = [
  {
    "id": "south_beach",
    "avatar": "icons/areas/south_beach.png",
    "title": "Южный пляж",
    "stateId": "",
    "color": "green",
    "description": "Южный пляж - выразительный район, расположенный на юге острова и известный своими золотистыми песчаными пляжами и теплыми лазурными водами. Воздух здесь наполнен свежестью и морским бризом, что создает атмосферу безмятежного отдыха.",
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
        "countMax": 2,
        "spawnChance": 30
      },
      {
        "id": "crab",
        "levelMin": 3,
        "levelMax": 15,
        "countMin": 1,
        "countMax": 5,
        "spawnChance": 90
      },
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
    "stateId": "",
    "color": "yellow",
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
        "countMax": 4
      },
      {
        "id": "tungsten_ore",
        "countMin": 2,
        "countMax": 4
      },
      {
        "id": "platinum_ore",
        "countMin": 0,
        "countMax": 3
      },
      {
        "id": "titanium_ore",
        "countMin": 0,
        "countMax": 2
      },
    ],
    "currentAreaItems": [

    ],
    "enemies": [
      {
        "id": "goblin",
        "levelMin": 15,
        "levelMax": 30,
        "countMin": 1,
        "countMax": 3,
        "spawnChance": 40
      },
      {
        "id": "wolf",
        "levelMin": 15,
        "levelMax": 30,
        "countMin": 1,
        "countMax": 2,
        "spawnChance": 65
      }
    ],
    "currentEnemies": [

    ],
    "timeToRespawnAreaItems": 90,
    "timeToRespawnAreaEnemies": 120,
    "lastRespawnAreaItems": "0",
    "lastRespawnAreaEnemies": "0",
    "nextRespawnAreaItems": "0",
    "nextRespawnAreaEnemies": "0"
  },
  {
    "id": "sharp_mountains",
    "avatar": "icons/areas/sharp_mountains.png",
    "title": "Острогорье",
    "stateId": "",
    "color": "red",
    "description": "Острогорье - бурлящая опасностями локация в мире. Эта зыбучая земля, окруженная штормовыми облаками, возвышается на вершине свирепых горных пиков. Ветер в Острогорье с силой зовет каждого путника, готового принять вызов суровости этого места.",
    "areaItems": [
      {
        "id": "oak_tree",
        "countMin": 0,
        "countMax": 1
      },
      {
        "id": "iron_ore",
        "countMin": 0,
        "countMax": 2
      },
      {
        "id": "tungsten_ore",
        "countMin": 3,
        "countMax": 5
      },
      {
        "id": "platinum_ore",
        "countMin": 1,
        "countMax": 3
      },
      {
        "id": "titanium_ore",
        "countMin": 2,
        "countMax": 4
      },
      {
        "id": "adamantite_ore",
        "countMin": 1,
        "countMax": 2
      }

    ],
    "currentAreaItems": [

    ],
    "enemies": [
      {
        "id": "goblin",
        "levelMin": 25,
        "levelMax": 70,
        "countMin": 2,
        "countMax": 4,
        "spawnChance": 70
      },
      {
        "id": "wolf",
        "levelMin": 25,
        "levelMax": 70,
        "countMin": 1,
        "countMax": 2,
        "spawnChance": 45
      }
    ],
    "currentEnemies": [

    ],
    "timeToRespawnAreaItems": 110,
    "timeToRespawnAreaEnemies": 135,
    "lastRespawnAreaItems": "0",
    "lastRespawnAreaEnemies": "0",
    "nextRespawnAreaItems": "0",
    "nextRespawnAreaEnemies": "0"
  },
  {
    "id": "fish_ponds",
    "avatar": "icons/areas/fish_ponds.png",
    "title": "Рыбные пруды",
    "stateId": "",
    "color": "yellow",
    "description": "Рыбные пруды - уединенный район, вдали от всякой суеты. Просторные пруды, окруженные густыми зелеными деревьями и цветущими полевыми цветами, создают атмосферу спокойствия и умиротворения.",
    "areaItems": [
      {
        "id": "birch_tree",
        "countMin": 1,
        "countMax": 3
      },
      {
        "id": "oak_tree",
        "countMin": 1,
        "countMax": 3
      },
      {
        "id": "willow_tree",
        "countMin": 1,
        "countMax": 2
      },
      {
        "id": "cedar_tree",
        "countMin": 0,
        "countMax": 2
      },
      {
        "id": "iron_ore",
        "countMin": 0,
        "countMax": 1
      }
    ],
    "currentAreaItems": [],
    "enemies": [

    ],
    "currentEnemies": [],
    "timeToRespawnAreaItems": 125,
    "timeToRespawnAreaEnemies": 140,
    "lastRespawnAreaItems": "0",
    "lastRespawnAreaEnemies": "0",
    "nextRespawnAreaItems": "0",
    "nextRespawnAreaEnemies": "0"
  },
  {
    "id": "forgotten_road",
    "avatar": "icons/areas/forgotten_road.png",
    "title": "Забытая тропа",
    "stateId": "",
    "color": "yellow",
    "description": "Путь проходит через густой покров мха и лишайников, который под ногами приятно пружинит. Забытая тропа поражает разнообразием растительности - яркие цветы, дикие орхидеи, пышные папоротники и высокие деревья, покрытые изящными лианами. Воздух наполнен сладким ароматом цветов и свежести леса.",
    "areaItems": [
      {
        "id": "birch_tree",
        "countMin": 0,
        "countMax": 3
      },
      {
        "id": "oak_tree",
        "countMin": 0,
        "countMax": 3
      },
      {
        "id": "willow_tree",
        "countMin": 0,
        "countMax": 1
      }
    ],
    "currentAreaItems": [

    ],
    "enemies": [
      {
        "id": "bandit",
        "levelMin": 15,
        "levelMax": 35,
        "countMin": 2,
        "countMax": 4,
        "spawnChance": 75
      },
      {
        "id": "wolf",
        "levelMin": 15,
        "levelMax": 35,
        "countMin": 1,
        "countMax": 4,
        "spawnChance": 55
      }
    ],
    "currentEnemies": [

    ],
    "timeToRespawnAreaItems": 115,
    "timeToRespawnAreaEnemies": 80,
    "lastRespawnAreaItems": "0",
    "lastRespawnAreaEnemies": "0",
    "nextRespawnAreaItems": "0",
    "nextRespawnAreaEnemies": "0"
  },
  {
    "id": "city_brehu",
    "avatar": "icons/areas/city_brehu.png",
    "title": "Город \"Бреху\"",
    "stateId": "",
    "color": "green",
    "description": "Если вы ищете спокойный и уютный город для отдыха, то \"Бреху\" - отличный выбор. Здесь вы сможете насладиться красивыми пейзажами, познакомиться с историей города и насладиться гостеприимством местных жителей.",
    "areaItems": [
      {
        "id": "oak_tree",
        "countMin": 1,
        "countMax": 3
      }
    ],
    "currentAreaItems": [],
    "enemies": [],
    "currentEnemies": [],
    "timeToRespawnAreaItems": 100,
    "timeToRespawnAreaEnemies": 120,
    "lastRespawnAreaItems": "0",
    "lastRespawnAreaEnemies": "0",
    "nextRespawnAreaItems": "0",
    "nextRespawnAreaEnemies": "0"
  },
  {
    "id": "city_brehu_shopping_street",
    "avatar": "icons/areas/city_brehu_shopping_street.png",
    "title": "Торговая улица",
    "stateId": "",
    "color": "green",
    "description": "Торговая улица представляет собой важное и оживленное место, где игроки могут обмениваться товарами с торговцами. Здесь расположены многочисленные палатки, магазины и торговые дома, каждый из которых управляется определенным торговцем.",
    "areaItems": [],
    "currentAreaItems": [],
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
    "lastRespawnAreaItems": "0",
    "lastRespawnAreaEnemies": "0",
    "nextRespawnAreaItems": "0",
    "nextRespawnAreaEnemies": "0"
  },
  {
    "id": "bloody_forest",
    "avatar": "icons/areas/bloody_forest.png",
    "title": "Кровавые леса",
    "stateId": "",
    "color": "red",
    "description": "Кровавые леса – мрачное и таинственное место, где сплетаются легенды о жутких событиях и загадочных историях. Эта локация представляет собой плотный лес, покрытый густыми, темными и кроваво-красными листвой деревьями, которые создают зловещую картину.",
    "areaItems": [
      {
        "id": "birch_tree",
        "countMin": 2,
        "countMax": 7
      },
      {
        "id": "oak_tree",
        "countMin": 2,
        "countMax": 5
      },
      {
        "id": "willow_tree",
        "countMin": 1,
        "countMax": 5
      },
      {
        "id": "cedar_tree",
        "countMin": 1,
        "countMax": 3
      },
      {
        "id": "teak_tree",
        "countMin": 0,
        "countMax": 2
      },
    ],
    "currentAreaItems": [],
    "enemies": [
      {
        "id": "bear",
        "countMin": 1,
        "countMax": 3,
        "levelMin": 35,
        "levelMax": 75,
        "spawnChance": 95
      },
      {
        "id": "wolf",
        "countMin": 1,
        "countMax": 3,
        "levelMin": 35,
        "levelMax": 75,
        "spawnChance": 80
      },
      {
        "id": "bandit",
        "countMin": 1,
        "countMax": 3,
        "levelMin": 35,
        "levelMax": 75,
        "spawnChance": 15
      }
    ],
    "currentEnemies": [

    ],
    "timeToRespawnAreaItems": 160,
    "timeToRespawnAreaEnemies": 210,
    "lastRespawnAreaItems": "0",
    "lastRespawnAreaEnemies": "0",
    "nextRespawnAreaItems": "0",
    "nextRespawnAreaEnemies": "0"
  },
  {
    "id": "rare_forest",
    "title": "Редкие леса",
    "color": "green",
    "avatar": "icons/areas/rare_forest.png",
    "description": "Уникальное место, где деревья растут на большом расстоянии друг от друга. Эти леса отличаются от обычных тем, что здесь можно увидеть все стадии роста деревьев: от молодых саженцев до старых гигантов.",
    "areaItems": [
      {
        "id": "birch_tree",
        "countMin": 1,
        "countMax": 4
      },
      {
        "id": "oak_tree",
        "countMin": 1,
        "countMax": 3
      }
    ],
    "stateId": "",
    "enemies": [
      {
        "id": "sheep",
        "countMin": 1,
        "countMax": 3,
        "levelMin": 1,
        "levelMax": 10,
        "spawnChance": 65
      },
      {
        "id": "chicken",
        "countMin": 1,
        "countMax": 3,
        "levelMin": 1,
        "levelMax": 10,
        "spawnChance": 55
      }
    ],
    "currentAreaItems": [],
    "currentEnemies": [],
    "timeToRespawnAreaItems": 80,
    "timeToRespawnAreaEnemies": 120,
    "nextRespawnAreaItems": "0",
    "nextRespawnAreaEnemies": "0",
    "lastRespawnAreaItems": "0",
    "lastRespawnAreaEnemies": "0"
  },
  {
    "id": "quiet_coastal_meadow",
    "title": "Тихий прибрежный луг",
    "color": "yellow",
    "avatar": "icons/areas/quiet_coastal_meadow.png",
    "description": "Здесь можно услышать пение птиц, а также увидеть различных животных. В реке водятся рыбы и другие водные обитатели.",
    "areaItems": [
      {
        "id": "birch_tree",
        "countMin": 0,
        "countMax": 2
      }
    ],
    "stateId": "",
    "enemies": [
      {
        "id": "sheep",
        "countMin": 0,
        "countMax": 2,
        "levelMin": 10,
        "levelMax": 30,
        "spawnChance": 100
      },
      {
        "id": "chicken",
        "countMin": 0,
        "countMax": 2,
        "levelMin": 10,
        "levelMax": 30,
        "spawnChance": 100
      },
      {
        "id": "wolf",
        "countMin": 0,
        "countMax": 2,
        "levelMin": 10,
        "levelMax": 30,
        "spawnChance": 30
      }
    ],
    "currentAreaItems": [],
    "currentEnemies": [],
    "timeToRespawnAreaItems": 120,
    "timeToRespawnAreaEnemies": 60,
    "nextRespawnAreaItems": "0",
    "nextRespawnAreaEnemies": "0",
    "lastRespawnAreaItems": "0",
    "lastRespawnAreaEnemies": "0"
  },
  {
    "id": "sheep_hills",
    "title": "Овечьи холмы",
    "color": "green",
    "avatar": "icons/areas/sheep_hills.png",
    "description": "Это место, где обитает множество овец. Они живут на зеленых холмах, которые покрыты травой и цветами. Овцы очень любят гулять по этим холмам, потому что там есть много травы, которую они могут есть.",
    "areaItems": [
      {
        "id": "birch_tree",
        "countMin": 1,
        "countMax": 2
      },
      {
        "id": "iron_ore",
        "countMin": 2,
        "countMax": 5
      },
      {
        "id": "tungsten_ore",
        "countMin": 1,
        "countMax": 4
      }
    ],
    "stateId": "",
    "enemies": [
      {
        "id": "sheep",
        "countMin": 1,
        "countMax": 4,
        "levelMin": 5,
        "levelMax": 20,
        "spawnChance": 100
      },
      {
        "id": "goblin",
        "countMin": 1,
        "countMax": 4,
        "levelMin": 5,
        "levelMax": 20,
        "spawnChance": 20
      },
      {
        "id": "wolf",
        "countMin": 1,
        "countMax": 4,
        "levelMin": 5,
        "levelMax": 20,
        "spawnChance": 15
      }
    ],
    "currentAreaItems": [],
    "currentEnemies": [],
    "timeToRespawnAreaItems": 80,
    "timeToRespawnAreaEnemies": 80,
    "nextRespawnAreaItems": "0",
    "nextRespawnAreaEnemies": "0",
    "lastRespawnAreaItems": "0",
    "lastRespawnAreaEnemies": "0"
  },
  {
    "id": "low_mountain",
    "title": "Коренастая гора",
    "color": "yellow",
    "avatar": "icons/areas/low_mountain.png",
    "description": "Низкая гора, которая имеет очень крутой склон. Она находится в горах, которые расположены недалеко от города. Гора имеет очень необычную форму, которая напоминает фигуру человека.",
    "areaItems": [
      {
        "id": "iron_ore",
        "countMin": 1,
        "countMax": 5
      },
      {
        "id": "tungsten_ore",
        "countMin": 2,
        "countMax": 4
      },
      {
        "id": "platinum_ore",
        "countMin": 2,
        "countMax": 3
      }
    ],
    "stateId": "",
    "enemies": [
      {
        "id": "goblin",
        "countMin": 2,
        "countMax": 3,
        "levelMin": 12,
        "levelMax": 40,
        "spawnChance": 85
      },
      {
        "id": "bear",
        "countMin": 2,
        "countMax": 3,
        "levelMin": 12,
        "levelMax": 40,
        "spawnChance": 35
      }
    ],
    "currentAreaItems": [],
    "currentEnemies": [],
    "timeToRespawnAreaItems": 60,
    "timeToRespawnAreaEnemies": 100,
    "nextRespawnAreaItems": "0",
    "nextRespawnAreaEnemies": "0",
    "lastRespawnAreaItems": "0",
    "lastRespawnAreaEnemies": "0"
  },
  {
    "id": "crossroad",
    "title": "Перворожденное распутье",
    "color": "green",
    "avatar": "icons/areas/crossroad.png",
    "description": "На Перворожденном распутье встречаются люди из разных уголков мира. Здесь они могут поделиться своими историями, традициями и обычаями. Это место служит символом единства и многообразия нашего мира.",
    "areaItems": [
      {
        "id": "birch_tree",
        "countMin": 1,
        "countMax": 3
      },
      {
        "id": "oak_tree",
        "countMin": 0,
        "countMax": 3
      }
    ],
    "stateId": "",
    "enemies": [
      {
        "id": "bandit",
        "countMin": 0,
        "countMax": 3,
        "levelMin": 5,
        "levelMax": 20,
        "spawnChance": 85
      },
      {
        "id": "wolf",
        "countMin": 0,
        "countMax": 3,
        "levelMin": 5,
        "levelMax": 20,
        "spawnChance": 40
      }
    ],
    "currentAreaItems": [],
    "currentEnemies": [],
    "timeToRespawnAreaItems": 80,
    "timeToRespawnAreaEnemies": 120,
    "nextRespawnAreaItems": "0",
    "nextRespawnAreaEnemies": "0",
    "lastRespawnAreaItems": "0",
    "lastRespawnAreaEnemies": "0"
  },
  {
    "id": "rustling_forest",
    "title": "Шуршащий лес",
    "color": "yellow",
    "avatar": "icons/areas/rustling_forest.png",
    "description": "Шуршащий лес - это загадочное место, где обитают множество разных животных. Здесь можно услышать шелест листьев, который создается от движения животных в лесу.",
    "areaItems": [
      {
        "id": "birch_tree",
        "countMin": 2,
        "countMax": 5
      },
      {
        "id": "oak_tree",
        "countMin": 1,
        "countMax": 4
      },
      {
        "id": "willow_tree",
        "countMin": 1,
        "countMax": 3
      }
    ],
    "stateId": "",
    "enemies": [
      {
        "id": "wolf",
        "countMin": 1,
        "countMax": 3,
        "levelMin": 15,
        "levelMax": 40,
        "spawnChance": 75
      },
      {
        "id": "bear",
        "countMin": 1,
        "countMax": 3,
        "levelMin": 15,
        "levelMax": 40,
        "spawnChance": 40
      }
    ],
    "currentAreaItems": [],
    "currentEnemies": [],
    "timeToRespawnAreaItems": 60,
    "timeToRespawnAreaEnemies": 140,
    "nextRespawnAreaItems": "0",
    "nextRespawnAreaEnemies": "0",
    "lastRespawnAreaItems": "0",
    "lastRespawnAreaEnemies": "0"
  },
  {
    "id": "dark_forest",
    "title": "Темный лес",
    "color": "yellow",
    "avatar": "icons/areas/dark_forest.png",
    "description": "Темный лес - это мрачное и жуткое место, которое находится глубоко в чаще леса. Здесь растут высокие деревья, которые закрывают солнце, и поэтому в лесу темно.",
    "areaItems": [
      {
        "id": "birch_tree",
        "countMin": 3,
        "countMax": 5
      },
      {
        "id": "oak_tree",
        "countMin": 2,
        "countMax": 4
      },
      {
        "id": "willow_tree",
        "countMin": 1,
        "countMax": 4
      },
      {
        "id": "cedar_tree",
        "countMin": 1,
        "countMax": 3
      }
    ],
    "stateId": "",
    "enemies": [
      {
        "id": "bear",
        "countMin": 1,
        "countMax": 3,
        "levelMin": 25,
        "levelMax": 55,
        "spawnChance": 80
      },
      {
        "id": "wolf",
        "countMin": 1,
        "countMax": 3,
        "levelMin": 25,
        "levelMax": 55,
        "spawnChance": 65
      },
      {
        "id": "bandit",
        "countMin": 1,
        "countMax": 3,
        "levelMin": 25,
        "levelMax": 55,
        "spawnChance": 50
      }
    ],
    "currentAreaItems": [],
    "currentEnemies": [],
    "timeToRespawnAreaItems": 80,
    "timeToRespawnAreaEnemies": 80,
    "nextRespawnAreaItems": "0",
    "nextRespawnAreaEnemies": "0",
    "lastRespawnAreaItems": "0",
    "lastRespawnAreaEnemies": "0"
  },
  {
    "id": "wolf_meadows",
    "title": "Волчьи луга",
    "color": "yellow",
    "avatar": "icons/areas/wolf_meadows.png",
    "description": "Место, расположенное на окраине леса. Здесь обитает множество волков, которые приходят сюда в поисках пищи и укрытия.",
    "areaItems": [
      {
        "id": "birch_tree",
        "countMin": 1,
        "countMax": 4
      },
      {
        "id": "oak_tree",
        "countMin": 1,
        "countMax": 2
      },
      {
        "id": "willow_tree",
        "countMin": 0,
        "countMax": 1
      }
    ],
    "stateId": "",
    "enemies": [
      {
        "id": "wolf",
        "countMin": 2,
        "countMax": 7,
        "levelMin": 15,
        "levelMax": 35,
        "spawnChance": 100
      },
      {
        "id": "sheep",
        "countMin": 2,
        "countMax": 4,
        "levelMin": 15,
        "levelMax": 35,
        "spawnChance": 100
      },
      {
        "id": "chicken",
        "countMin": 2,
        "countMax": 5,
        "levelMin": 15,
        "levelMax": 35,
        "spawnChance": 100
      },
      {
        "id": "goblin",
        "countMin": 1,
        "countMax": 3,
        "levelMin": 15,
        "levelMax": 35,
        "spawnChance": 25
      }
    ],
    "currentAreaItems": [],
    "currentEnemies": [],
    "timeToRespawnAreaItems": 120,
    "timeToRespawnAreaEnemies": 80,
    "nextRespawnAreaItems": "0",
    "nextRespawnAreaEnemies": "0",
    "lastRespawnAreaItems": "0",
    "lastRespawnAreaEnemies": "0"
  },
  {
    "id": "ore_lands",
    "title": "Рудные земли",
    "color": "yellow",
    "avatar": "icons/areas/ore_lands.png",
    "description": "Территория, на которой находятся месторождения различных полезных ископаемых. ",
    "areaItems": [
      {
        "id": "birch_tree",
        "countMin": 1,
        "countMax": 2
      },
      {
        "id": "iron_ore",
        "countMin": 2,
        "countMax": 4
      },
      {
        "id": "tungsten_ore",
        "countMin": 2,
        "countMax": 3
      },
      {
        "id": "platinum_ore",
        "countMin": 1,
        "countMax": 3
      }
    ],
    "stateId": "",
    "enemies": [
      {
        "id": "goblin",
        "countMin": 1,
        "countMax": 3,
        "levelMin": 15,
        "levelMax": 35,
        "spawnChance": 80
      },
      {
        "id": "chicken",
        "countMin": 1,
        "countMax": 3,
        "levelMin": 15,
        "levelMax": 35,
        "spawnChance": 45
      }
    ],
    "currentAreaItems": [],
    "currentEnemies": [],
    "timeToRespawnAreaItems": 60,
    "timeToRespawnAreaEnemies": 130,
    "nextRespawnAreaItems": "0",
    "nextRespawnAreaEnemies": "0",
    "lastRespawnAreaItems": "0",
    "lastRespawnAreaEnemies": "0"
  }
]

