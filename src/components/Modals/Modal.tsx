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
    $size?: 'small' | 'medium' | 'large';
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
    $gap = '20px',
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
    
    useEffect(() => {

    }, [])

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
    position: absolute;
    width: ${ p => 
        p.$size === 'small'
        ? '40vw'
        : p.$size === 'medium'
        ? '70vw'
        : '80vw' };
    max-height: ${ p => 
        p.$size === 'small'
        ? '60vh'
        : p.$size === 'medium'
        ? '80vh'
        : '90vh' };
    height: ${ p => 
        p.$size === 'small'
        ? '60vh'
        : p.$size === 'medium'
        ? '80vh'
        : '90vh' };
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    padding: 20px;
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
    

    transition: .1s;

    background: ${p => p.$backgroundColor};
`

export default Modal;