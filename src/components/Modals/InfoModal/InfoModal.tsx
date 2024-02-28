import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../hooks/redux';
import { IChangeInfo } from '../../../models/IArea';
import { getAreaBackground, getEnemyBackground, getItemBackground } from '../../../styles/backgrounds';
import { scrollBarX } from '../../../styles/scrollbars';
import Modal from '../Modal';
import AreaModal from './InfoModalArea';
import EnemyModal from './InfoModalEnemy';
import ItemModal from './InfoModalItem';
import { Items } from '../../../data/ItemsData';
import { Enemies } from '../../../data/Enemies';

interface IInfoModal {
    $id: string;
    $whatInfo: string;

    $closeModal: Function;
    $changeInfo: (info: IChangeInfo) => void;
}

function InfoModal({ $id, $closeModal, $whatInfo, $changeInfo }: IInfoModal) {

    const { areas } = useAppSelector(state => state.areaReducer);

    useEffect(() => {

    }, [$whatInfo, $id])

    const getBackgroundColor = () => {
        switch($whatInfo){
            case 'item':
                return getItemBackground(Items.find(i => i.id === $id)!.rare);
            case 'area':
                return getAreaBackground(areas.find(a => a.id === $id)!.color);
            case 'enemy':
                return getEnemyBackground(Enemies.find(e => e.id === $id)!.type);
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