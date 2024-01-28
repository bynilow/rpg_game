import { useEffect } from 'react';
import styled from 'styled-components';
import { IArea, IChangeInfo } from '../../../models/IArea';
import { scrollBarX } from '../../../styles/scrollbars';
import ModalBackground from '../Other/ModalBackground';
import AreaModal from './InfoModalArea';
import EnemyModal from './InfoModalEnemy';
import ItemModal from './InfoModalItem';
import Modal from '../Modal';
import { useAppSelector } from '../../../hooks/redux';
import { getAreaBackground, getEnemyBackground, getItemBackground } from '../../../styles/backgrounds';

interface IInfoModal {
    $id: string;
    $whatInfo: string;

    $closeModal: Function;
    $changeInfo: (info: IChangeInfo) => void;
}

function InfoModal({ $id, $closeModal, $whatInfo, $changeInfo }: IInfoModal) {

    const {areaItems, areas, enemies} = useAppSelector(state => state.userReducer);

    useEffect(() => {

    }, [$whatInfo, $id])

    const getBackgroundColor = () => {
        switch($whatInfo){
            case 'item':
                return getItemBackground(areaItems.find(i => i.id === $id)!.rare);
            case 'area':
                return getAreaBackground(areas.find(a => a.id === $id)!.color);
            case 'enemy':
                return getEnemyBackground(enemies.find(e => e.id === $id)!.type);
        }
    }

    return (
        <Modal
            $flexDirection='row'
            $isCloseButton={true}
            $closeButtonFunction={() => $closeModal()}
            $backgroundColor={getBackgroundColor()} >
            <ModalInner>
                {
                    $whatInfo === 'area'
                        ? <AreaModal
                            key={$id}
                            $id={$id}
                            $changeWhatInfo={(info: IChangeInfo) => $changeInfo(info)}
                            $closeModal={() => $closeModal()} />
                        : $whatInfo === 'item'
                            ? <ItemModal
                                key={$id}
                                $id={$id}
                                $changeWhatInfo={(info: IChangeInfo) => $changeInfo(info)}
                                $closeModal={() => $closeModal()} />
                            : $whatInfo === 'enemy'
                                ? <EnemyModal
                                    key={$id}
                                    $id={$id}
                                    $changeWhatInfo={(info: IChangeInfo) => $changeInfo(info)}
                                    $closeModal={() => $closeModal()} />
                                : null
                }
            </ModalInner>
        </Modal>
        
    );
}

const ModalInner = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;

    overflow-y: auto;
    ${scrollBarX}
`

export default InfoModal;