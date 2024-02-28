import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Enemies } from '../../../data/Enemies';
import { Items } from '../../../data/ItemsData';
import { getStats } from '../../../functions/Stats';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IChangeInfo } from '../../../models/IArea';
import { IFullItemWithCount } from '../../../models/IAreaItem';
import { buyItem, sellItem } from '../../../store/reducers/ActionCreators';
import { scrollBarX } from '../../../styles/scrollbars';
import Avatar from '../../Avatar/Avatar';
import Input from '../../SearchBar/Input';
import Title from '../../Title/Title';
import Modal from '../Modal';
import ShopBuyItem from './ShopBuyItem';
import ShopSellItem from './ShopSellItem';

interface IShopModal {
    $closeModal: Function;
    $openInfoModal: (info: IChangeInfo) => void;
    $traderId: string;
    $locationId: string;
}

function ShopModal({ $closeModal, $openInfoModal, $traderId, $locationId }: IShopModal) {

    const { areas } = useAppSelector(state => state.areaReducer);
    const { playerSkills, inventory, player } = useAppSelector(state => state.userReducer);
    
    const dispatch = useAppDispatch();

    const getTrader = () => {
        return {
            ...areas.find(a => a.id === $locationId)!
                .currentEnemies.find(t => t.id === $traderId)!,
            trader: Enemies.find(t => t.id === $traderId)!
        }
    }

    const [traderData, setTraderData] = useState(getTrader());

    const [inputText, setInputText] = useState('');

    const [sortedTraderItems, setSortedTraderItems] = useState<IFullItemWithCount[]>(
        traderData.traderStats!.tradingItems
    );

    const sortTraderItems = () => {
        let filteredItems =
            getTrader().traderStats!.tradingItems.filter(i =>
                i.title.toLocaleLowerCase().includes(inputText.toLocaleLowerCase()));

        setSortedTraderItems(filteredItems.sort((a, b) => a.cost - b.cost));
    }

    const [sortedInventoryItems, setSortedInventoryItems] = useState<IFullItemWithCount[]>(
        inventory.filter(i => !i.isEquipped).map(i => ({ ...i.item, count: i.count }))
    );

    const sortInventoryItems = () => {
        let filteredItems =
            inventory.filter(i => !i.isEquipped)
                .map(i => ({ ...i.item, count: i.count })).filter(i =>
                    i.title.toLocaleLowerCase().includes(inputText.toLocaleLowerCase()));

        setSortedInventoryItems(filteredItems.sort((a, b) => a.cost - b.cost));
    }



    const [selectedId, setSelectedId] = useState('');

    const onClickBuyItem = (itemBuy: IFullItemWithCount, cost: number) => {
        dispatch(buyItem({
            item: itemBuy,
            buyingCostPerUnit: cost,
            levelId: $locationId,
            traderId: traderData.id
        }));
        setTraderData(getTrader());
        sortTraderItems();
    }

    const getCountCanBuy = (cost: number) => {
        return Math.floor(player.coins / cost)
    }

    const getBuyCost = (cost: number) => {
        return (cost * traderData.traderStats!.extraPriceMultiplier)
            - (cost * traderData.traderStats!.extraPriceMultiplier
                / 100 * getStats(playerSkills, player).buyPricePercent)
    }

    const getSellPrice = (cost: number) => {
        return cost + (cost / 100 * getStats(playerSkills, player).sellPricePercent)
    }

    const [isBuying, setIsBuying] = useState(true);

    const onClickSellItem = (itemBuy: IFullItemWithCount, cost: number) => {
        dispatch(sellItem({
            item: itemBuy,
            buyingCostPerUnit: cost,
            levelId: $locationId,
            traderId: traderData.id
        }));
        sortInventoryItems();
    }

    useEffect(() => {
        setTraderData(getTrader());
        sortTraderItems();
        sortInventoryItems();

    }, [inputText, areas, inventory])



    return (
        <Modal
            $flexDirection={'row'}
            $size='large'
            $isCloseButton
            $closeButtonFunction={() => $closeModal()}>
            <ModalInner>
                <TypesPlace>
                    <TraderTypeButton
                        onClick={() => setIsBuying(true)}
                        $isBuying={isBuying}>
                        +
                    </TraderTypeButton>
                    <TraderTypeButton
                        onClick={() => setIsBuying(false)}
                        $isBuying={!isBuying}>
                        -
                    </TraderTypeButton>
                </TypesPlace>

                <Divider />

                <TraderPlace>
                    <TraderInfo>
                        <Avatar
                            $image={traderData.trader.avatar}
                            width='8rem' />
                        <InfoBlock>
                            <Title $size='2rem'>
                                {traderData.trader.title} - <b>{isBuying ? 'Покупка' : 'Продажа'}</b>
                            </Title>
                            <InputCoinsBlock>
                                <Input $onChange={(e: string) => setInputText(e)} />
                                <Coins>
                                    {player.coins.toFixed(1)}$
                                    <Avatar
                                        $image={Items.find(c => c.id === 'coin')!.avatar}
                                        width='2rem' />
                                </Coins>
                            </InputCoinsBlock>
                        </InfoBlock>
                    </TraderInfo>

                    <ItemsList>
                        {
                            isBuying
                                ? sortedTraderItems.map((i, ind) =>
                                    <ShopBuyItem
                                        key={i.id + getCountCanBuy(getBuyCost(i.cost))}
                                        $index={ind}
                                        $openInfoModal={(info: IChangeInfo) => $openInfoModal(info)}
                                        $fullItem={Items.find(ai => ai.id === i.id) || Items[0]}
                                        $onClickBuyItem={(count: number) => onClickBuyItem({ ...i, count }, getBuyCost(i.cost))}
                                        $isSelected={selectedId === i.id}
                                        $setSelectedId={() => setSelectedId(i.id)}
                                        $clearSelectedId={() => setSelectedId('')}
                                        $countCanBuy={
                                            getCountCanBuy(
                                                getBuyCost(i.cost))}
                                        $count={i.count}
                                        $cost={getBuyCost(i.cost)} />)
                                : sortedInventoryItems.map((i, ind) =>
                                    <ShopSellItem
                                        key={i.id + getCountCanBuy(getBuyCost(i.cost))}
                                        $index={ind}
                                        $openInfoModal={(info: IChangeInfo) => $openInfoModal(info)}
                                        $fullItem={Items.find(ai => ai.id === i.id) || Items[0]}
                                        $onClickSellItem={(count: number) => onClickSellItem({ ...i, count }, getSellPrice(i.cost))}
                                        $isSelected={selectedId === i.id}
                                        $setSelectedId={() => setSelectedId(i.id)}
                                        $clearSelectedId={() => setSelectedId('')}
                                        $count={i.count}
                                        $cost={getSellPrice(i.cost)} />)
                        }
                    </ItemsList>
                </TraderPlace>
            </ModalInner>
        </Modal>

    );
}

const ModalInner = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    
    gap: 1.5rem;

    @media (max-width: 426px) {
        flex-direction: column;
        gap: 1rem;
    }
`

const InputCoinsBlock = styled.div`
    display: flex;
    gap: 10px;
`

const Coins = styled.div`
    box-shadow: 0 0 5px black;
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    gap: 10px;
    font-size: 1.3rem;
    align-items: center;
`

const TraderInfo = styled.div`
    display: flex;
    gap: 1.3rem;

    
`

const Divider = styled.div`
    height: 100%;
    border: 1px solid gray;

    @media (max-width: 426px) {
        width: 100%;
        height: 0;
    }
`

interface ITraderTypeButton {
    $isBuying: boolean
}

const TraderTypeButton = styled.div<ITraderTypeButton>`
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    border-radius: 10px;
    box-shadow: 0 0 5px black;
    background-color: white;
    user-select: none;
    cursor: pointer;

    border: ${p => p.$isBuying ? 'solid 2px black' : ''};

    transition: 0.1s;

    &:hover{
        transform: scale(0.9);
    }
`

const TypesPlace = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    gap: 1.3rem;

    @media (max-width: 426px) {
        flex-direction: row;
        height: auto;
        gap: 1rem;
    }
`

const TraderPlace = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 1.3rem;
`

const InfoBlock = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
`

const ItemsList = styled.div`
    gap: 10px;
    padding: 1.3rem;
    height: 70%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;

    ${scrollBarX}
`

export default ShopModal;