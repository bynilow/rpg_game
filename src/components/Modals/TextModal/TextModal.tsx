import styled from 'styled-components'
import Modal from '../Modal';

interface ITextModalProps {
    children?: React.ReactNode;
    $onClickCloseModal: Function;
}

function TextModal({children, $onClickCloseModal}: ITextModalProps) {

    return (  
        <Modal 
            $flexDirection='column'
            $justifyContent='center'
            $size='auto'
            $isCloseButton
            $closeButtonFunction={() => $onClickCloseModal()} >
            
            <Title>
                {
                    children
                }
            </Title>
        </Modal>
    );
}

const Title = styled.p`
    margin: 1.3rem;
    font-size: 1.5rem;
`

export default TextModal;