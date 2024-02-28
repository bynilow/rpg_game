import styled from 'styled-components'

interface ITimerLineProps {
    $isActive: boolean;
    $currentTime: number;
    $maxTime: number;
    $color: string;
    $backgroundColor: string;
    $isOverweight?: boolean;
}

function TimerLine({
    $isActive, 
    $currentTime, 
    $maxTime, 
    $color,
    $backgroundColor, 
    $isOverweight}: ITimerLineProps) {

    return (
        <>
            <Text $isOverweight={$isOverweight}>
                {
                    $isActive
                        ? $currentTime.toFixed(1)
                        : $maxTime.toFixed(1)
                }s
            </Text>
            <Line
                $color={$color}
                $backgroundColor={$backgroundColor}
                max={$maxTime}
                value={$isActive ? $currentTime : $maxTime} />
        </>
    );
}

interface ITextProps{
    $isOverweight?: boolean;
}

const Text = styled.p<ITextProps>`
    position: absolute;
    color: ${p => p.$isOverweight ? '#bb3a3a' : '#A9A9A9'};
    bottom: 0;
    right: 0;
    margin: 10px;
`

interface ILineProps{
    $color: string;
    $backgroundColor: string;
}

const Line = styled.progress<ILineProps>`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    overflow: hidden;
    border-radius: 0 0 10px 10px;
    /* visibility: hidden; */
    -webkit-appearance: none;
    appearance: none;

    transition: 0.1s;

    &::-webkit-progress-value {
        background-color: ${p => p.$color};
        transition: 0.2s;
    }
    &::-webkit-progress-bar {
        background-color: ${p => p.$backgroundColor};
    }
    &::-moz-progress-value {
        background-color: ${p => p.$color};
        transition: 0.2s;
    }
    &::-moz-progress-bar {
        background-color: ${p => p.$backgroundColor};
    }
`

export default TimerLine;