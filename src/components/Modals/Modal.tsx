import styled, { keyframes } from 'styled-components';
import React, { useEffect, useState } from 'react';
import ModalBackground from './Other/ModalBackground';
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

    setTimeout(() => {
        setIsOpenAnim(false);
    }, 1000)

    const onClickCloseButton = () => {
        setIsCloseAnim(true);
        setTimeout(() => {
            if(typeof $closeButtonFunction !== 'undefined') $closeButtonFunction() 
        }, 470)
    }

    return (
        <>
            <ModalBackground
                $isEnableAnims
                $closeAnim={isCloseAnim} />
            <ModalBlock
                key={isCloseAnim ? 'close' : 'none'}
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
            </ModalBlock>
        </>
    );
}

interface IModalBlockProps{
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

const ModalBlockAnim = keyframes`
    from{
        transform: translateY(10vh);
        opacity: 0;
    }
    to{
        transform: translateY(0);
        opacity: 1;
    }
`

const ModalBlock = styled.div<IModalBlockProps>`
    z-index: 9999;
    position: fixed;
    width: ${ p => 
        p.$size === 'small'
        ? '40vw'
        : p.$size === 'medium'
        ? '70vw'
        : p.$size === 'large'
        ? '80vw'
        : 'fit-content' };
    max-height: ${ p => 
        p.$size === 'small'
        ? '60vh'
        : p.$size === 'medium'
        ? '80vh'
        : p.$size === 'large'
        ? '90vh'
        : 'fit-content' };
    height: ${ p => 
        p.$size === 'small'
        ? '60vh'
        : p.$size === 'medium'
        ? '80vh'
        : p.$size === 'large'
        ? '90vh'
        : 'fit-content' };
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
    flex-direction: ${ p => p.$flexDirection };
    justify-content: ${ p => p.$justifyContent };
    align-items: ${ p => p.$alignItems };
    gap: ${ p => p.$gap };
    overflow: hidden;

    animation: ${p => p.$isEnableAnims ? ModalBlockAnim : null} 0.5s ease;
    animation-direction: ${ 
            p => p.$isCloseAnim
                ? 'reverse' 
                : 'normal' };
    


    background: ${p => p.$backgroundColor};

    @media (max-width: 768px) {
        width: ${ p =>
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
                    : 'fit-content' };
    }
`

export default Modal;