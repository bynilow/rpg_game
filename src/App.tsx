import { useEffect, useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import AreaPage from './components/Pages/Area/AreaPage';
import CombatPage from './components/Pages/Combat/CombatPage';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { IArea } from './models/IArea';
import { IAreaCurrentEnemy } from './models/IEnemy';
import CreatorPageItem from './components/Pages/Creator/CreatorItemPage';
import CreatorPageArea from './components/Pages/Creator/CreatorAreaPage';
import CreatorPageEnemy from './components/Pages/Creator/CreatorEnemiesPage';
import { scrollBarX } from './styles/scrollbars';


function App() {

  const {} = useAppSelector(state => state.userReducer)

  const dispatch = useAppDispatch();


  const [isBattle, setIsBattle] = useState(false);
  const [isStartedBattle, setIsStartedBattle] = useState(false);
  const [isEndedBattle, setIsEndedBattle] = useState(false);
  const [battleEnemy, setBattleEnemy] = useState<IAreaCurrentEnemy | null>();

  const onClickStartBattle = ({ ...enemy }: IAreaCurrentEnemy) => {
    setIsStartedBattle(true);
    setTimeout(() => {
        setBattleEnemy(enemy);
        setIsBattle(true);
    }, 2000)
}

  const onFinishBattle = (isWin: boolean) => {
    setBattleEnemy(null);
    setIsStartedBattle(false);
    setIsBattle(false);
    setIsEndedBattle(true);
    setTimeout(() => {
      setIsEndedBattle(false);
  }, 2000)
  }

  if (isBattle) {
    return (
      <>
        <GlobalStyle />
        <CombatPage
          $enemyId={battleEnemy!.id}
          $enemyIdInArea={battleEnemy!.idInArea}
          $level={battleEnemy!.level}
          $finishBattle={(isWin: boolean) => onFinishBattle(isWin)} />
      </>
    )
  }

  // return(
  //   <CreatorPageArea />
  // )

  if (true) {
    return (
      <>
        <GlobalStyle />
        <Application>
          {
            isStartedBattle || isEndedBattle
              ? <BattleBlock $isStart={isStartedBattle} />
              : null
          }
          <AreaPage
            $onClickStartBattle={({ ...enemy }: IAreaCurrentEnemy) => onClickStartBattle(enemy)} />
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

const StartBattleAnim = keyframes`
  0%{
    transform: scale(0);
  }
  100%{
    transform: scale(1.7);
  }
`

interface IBattleBlockProps{
  $isStart: boolean;
}

const BattleBlock = styled.div<IBattleBlockProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 99999;
  width: 100vw;
  max-height: 100vw;
  border-radius: 50%;
  background: black;

  animation: ${StartBattleAnim} 2s ease forwards ${p => p.$isStart ? 'normal' : 'reverse'};

  &::after{
    content: '';
    position: absolute;
    z-index: 99999;
    transform: scale(10);
    width: 100vw;
    height: 100vh;
    bottom: 0;
    top: 0;
    left: 0;
    margin: auto;
    
    background: rgba(0,0,0,0);
  }

  @media (max-width: 1025px) {
    width: 100vh;
    height: 100vh;
  }
  @media (max-width: 426px) {
    left: -50%;
    right: 50%;
  }
`

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`

const Application = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;
  
  overflow-y: hidden;
  overflow-x: hidden;

  ${
    scrollBarX
  }
`



export default App;
