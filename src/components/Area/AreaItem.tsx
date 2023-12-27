import styled from 'styled-components'
import { useAppDispatch } from '../../hooks/redux';
import { stopMineItem, stopMoveToLocation } from '../../store/reducers/ActionCreators';
import { IAreaFullItem } from '../../models/IAreaItem';
import { useState } from 'react';


interface IAreaItemProps {
    item: IAreaFullItem;
    currentTimeToMine: number;
    onClicked: Function;
}

function Area({ item, currentTimeToMine=item.timeToMining, onClicked }: IAreaItemProps) {

    const dispatch = useAppDispatch();

    const [isMining, setIsMining] = useState(false);

    const onClickLevel = (e:React.MouseEvent<HTMLDivElement>) => {
        setIsMining(true);
        onClicked();
    }

    const onClickStopMining = () => {
        dispatch(stopMineItem());
        setIsMining(false);
        
    }

    // const isThisLevelSelected = '' === selectedLevelId;

    return (
        <AreaItemBlock rare={item.rare} >
            <AreaItemBlockClickable onClick={e => onClickLevel(e)} />
            <Avatar>
                {
                    isMining
                        ? <StopMiningCross id='stopminning' onClick={() => onClickStopMining()}>
                            ✘
                        </StopMiningCross>
                        : null
                }
                {/* <StopMiningCross>
                        ✘
                    </StopMiningCross> */}
            </Avatar>
            <Title>{item.title}</Title>
            <Timer>
                {
                    isMining
                        ? currentTimeToMine.toFixed(1)
                        : item.timeToMining
                }s
            </Timer>
            <TimerLine 
            rare={item.rare}
            max={item.timeToMining} 
            value={isMining ? currentTimeToMine : item.timeToMining} />
        </AreaItemBlock>
    );
}

const AreaItemBlockClickable = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`

interface IRareProp {
    rare: string;
}

const AreaItemBlock = styled.div<IRareProp>`
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

    background: ${props => 
        props.rare === 'common' 
        ? "linear-gradient(135deg, white 80%, #a4a4ab 80%);"
        : props.rare === 'uncommon'
        ? "linear-gradient(135deg, white 80%, #59c87f 80%);"
        : props.rare === 'rare'
        ? "linear-gradient(135deg, white 80%, #4d69cd 80%);"
        : props.rare === 'mythical'
        ? "linear-gradient(135deg, white 80%, #d42be6 80%);"
        : "linear-gradient(135deg, white 80%, #caab05 80%);"
    };

    &:hover{
        transform: scale(1.05);
        
    }
`

//common
//background: rgb(255,255,255);
// background: linear-gradient(145deg, rgba(255,255,255,1) 0%, #a4a4ab 100%);

//uncommon
// background: rgb(255,255,255);
// background: linear-gradient(145deg, rgba(255,255,255,1) 0%, #65e28f 100%);

//rare
// background: rgb(255,255,255);
// background: linear-gradient(145deg, rgba(255,255,255,1) 0%, #4d69cd 100%);

//mythical
// background: rgb(255,255,255);
// background: linear-gradient(145deg, rgba(255,255,255,1) 0%, #d42be6 100%);

//legendary
// background: rgb(255,255,255);
// background: linear-gradient(145deg, rgba(255,255,255,1) 0%, #caab05 100%);


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
    color: white;
    bottom: 0;
    right: 0;
    margin: 10px;
`

const TimerLine = styled.progress<IRareProp>`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;

    -webkit-appearance: none;
   appearance: none;

   transition: 0.1s;

   &::-webkit-progress-value {
    background-color: ${props => 
        props.rare === 'common' 
        ? "#a4a4ab;"
        : props.rare === 'uncommon'
        ? "#59c87f;"
        : props.rare === 'rare'
        ? "#4d69cd;"
        : props.rare === 'mythical'
        ? "#d42be6;"
        : "#caab05;"
    };
    transition: 0.2s;
   }
   &::-webkit-progress-bar {
    background-color: ${props => 
        props.rare === 'common' 
        ? "#8d8d92;"
        : props.rare === 'uncommon'
        ? "#4dac6e;"
        : props.rare === 'rare'
        ? "#4458a1;"
        : props.rare === 'mythical'
        ? "#b725c7;"
        : "#ac9204;"
    };
   }
`

const Title = styled.p`
    cursor: pointer;
`

const StopMiningCross = styled.div`
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