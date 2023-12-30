import styled from 'styled-components'
import ModalBackground from '../Other/ModalBackground';
import CircleButton from '../../Buttons/CircleButton';
import { useAppSelector } from '../../../hooks/redux';
import InfoItem from './InfoItem';
import { idText } from 'typescript';

function InfoModal() {

    const {areas} = useAppSelector(state => state.userReducer)

    return ( 
        <>
        <ModalBackground />
        <Info color={areas[3].color}>
            
            <CircleButton symbol='✕' />
            <Section>
                <Avatar alt='' src={require('../../../'+areas[3].avatar)} />
                <Title>
                    "{areas[3].title}"
                </Title>
                <ColorText>
                    {
                        areas[3].color === 'green'
                            ? 'Зеленная зона'
                            : areas[3].color === 'yellow'
                            ? 'Желтая зона'
                            : 'Красная зона'
                    
                    }
                </ColorText>
                <Description>
                    {
                        areas[3].description
                    }
                </Description>
            </Section>
            
            <Section>
                <Title>
                    Местность
                </Title>
                <UpdateText>
                    Обновляется каждые {areas[3].timeToRespawnAreaItems} минут
                </UpdateText>
                <List>
                    {
                        areas[3].areaItems.map(i => 
                            <InfoItem 
                                id={i.id}
                                countMax={i.countMax}
                                countMin={i.countMin} />)
                    }
                    
                </List>
            </Section>

            <Section>
                <Title>
                    Враги
                </Title>
                <UpdateText>
                    Обновляются каждые {areas[3].timeToRespawnAreaEnemies} минут
                </UpdateText>
            </Section>
            
        </Info>
        </>
     );
}

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const ColorText = styled.p`
    font-size: 16px;
`

const UpdateText = styled.p`
    font-size: 16px;
`

const Section = styled.div`
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar{
        width: 5px;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background: #d4d4d4; 
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        margin: 10px;
        width: 20px;
        background-color: #858585;    
        border-radius: 10px;       
    }
`

const Avatar = styled.img`
    width: 10vw;
    height: 10vw;
    background-color: #ffffff;
    box-shadow: 0 0 5px black;
    border-radius: 50%;

    transition: .3s;
    box-sizing: border-box;
`

const Description = styled.p`
    font-size: 18px;
`

const Title = styled.p`
    font-size: 30px;
    margin: 0;
`

interface IInfoProps{
    color: string;
}

const Info = styled.div`
    z-index: 9999;
    position: absolute;
    width: 70vw;
    height: 80vh;
    top: 10%;
    background-color: white;
    box-shadow: 0 0 10px #00000050;
    border-radius: 15px;
    display: flex;
    justify-content: space-around;
    gap: 20px;

    background: ${props =>
        props.color === 'green'
            ? "linear-gradient(225deg, #ffffff 95%, #51973f 95%);"
            : props.color === 'yellow'
            ? "linear-gradient(225deg, #ffffff 95%, #b9ae4b 95%);"
            : "linear-gradient(225deg, #ffffff 95%, #cd4d4d 95%);"
        }
`

export default InfoModal;