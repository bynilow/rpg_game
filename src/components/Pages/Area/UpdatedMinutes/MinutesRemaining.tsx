import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface IMinutesRemainingProps {
    $nextUpdateDateTime: string;
    $timeToUpdate: number;
}

function MinutesRemaining({
    $nextUpdateDateTime,
    $timeToUpdate }: IMinutesRemainingProps) {

    const currentDateTime = new Date().getTime();
    const nextUpdate = new Date($nextUpdateDateTime).getTime();
    const testTime = Math.round((nextUpdate - currentDateTime) / 1000);

    const [secondsToUpdate, setSecondsToUpdate] = useState<number>(testTime);
    const [tick, setTick] = useState(false);

    // useEffect(() => {
    //     if (secondsToUpdate < 0) return; // время вышло
    //     setSecondsToUpdate((prevSeconds) => {
    //         if (prevSeconds > 0) {
    //             return prevSeconds - 1;
    //         } else {
    //             return 0;
    //         }
    //     });
    // }, [tick, secondsToUpdate]);

    const onClickedTimer = () => {

    }

    useEffect(() => {
        const timerID = setInterval(() => setSecondsToUpdate(Math.round((new Date($nextUpdateDateTime).getTime() - new Date().getTime()) / 1000)), 1000);
        return () => clearInterval(timerID);
    }, [secondsToUpdate, $nextUpdateDateTime]);

    return (
        <Minutes>
            ⟳ {$timeToUpdate}m
        </Minutes>
    );
}

const Minutes = styled.p`
    position: absolute;
    top: 0%;
    right: 0;
    font-size: 16px;
    margin: 10px;
`

export default MinutesRemaining;