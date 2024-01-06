import styled from 'styled-components'
import Modal from '../Modal';
import CircleButton from '../../Buttons/CircleButton';

interface ISkillsModalProps {

}

function SkillsModal() {

    return (  
        <Modal 
            $flexDirection='column' >
            
            <SkillsList>

            </SkillsList>
        </Modal>
    );
}

const SkillsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export default SkillsModal;