import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import CircleButton from '../Buttons/CircleButton';

interface IModal {
    $backgroundColor?: string;
    $flexDirection: 'row' | 'column';
    $alignItems?: '';
    $isCloseButton?: boolean;
    $isEnableAnims?: boolean;
    $closeButtonFunction?: Function;
    $gap?: string;
    $size?: 'auto' | 'small' | 'medium' | 'large';
    $justifyContent?: 'space-between' | 'space-around' | 'center' | 'baseline' | 'end';
    children?: React.ReactNode;
}

function Modal({
    $backgroundColor = 'white',
    children,
    $flexDirection,
    $alignItems = '',
    $isEnableAnims = true,
    $isCloseButton,
    $closeButtonFunction,
    $gap = '1.3em',
    $justifyContent = 'space-between',
    $size = 'medium', }: IModal) {

    const [isOpenAnim, setIsOpenAnim] = useState(true);
    const [isCloseAnim, setIsCloseAnim] = useState(false);

    // setTimeout(() => {
    //     setIsOpenAnim(false);
    // }, 1000)

    const onClickCloseButton = () => {
        if(!isCloseAnim){
            setIsCloseAnim(true);
            setTimeout(() => {
                if (typeof $closeButtonFunction !== 'undefined') $closeButtonFunction()
            }, 700)
        }
    }

    return (
        <ModalBlock key={isCloseAnim.toString()} $isClosing={isCloseAnim}>

            <ModalInner
                $backgroundColor={$backgroundColor}
                $flexDirection={$flexDirection}
                $alignItems={$alignItems}
                $isEnableAnims={$isEnableAnims}
                $isOpenAnim={isOpenAnim}
                $isCloseAnim={isCloseAnim}
                $gap={$gap}
                $size={$size}
                $justifyContent={$justifyContent} >
                {
                    $isCloseButton
                        ? <CircleButton symbol='✕' click={() => onClickCloseButton()} />
                        : null
                }

                {
                    children
                }
            </ModalInner>
        </ModalBlock>

    );
}

interface IModalBlockProps {
    $backgroundColor: string;
    $flexDirection: 'row' | 'column';
    $alignItems: string;
    $isEnableAnims: boolean;
    $isOpenAnim: boolean;
    $isCloseAnim: boolean;
    $gap: string;
    $size: string;
    $justifyContent: string;
}

const ModalAnimation = keyframes`
    0%{
        transform: translateY(10%);
        opacity: 0;
    }
    100%{
        transform: translateY(0);
        opacity: 1;
    }
`

const ModalInner = styled.div<IModalBlockProps>`
    position: absolute;
    width: ${p =>
        p.$size === 'small'
            ? '40vw'
            : p.$size === 'medium'
                ? '70vw'
                : p.$size === 'large'
                    ? '80vw'
                    : 'fit-content'};
    max-height: ${p =>
        p.$size === 'small'
            ? '60vh'
            : p.$size === 'medium'
                ? '80vh'
                : p.$size === 'large'
                    ? '90vh'
                    : 'fit-content'};
    height: ${p =>
        p.$size === 'small'
            ? '60vh'
            : p.$size === 'medium'
                ? '80vh'
                : p.$size === 'large'
                    ? '90vh'
                    : 'fit-content'};
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    padding: 1.3rem;
    background-color: white;
    box-shadow: 0 0 10px #00000050;
    border-radius: 15px;
    display: flex;
    flex-direction: ${p => p.$flexDirection};
    justify-content: ${p => p.$justifyContent};
    align-items: ${p => p.$alignItems};
    gap: ${p => p.$gap};
    overflow: hidden;

    animation: ${ModalAnimation} 0.5s ease;
    animation-direction: ${p => p.$isCloseAnim
        ? 'reverse'
        : 'normal'};
    animation-fill-mode: forwards;

    background: ${p => p.$backgroundColor};

    @media (max-width: 768px) {
        width: ${p =>
        p.$size === 'small'
            ? '80vw'
            : p.$size === 'medium'
                ? '90vw'
                : p.$size === 'large'
                    ? '95vw'
                    : 'fit-content'};
    max-height: ${p =>
        p.$size === 'small'
            ? '80vh'
            : p.$size === 'medium'
                ? '90vh'
                : p.$size === 'large'
                    ? '95vh'
                    : 'fit-content'};
    height: ${p =>
        p.$size === 'small'
            ? '80vh'
            : p.$size === 'medium'
                ? '90vh'
                : p.$size === 'large'
                    ? '95vh'
                    : 'fit-content'};
    }
`

const BackgroundAnimation = keyframes`
    from{
        backdrop-filter: blur(0px);
        background-color: rgba(0,0,0,0);
    }
    to{
        backdrop-filter: blur(5px);
        background-color: #0000006e;
    }
`

interface IModalBackgroundProps {
    $isClosing: boolean;
}

const ModalBlock = styled.div<IModalBackgroundProps>`
    z-index: 10;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: #0000006e;
    

    animation: ${BackgroundAnimation} 0.5s ease;
    animation-direction: ${p => p.$isClosing
        ? 'reverse'
        : 'normal'};
    animation-fill-mode: forwards;
`

export default Modal;