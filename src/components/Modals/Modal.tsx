import styled from 'styled-components';
import React from 'react';
import ModalBackground from './Other/ModalBackground';

interface IModal {
    color?: string;
    $flexDirection: 'row' | 'column';
    $alignItems?: '';
    children: React.ReactNode;
}

function Modal({ color = 'white', children, $flexDirection, $alignItems = '' }: IModal) {
    return (
        <>
            <ModalBackground />
            <ModalBlock 
                color={color} 
                $flexDirection={$flexDirection} 
                $alignItems={$alignItems}>
            {
                children
            }
            </ModalBlock>
        </>
    );
}

interface IModalBlockProps{
    color: string;
    $flexDirection: 'row' | 'column';
    $alignItems: string;
}

const ModalBlock = styled.div<IModalBlockProps>`
    z-index: 9999;
    position: absolute;
    width: 70vw;
    height: 80vh;
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
    justify-content: ${ p => p.$flexDirection === 'row' ? 'space-around' : null };
    align-items: ${ p => p.$alignItems };
    gap: 20px;

    transition: .1s;

    background: ${p => p.color};
`

export default Modal;