import { useEffect } from 'react';
import styled from 'styled-components';
import { IArea, IChangeInfo } from '../../../models/IArea';
import { scrollBarX } from '../../../styles/scrollbars';
import ModalBackground from '../Other/ModalBackground';
import AreaModal from './InfoModalArea';
import EnemyModal from './InfoModalEnemy';
import ItemModal from './InfoModalItem';
import Modal from '../Modal';

interface IInfoModal {
    $area: IArea;
    $itemId: string;
    $enemyId: string;
    $closeModal: Function;
    $whatInfo: string;

    $changeWhatInfo: (item: IChangeInfo) => void;
}

function InfoModal({ $area, $closeModal, $whatInfo, $changeWhatInfo, $itemId, $enemyId }: IInfoModal) {
    useEffect(() => {

    }, [$whatInfo])

    return (
        <Modal
            $flexDirection='row'
            $isCloseButton={true}
            $closeButtonFunction={() => $closeModal()}>
            {
                $whatInfo === 'area'
                ? <AreaModal
                    $area={$area}
                    $changeWhatInfo={(info: IChangeInfo) => $changeWhatInfo(info)}
                    $closeModal={() => $closeModal()} />
                : $whatInfo === 'item'
                    ? <ItemModal
                        $itemId={$itemId}
                        $changeWhatInfo={(info: IChangeInfo) => $changeWhatInfo(info)}
                        $closeModal={() => $closeModal()} />
                    : $whatInfo === 'enemy'
                        ? <EnemyModal
                            $enemyId={$enemyId}
                            $changeWhatInfo={(info: IChangeInfo) => $changeWhatInfo(info)}
                            $closeModal={() => $closeModal()} />
                        : null
            }
        </Modal>
        
    );
}

export default InfoModal;