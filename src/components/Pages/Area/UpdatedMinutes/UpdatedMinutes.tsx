import { useEffect, useState } from 'react';
import styled from 'styled-components'

interface IMinutesRemainingProps {
    $nextUpdateDateTime: string;
}

function MinutesRemaining({$nextUpdateDateTime}: IMinutesRemainingProps) {

    const [minutesToUpdate, setMinutesToUpdate] = useState(0);
    const [secondsToUpdate, setSecondsToUpdate] = useState(Math.round((new Date($nextUpdateDateTime).getTime() - new Date().getTime()) / (1000)));
    
    const changeMinutesToUpdate = () => {
        const currentDateTime = new Date().getTime();
        const nextUpdate = new Date($nextUpdateDateTime).getTime();
        
        setMinutesToUpdate(Math.round((nextUpdate - currentDateTime) / (1000 * 60)));
        setSecondsToUpdate(Math.round((nextUpdate - currentDateTime) / (1000)));
    }

    useEffect(() => {
        changeMinutesToUpdate();
        const updateRespawnInterval = setInterval(() => {
            changeMinutesToUpdate();
        }, 1000);

        return () => clearInterval(updateRespawnInterval);
        
    }, [$nextUpdateDateTime, secondsToUpdate])

    return (
        <Minutes key={secondsToUpdate}>
            ⟳ {minutesToUpdate}m {secondsToUpdate}s
        </Minutes>
    );
}

const Minutes = styled.p`
  font-size: 20px;
  line-height: 0;
  margin: 0;
`

export default MinutesRemaining;