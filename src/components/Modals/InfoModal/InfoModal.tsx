import { useEffect } from 'react';
import styled from 'styled-components';
import { IArea, IChangeInfo } from '../../../models/IArea';
import { scrollBarX } from '../../../styles/scrollbars';
import ModalBackground from '../Other/ModalBackground';
import AreaModal from './InfoModalArea';
import EnemyModal from './InfoModalEnemy';
import ItemModal from './InfoModalItem';

interface IInfoModal {
    area: IArea;
    itemId: string;
    enemyId: string;
    closeModal: Function;
    whatInfo: string;

    changeWhatInfo: (item: IChangeInfo) => void;
}

function InfoModal({ area, closeModal, whatInfo, changeWhatInfo, itemId, enemyId }: IInfoModal) {

    useEffect(() => {

    }, [])

    return (
        whatInfo === 'area'
            ? <AreaModal
                $area={area}
                $changeWhatInfo={(info: IChangeInfo) => changeWhatInfo(info)}
                $closeModal={() => closeModal()} />
            : whatInfo === 'item'
                ? <ItemModal
                    $itemId={itemId}
                    $changeWhatInfo={(info: IChangeInfo) => changeWhatInfo(info)}
                    $closeModal={() => closeModal()} />
                : whatInfo === 'enemy'
                    ? <EnemyModal
                        $enemyId={enemyId}
                        $changeWhatInfo={(info: IChangeInfo) => changeWhatInfo(info)}
                        $closeModal={() => closeModal()} />
                    : null
    );
}

const ProperyName = styled.span`
    color: black;
`

const Property = styled.p`
    
`

const Cost = styled.p`
    color: black;
    width: min-content;
    background-color: #dddddd;
    border-radius: 5px;
    padding: 5px;
    margin: 0;
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

interface IColorText {
    color: string;
}

const ColorText = styled.p<IColorText>`
    font-size: 16px;
    margin: 0;
    color: ${props => props.color};
`

const UpdateText = styled.p`
    font-size: 16px;
    margin: 0;
`

const Section = styled.div`
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    gap: 10px;

    ${scrollBarX
    }
`

const Description = styled.p`
    font-size: 18px;
    margin: 0;
`

const Title = styled.p`
    font-size: 30px;
    margin: 0;
`

interface IInfoProps {
    color: string;
}

export default InfoModal;