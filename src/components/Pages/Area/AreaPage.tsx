import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getStats } from '../../../functions/Stats';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IChangeInfo } from '../../../models/IArea';
import { IAreaCurrentEnemy } from '../../../models/IEnemy';
import { getAvailablePaths, setInventoryFromStorage, setPlayerFromStorage, setSkillsFromStorage, updateAreaEnemies, updateAreaItems } from '../../../store/reducers/ActionCreators';
import CircleButton from '../../Buttons/CircleButton';
import Header from '../../Header/Header';
import CharacterModal from '../../Modals/Character/CharacterModal';
import CraftModal from '../../Modals/CraftModal/CraftModal';
import InfoModal from '../../Modals/InfoModal/InfoModal';
import InventoryModal from '../../Modals/InventoryModal/InventoryModal';
import ShopModal from '../../Modals/ShopModal/ShopModal';
import SkillsModal from '../../Modals/SkillsModal/SkillsModal';
import AreaBackground from './AreaBackground';
import AreaEnemiesSection from './Sections/AreaEnemiesSection';
import AreaItemsSection from './Sections/AreaItemsSection';
import AreaPathsSection from './Sections/AreaPathsSection';


interface IAreaPage {
    $onClickStartBattle: Function;
}

function AreaPage({ $onClickStartBattle }: IAreaPage) {

    const dispatch = useAppDispatch();
    const { areas, availablePaths, currentLocation, playerSkills, inventory, player } = useAppSelector(state => state.userReducer);

    const [isInventoryOpen, setIsInventoryOpen] = useState(false);

    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [whatInfo, setWhatInfo] = useState('area');
    const [infoId, setInfoId] = useState(areas[0].id);

    const onClickOpenInfoModal = (info?: IChangeInfo) => {
        if(info){
            setInfoId(info.id);
            setWhatInfo(info.whatInfo);
        }
        setIsInfoOpen(true);
    }

    const onChangeInfo = (info: IChangeInfo) => {
        setInfoId(info.id);
        setWhatInfo(info.whatInfo);
        
    }

    const onClickCloseModalInfo = () => {
        setIsInfoOpen(false);
        setInfoId(areas[0].id);
        setWhatInfo('area');
    }

    const [isSkillsOpen, setIsSkillsOpen] = useState(false);

    const [isCraftOpen, setIsCraftOpen] = useState(false);

    const [isCharacterOpen, setIsCharacterOpen] = useState(false);

    const [traderId, setTraderId] = useState('');

    const [stats, setStats] = useState(getStats(playerSkills, player));

    const [inventoryWeight, setInventoryWeight] = useState(inventory.reduce((a,v) => a + v.item.weight * v.count ,0));

    const [actionType, setActionType] = useState('');

    useEffect(() => {
        if (!availablePaths.length && currentLocation) {
            dispatch(getAvailablePaths(currentLocation.id));
            dispatch(setInventoryFromStorage());
            dispatch(setPlayerFromStorage());
            dispatch(setSkillsFromStorage());
        }

        

        onChangeInfo({ id: currentLocation.id, whatInfo: 'area' });

        setStats(getStats(playerSkills, player));
        setInventoryWeight(inventory.reduce((a,v) => a + v.item.weight * v.count ,0));
    }, [player, currentLocation.id, areas])

    if(!currentLocation) return <div>Loading...</div>
    return (
        <>
            {
                traderId
                    ? <ShopModal 
                        $traderId={traderId}
                        $locationId={currentLocation.id}
                        $closeModal={() => setTraderId('')}
                        $openInfoModal={(info: IChangeInfo) => onClickOpenInfoModal(info)} />
                    : null
            }
            {
                isCharacterOpen
                ? <CharacterModal $closeModal={() => setIsCharacterOpen(false)} />
                : null
            }
            {
                isCraftOpen
                    ? <CraftModal 
                        $closeModal={() => setIsCraftOpen(false)}
                        $openInfoModal={(info: IChangeInfo) => onClickOpenInfoModal(info)} />
                    : null
            }
            {
                isInventoryOpen
                    ? <InventoryModal closeModal={() => setIsInventoryOpen(false)} />
                    : null
            }
            {
                isSkillsOpen
                    ? <SkillsModal $closeModal={() => setIsSkillsOpen(false)} />
                    : null
            }
            {
                isInfoOpen
                    ? <InfoModal
                        $id={infoId}
                        $closeModal={() => onClickCloseModalInfo()}
                        $whatInfo={whatInfo}
                        $changeInfo={(info: IChangeInfo) => onChangeInfo(info)} />
                    : null
            }

            <AreaBackground $image={currentLocation.avatar} />

            <Header 
                $openInventory={() => setIsInventoryOpen(true)}
                $openSkills={() => setIsSkillsOpen(true)}
                $openCraft={() => setIsCraftOpen(true)}
                $openCharacter={() => setIsCharacterOpen(true)} />
            <Area>
            
                <LevelName color={currentLocation.color}>
                    {currentLocation.title}
                    <CircleButton symbol='?' click={() => onClickOpenInfoModal()} />

                </LevelName>

                <AreaActionMenu>
                    <AreaPathsSection
                        $inventoryWeight={inventoryWeight}
                        $playerStats={stats}
                        $isBlocked={actionType !== 'path' && !!actionType}
                        $changeActionType={() => setActionType('path')}
                        $clearActionType={() => setActionType('')} />

                    <AreaItemsSection 
                        $playerStats={stats}
                        $isBlocked={actionType !== 'items' && !!actionType}
                        $changeActionType={() => setActionType('items')}
                        $clearActionType={() => setActionType('')} />

                    <AreaEnemiesSection 
                        $isBlocked={!!actionType} 
                        $onClickStartBattle={(e: IAreaCurrentEnemy) => $onClickStartBattle(e)}
                        $setTraderId={(id: string) => setTraderId(id)} />


                </AreaActionMenu>
            </Area>
        </>
    );
}


const Area = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 90%;
    height: 75%;
    box-sizing: border-box;
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

interface IBlockProps {
    $update: number;
    $isBlocked: boolean;
}

export default AreaPage;
