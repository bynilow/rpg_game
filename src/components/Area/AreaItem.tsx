import styled, { keyframes } from 'styled-components'
import { useAppDispatch } from '../../hooks/redux';
import { stopMineItem, stopMoveToLocation } from '../../store/reducers/ActionCreators';
import { IAreaFullItem } from '../../models/IAreaItem';
import { useRef, useState } from 'react';


interface IAreaItemProps {
    item: IAreaFullItem;
    mineItem: Function;
    index: number;
}

function Area({ item, mineItem, index }: IAreaItemProps) {

    const dispatch = useAppDispatch();

    const [isMining, setIsMining] = useState(false);
    const isMiningRef = useRef(isMining);
    isMiningRef.current = isMining;
    const [timeToMining, setTimeToMining] = useState(item.timeToMining);

    const onClickStartMining = (e:React.MouseEvent<HTMLDivElement>) => {
        setIsMining(true);
        startIntervalMine();
        
    }

    const onClickStopMining = () => {
        dispatch(stopMineItem());
        setTimeToMining(item.timeToMining);
        setIsMining(false);
        
    }

    const startIntervalMine = () => {
        const interval = setInterval(() => {
            if(!isMiningRef.current) clearInterval(interval);
            setTimeToMining(t => t - 0.05);
        }, 50);
        setTimeout(() => {
            clearInterval(interval);
            if(isMiningRef.current) {
                mineItem();
            }
        }, item.timeToMining*1000)
        
    }

    return (
        <AreaItemBlock rare={item.rare} index={index} >
            <AreaItemBlockClickable onClick={e => onClickStartMining(e)} />
            <Avatar image={item.avatar}>
                {/* <AvatarImg alt="" src={require('../../'+item.avatar)} /> */}
                {
                    isMining
                        ? <StopMiningCross id='stopminning' onClick={() => onClickStopMining()}>
                            ✕
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
                        ? timeToMining.toFixed(1)
                        : item.timeToMining
                }s
            </Timer>
            <TimerLine 
                rare={item.rare}
                max={item.timeToMining} 
                value={isMining ? timeToMining : item.timeToMining} />
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

interface IAvatarProps{
    image: string;
}

const Avatar = styled.div<IAvatarProps>`
    z-index: 2;
    position: relative;
    width: 90px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;

    background-image: url(${p => require('../../' + p.image)});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    

    transition: 0.3s;
    &:hover{
        transform: scale(1.1);
    }
`

const AvatarImg = styled.img`
    width: 120%;
    top: -10%;
    left: -10%;
    position: absolute;
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
    transition: .1s;
`

const StopMiningCross = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    padding: 30px;
    width: 50%;
    height: 50%;
    z-index: 99;
    line-height: 0;
    color: white;
    background-color: #00000050;
    border-radius: 50%;
    transition: 0.1s;
    box-sizing: border-box;

    &:hover{
        transform: scale(1.5);
        background-color: #00000084;
    }
`

const AreaItemBlockAnim = keyframes`
    from{
        transform: scale(0) rotate(-50deg);
    }
    to{
        transform: scale(1) rotate(0deg);
    }
`

interface IAreaItemBlockProps{
    rare: string;
    index: number;
}

const AreaItemBlock = styled.div<IAreaItemBlockProps>`
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

    transform: scale(0) rotate(-45deg);
    animation: ${AreaItemBlockAnim} .5s ease;
    animation-delay: ${p => p.index/3}s;
    animation-fill-mode: forwards;

    transition: 1s;

    &:hover ${Title} {
        padding: 20px;
    }

    &:hover{
        background: ${props =>
        props.rare === 'common'
            ? "linear-gradient(135deg, #e7e7e7 80%, #a4a4ab 80%);"
            : props.rare === 'uncommon'
            ? "linear-gradient(135deg, #e7e7e7 80%, #59c87f 80%);"
            : props.rare === 'rare'
            ? "linear-gradient(135deg, #e7e7e7 80%, #4d69cd 80%);"
            : props.rare === 'mythical'
            ? "linear-gradient(135deg, #e7e7e7 80%, #d42be6 80%);"
            : "linear-gradient(135deg, #e7e7e7 80%, #caab05 80%);"
    };
    }
`


export default Area;