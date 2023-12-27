import styled from 'styled-components'
import { useAppDispatch } from '../../hooks/redux';
import { stopMoveToLocation } from '../../store/reducers/ActionCreators';

interface IArea {
    name: string;
    time: number;
    currentTime: number;
    levelId: string;
    onClicked: Function;
    selectedLevelId: string;
}



function Area({ name, time, currentTime, levelId, onClicked, selectedLevelId }: IArea) {

    const dispatch = useAppDispatch();

    const onClickLevel = (e:React.MouseEvent<HTMLDivElement>) => {
        console.log(e.currentTarget.id)
        onClicked()
    }

    const onClickStopMove = () => {
        dispatch(stopMoveToLocation());
    }

    const isThisLevelSelected = levelId === selectedLevelId;

    return (
        <AreaBlock >
            <AreaBlockClickable onClick={e => onClickLevel(e)} />
            <Avatar>
                {
                    isThisLevelSelected
                        ? <StopMoveCross id='stopmove' onClick={() => onClickStopMove()}>
                            ✘
                        </StopMoveCross>
                        : null
                }
                {/* <StopMoveCross>
                        ✘
                    </StopMoveCross> */}
            </Avatar>
            <Name>{name}</Name>
            <Timer>
                {
                    isThisLevelSelected
                        ? currentTime.toFixed(1) + 's'
                        : time + 's'
                }
            </Timer>
            <TimerLine max={time} value={isThisLevelSelected ? currentTime : time} />
        </AreaBlock>
    );
}

const AreaBlockClickable = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`

const AreaBlock = styled.div`
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.56);
    padding: 20px;
    border-radius: 5px;
    width: 350px;
    height: 30px;
    display: flex;
    gap: 20px;
    align-items: center;
    position: relative;
    cursor: pointer;
    transition: 0.1s;

    &:hover{
        transform: scale(1.05);
    }
`

const Avatar = styled.div`
    z-index: 2;
    width: 70px;
    height: 70px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 1);
    background-color: #A9A9A9;
    border-radius: 50%;

    transition: 0.1s;
    &:hover{
        transform: scale(0.95);
    }
`

const Timer = styled.p`
    position: absolute;
    color: #A9A9A9;
    bottom: 0;
    right: 0;
    margin: 10px;
`

const TimerLine = styled.progress`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;

    -webkit-appearance: none;
   appearance: none;

   transition: 0.1s;

   &::-webkit-progress-value {
    background-color: #4682B4;
    transition: 0.2s;
   }
   &::-webkit-progress-bar {
    background-color: #A9A9A9;
   }
`

const Name = styled.p`
    cursor: pointer;
`

const StopMoveCross = styled.div`
    font-size: 50px;
    text-align: center;
    color: white;
    text-shadow: 0px 0px 6px rgba(0,0,0,0.5);
    transition: 0.1s;

    &:hover{
        transform: scale(2);
    }
`

export default Area;