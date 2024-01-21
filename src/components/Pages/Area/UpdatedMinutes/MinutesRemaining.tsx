import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { addXP } from '../../../../store/reducers/ActionCreators';

interface IMinutesRemainingProps {
    $nextUpdateDateTime: string;
}

function MinutesRemaining({
    $nextUpdateDateTime}: IMinutesRemainingProps) {

    const [secondsToUpdate, setSecondsToUpdate] = useState<number>(() => {
        const currentDateTime = new Date().getTime();
        const nextUpdate = new Date($nextUpdateDateTime).getTime();
        return Math.round((nextUpdate - currentDateTime) / 1000);
      });
    
    useEffect(() => {
        console.log('mount')
        const updateRespawnInterval = setInterval(() => {
            console.log('interval')
            changeMinutesToUpdate();
        }, 1000);
        
        return () => {
            console.log('unmount')
            clearInterval(updateRespawnInterval);
        }
    }, []);

    const changeMinutesToUpdate = () => {
        setSecondsToUpdate((prevSeconds) => {
            if (prevSeconds > 0) {
                return prevSeconds - 1;
            } else {
                return 0;
            }
        });
    }

    return (
        <Minutes>
            ⟳ {secondsToUpdate}s
        </Minutes>
    );
}

const Minutes = styled.p`
  font-size: 20px;
  line-height: 0;
  margin: 0;
`

export default MinutesRemaining;